import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";

export function NotificationDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="flex items-center gap-2 rounded-full !p-6 hover:bg-white/20"
        >
          <div className="p-2 rounded-full">
            <Bell className="text-white" />
          </div>
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className="fixed right-0 h-full md:w-1/2 w-full xl:w-1/4 bg-pink-50 rounded-l-xl shadow-2xl 
                   data-[state=open]:animate-in data-[state=open]:slide-in-from-right 
                   data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
      >
        <div className="flex justify-between items-center border-b border-pink-100 px-4 py-3">
          <h2 className="text-xl font-bold text-gray-800">Notifications.</h2>
          <DrawerClose>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </DrawerClose>
        </div>

        <div className="flex border-b border-pink-200 text-sm font-medium text-gray-600">
          <button className="flex-1 py-3 text-center border-b-2 border-pink-400 text-pink-600">
            Hari ini
          </button>
          <button className="flex-1 py-3 text-center hover:text-gray-800">
            Kemarin
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3 p-3 bg-pink-100 rounded-lg">
            <div className="bg-pink-500 text-white rounded-full p-2 font-bold">IA</div>
            <div>
              <p className="font-semibold text-gray-800">Data invalid!</p>
              <p className="text-xs text-gray-600">
                Nama tim sudah digunakan, silahkan ganti.
              </p>
            </div>
          </div>

          {/* Kalau gaada notif */}
          {/* <p className="text-sm text-gray-500">Belum ada notifikasi baru.</p> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
