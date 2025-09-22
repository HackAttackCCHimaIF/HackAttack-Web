import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  created_at: string;
  user_id: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API calls
  fetchNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  setNotifications: (notifications) => {
    const unreadCount = notifications.filter((n) => !n.read).length;
    set({ notifications, unreadCount });
  },

  addNotification: (notification) => {
    const { notifications } = get();
    const newNotifications = [notification, ...notifications];
    const unreadCount = newNotifications.filter((n) => !n.read).length;
    set({ notifications: newNotifications, unreadCount });
  },

  markAsRead: (id) => {
    const { notifications } = get();
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    const unreadCount = updatedNotifications.filter((n) => !n.read).length;
    set({ notifications: updatedNotifications, unreadCount });
  },

  markAllAsRead: () => {
    const { notifications } = get();
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    set({ notifications: updatedNotifications, unreadCount: 0 });
  },

  removeNotification: (id) => {
    const { notifications } = get();
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    const unreadCount = updatedNotifications.filter((n) => !n.read).length;
    set({ notifications: updatedNotifications, unreadCount });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchNotifications: async () => {
    const { setLoading, setError, setNotifications } = get();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/notifications");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  },

  markNotificationAsRead: async (id) => {
    const { markAsRead, setError } = get();

    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      markAsRead(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  },

  markAllNotificationsAsRead: async () => {
    const { markAllAsRead, setError } = get();

    try {
      const response = await fetch("/api/notifications/mark-all-read", {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      markAllAsRead();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  },
}));
