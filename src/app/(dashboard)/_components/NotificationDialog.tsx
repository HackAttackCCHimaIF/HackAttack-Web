import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationBell } from "./NotificationBell";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "@/hooks/useNotifications";
import { Loader2, CheckCheck } from "lucide-react";
import { useMemo } from "react";

export function NotificationDialog() {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  const { newestNotifications, oldestNotifications } = useMemo(() => {
    const sorted = [...notifications].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const newest = sorted.slice(0, 10); // Latest 10
    const oldest = sorted.slice(-10).reverse(); // Oldest 10, reversed

    return {
      newestNotifications: newest,
      oldestNotifications: oldest,
    };
  }, [notifications]);

  const hasUnread = unreadCount > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <NotificationBell unreadCount={unreadCount} onClick={() => {}} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-2xl">
        <DialogHeader className="flex flex-row justify-between items-center border-b border-pink-100 pb-3">
          <DialogTitle className="text-xl font-bold text-gray-800">
            Notifications.
          </DialogTitle>

          {hasUnread && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 text-xs"
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </DialogHeader>

        <Tabs defaultValue="newest" className="w-full">
          <TabsList className="grid w-full grid-cols-2 border-b border-pink-200">
            <TabsTrigger
              value="newest"
              className="data-[state=active]:border-b-1 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600"
            >
              Newest
            </TabsTrigger>
            <TabsTrigger
              value="oldest"
              className="data-[state=active]:border-b-1 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600"
            >
              Oldest
            </TabsTrigger>
          </TabsList>

          <TabsContent value="newest" className="space-y-4 mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                <span className="ml-2 text-gray-600">
                  Loading notifications...
                </span>
              </div>
            ) : newestNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-2">🔔</div>
                <p className="text-sm text-gray-500">
                  Belum ada notifikasi baru.
                </p>
              </div>
            ) : (
              <ScrollArea className="max-h-80">
                <div className="space-y-2">
                  {newestNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="oldest" className="space-y-4 mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                <span className="ml-2 text-gray-600">
                  Loading notifications...
                </span>
              </div>
            ) : oldestNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-2">📜</div>
                <p className="text-sm text-gray-500">
                  Belum ada notifikasi lama.
                </p>
              </div>
            ) : (
              <ScrollArea className="max-h-80">
                <div className="space-y-2">
                  {oldestNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}