import { useEffect, useCallback } from "react";
import { useNotificationStore } from "@/lib/stores/notificationStore";
import { useUserStore } from "@/lib/stores/userStore";
import {
  DatabaseNotification,
  mapDatabaseNotification,
} from "@/lib/types/notification";

export const useNotifications = () => {
  const { user } = useUserStore();
  const {
    notifications,
    unreadCount,
    isLoading,
    setNotifications,
    addNotification,
    updateNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    setLoading,
  } = useNotificationStore();

  const fetchNotifications = useCallback(async () => {
    if (!user?.email) {
      console.log("No user email available for fetching notifications");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching notifications for user:", user.email);

      const response = await fetch(
        `/api/notifications?userEmail=${encodeURIComponent(user.email)}`
      );

      console.log("Fetch response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Notifications data:", data);
        setNotifications(data.data || []);
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to fetch notifications:",
          response.status,
          response.statusText,
          errorText
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email, setNotifications, setLoading]);

  const markNotificationAsRead = useCallback(
    async (notificationId: string) => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `/api/notifications/${notificationId}/read`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: user.email,
            }),
          }
        );

        if (response.ok) {
          markAsRead(notificationId);
        } else {
          console.error(
            "Failed to mark notification as read:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },
    [user?.email, markAsRead]
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    if (!user?.email) return;

    try {
      const response = await fetch(`/api/notifications/mark-all-read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
        }),
      });

      if (response.ok) {
        markAllAsRead();
      } else {
        console.error(
          "Failed to mark all notifications as read:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, [user?.email, markAllAsRead]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!user?.email) return;

    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000; // 3 seconds

    const connectSSE = () => {
      try {
        const sseUrl = `/api/notifications/stream?userEmail=${encodeURIComponent(
          user.email || ""
        )}`;
        eventSource = new EventSource(sseUrl);

        eventSource.onopen = () => {
          console.log("SSE connection opened");
          reconnectAttempts = 0;
        };

        eventSource.onmessage = (event) => {
          try {
            const eventData = JSON.parse(event.data);
            console.log("SSE event received:", eventData);

            switch (eventData.type) {
              case "connected":
                console.log("SSE connected successfully");
                break;

              case "subscribed":
                console.log("SSE subscribed to notifications");
                break;

              case "notification_created":
                const newNotification = mapDatabaseNotification(
                  eventData.data as DatabaseNotification
                );
                addNotification(newNotification);
                break;

              case "notification_updated":
                const updatedNotification = mapDatabaseNotification(
                  eventData.data as DatabaseNotification
                );
                updateNotification(updatedNotification.id, updatedNotification);
                break;

              case "notification_deleted":
                removeNotification(eventData.data.id);
                break;

              default:
                console.log("Unknown SSE event type:", eventData.type);
            }
          } catch (error) {
            console.error("Error parsing SSE event:", error);
          }
        };

        eventSource.onerror = (error) => {
          console.error("SSE connection error:", error);
          eventSource?.close();

          // Implement reconnection logic
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            console.log(
              `Attempting to reconnect SSE (${reconnectAttempts}/${maxReconnectAttempts})...`
            );

            reconnectTimeout = setTimeout(() => {
              connectSSE();
            }, reconnectDelay * reconnectAttempts); // Exponential backoff
          } else {
            console.error("Max SSE reconnection attempts reached");
          }
        };
      } catch (error) {
        console.error("Error creating SSE connection:", error);
      }
    };

    connectSSE();

    // Cleanup function
    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (eventSource) {
        console.log("Closing SSE connection");
        eventSource.close();
      }
    };
  }, [user?.email, addNotification, updateNotification, removeNotification]);

  return {
    notifications,
    unreadCount,
    isLoading,
    refetch: fetchNotifications,
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
  };
};
