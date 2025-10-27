"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utility/utils";

interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
  className?: string;
}

export function NotificationBell({
  unreadCount,
  onClick,
  className,
}: NotificationBellProps) {
  return (
    <Button
      size="icon"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full !p-6 hover:bg-white/20 relative",
        className
      )}
    >
      <div className="p-2 rounded-full">
        <Bell className="text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-xs font-bold text-white flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>
    </Button>
  );
}
