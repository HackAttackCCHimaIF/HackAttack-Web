import { useEffect, useCallback } from "react";
import { useNotificationStore } from "@/lib/stores/notificationStore";
import { useUserStore } from "@/lib/stores/userStore";

const POLLING_INTERVAL = 15000; // 15 seconds

export const useNotifications = () => {
  const { user } = useUserStore();
  const {
    notifications,
    unreadCount,
    isLoading,
    setNotifications,
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
      
      const response = await fetch(`/api/notifications?userEmail=${encodeURIComponent(user.email)}`);
      
      console.log("Fetch response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Notifications data:", data);
        setNotifications(data.data || []);
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch notifications:", response.status, response.statusText, errorText);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email, setNotifications, setLoading]);

  const markNotificationAsRead = useCallback(async (notificationId: string) => {
    if (!user?.email) return;

    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
        }),
      });

      if (response.ok) {
        markAsRead(notificationId);
      } else {
        console.error("Failed to mark notification as read:", response.status);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, [user?.email, markAsRead]);

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
        console.error("Failed to mark all notifications as read:", response.status);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, [user?.email, markAllAsRead]);

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Polling for real-time updates
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(fetchNotifications, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [user, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    refetch: fetchNotifications,
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
  };
};
