export interface DatabaseNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  created_at: string;
  updated_at?: string;
  user_id: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  created_at: string;
  user_id: string;
}

export const mapDatabaseNotification = (
  dbNotification: DatabaseNotification
): Notification => ({
  id: dbNotification.id,
  title: dbNotification.title,
  message: dbNotification.message,
  type: dbNotification.type,
  read: dbNotification.is_read,
  created_at: dbNotification.created_at,
  user_id: dbNotification.user_id,
});
