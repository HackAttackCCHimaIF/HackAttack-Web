import { create } from "zustand";
import { Notification } from "@/lib/types/notification";

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;

  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

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
    // Check if notification already exists to avoid duplicates
    const exists = notifications.some((n) => n.id === notification.id);
    if (exists) return;

    const newNotifications = [notification, ...notifications];
    const unreadCount = newNotifications.filter((n) => !n.read).length;
    set({ notifications: newNotifications, unreadCount });
  },

  updateNotification: (id, updates) => {
    const { notifications } = get();
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, ...updates } : n
    );
    const unreadCount = updatedNotifications.filter((n) => !n.read).length;
    set({ notifications: updatedNotifications, unreadCount });
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

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  fetchNotifications: async () => {},
  markNotificationAsRead: async () => {},
  markAllNotificationsAsRead: async () => {},
}));

export type { Notification };
