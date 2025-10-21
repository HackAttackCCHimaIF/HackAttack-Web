"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCheck, Loader2 } from "lucide-react";
import { NotificationBell } from "./NotificationBell";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "@/hooks/useNotifications";

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  const handleNotificationClick = async (id: string, read: boolean) => {
    if (!read) {
      await markAsRead(id);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <NotificationBell
            unreadCount={unreadCount}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-96 p-0 bg-white rounded-xl shadow-2xl border-0"
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-pink-100">
          <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 text-xs"
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="max-h-96">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
              <span className="ml-2 text-gray-600">
                Loading notifications...
              </span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <Tabs defaultValue="unread" className="w-full">
              <TabsList className="grid w-full grid-cols-2 border-b border-pink-200 rounded-none bg-transparent">
                <TabsTrigger
                  value="unread"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none bg-transparent"
                >
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none bg-transparent"
                >
                  All ({notifications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="unread" className="mt-0">
                <ScrollArea className="h-80">
                  {unreadNotifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <p className="text-sm">No unread notifications</p>
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {unreadNotifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={() =>
                            handleNotificationClick(
                              notification.id,
                              notification.read
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="all" className="mt-0">
                <ScrollArea className="h-80">
                  <div className="p-2 space-y-1">
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={() =>
                          handleNotificationClick(
                            notification.id,
                            notification.read
                          )
                        }
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
