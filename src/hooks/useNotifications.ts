import { useEffect, useCallback } from "react";
import { useNotificationStore } from "@/lib/stores/notificationStore";
import { useUserStore } from "@/lib/stores/userStore";
import { supabase } from "@/lib/config/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
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

    let subscription: RealtimeChannel | null = null;

    const setupRealtimeSubscription = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from("Users")
          .select("id")
          .eq("email", user.email)
          .single();

        if (userError || !userData) {
          console.error(
            "Failed to get user ID for real-time subscription:",
            userError
          );
          return;
        }

        subscription = supabase
          .channel("notifications")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "Notification",
              filter: `user_id=eq.${userData.id}`,
            },
            (payload) => {
              console.log("Real-time notification event:", payload);

              if (payload.eventType === "INSERT") {
                const dbNotification = payload.new as DatabaseNotification;
                const newNotification = mapDatabaseNotification(dbNotification);
                addNotification(newNotification);
              } else if (payload.eventType === "UPDATE") {
                const dbNotification = payload.new as DatabaseNotification;
                const updatedNotification =
                  mapDatabaseNotification(dbNotification);

                const currentNotifications =
                  useNotificationStore.getState().notifications;
                const updatedNotifications = currentNotifications.map((n) =>
                  n.id === updatedNotification.id ? updatedNotification : n
                );
                setNotifications(updatedNotifications);
              }
            }
          )
          .subscribe((status) => {
            console.log("Real-time subscription status:", status);
          });
      } catch (error) {
        console.error("Error setting up real-time subscription:", error);
      }
    };

    setupRealtimeSubscription();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [user?.email, addNotification, setNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    refetch: fetchNotifications,
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
  };
};
