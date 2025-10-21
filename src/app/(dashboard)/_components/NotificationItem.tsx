"use client";

import { formatDistanceToNow } from "date-fns";
import { CheckCircle, AlertCircle, Info, XCircle, Bell } from "lucide-react";
import { cn } from "@/lib/utility/utils";
import { Notification } from "@/lib/stores/notificationStore";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => Promise<void>;
}

const typeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
} as const;

const typeColors = {
  info: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-yellow-100 text-yellow-600",
  error: "bg-red-100 text-red-600",
} as const;

export function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  // Fallback to Bell icon if type is not recognized
  const Icon = typeIcons[notification.type as keyof typeof typeIcons] || Bell;
  const colorClass =
    typeColors[notification.type as keyof typeof typeColors] ||
    "bg-gray-100 text-gray-600";

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50",
        !notification.read && "bg-pink-50 border-l-4 border-pink-500",
        notification.read && "bg-white"
      )}
    >
      <div className={cn("rounded-full p-2 flex-shrink-0", colorClass)}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-semibold text-sm",
            !notification.read ? "text-gray-900" : "text-gray-700"
          )}
        >
          {notification.title}
        </p>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {formatDistanceToNow(new Date(notification.created_at), {
            addSuffix: true,
          })}
        </p>
      </div>

      {!notification.read && (
        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-2" />
      )}
    </div>
  );
}
