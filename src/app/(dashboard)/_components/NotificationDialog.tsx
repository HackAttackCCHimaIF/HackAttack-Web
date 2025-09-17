import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import Image from "next/image";

export function NotificationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="flex items-center gap-2 rounded-full !p-6 hover:bg-white/20"
        >
          <div className="p-2 rounded-full">
            <Bell className="text-white" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-2xl">
        <DialogHeader className="flex justify-between items-center border-b border-pink-100 pb-3">
          <DialogTitle className="text-xl font-bold text-gray-800">
            Notifications.
          </DialogTitle>
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

          <TabsContent value="newest" className=" space-y-4">
            <div className="flex items-start gap-3 p-3 bg-pink-100 rounded-lg">
              <div className="bg-pink-500 text-white rounded-full p-2 font-bold">
                <Image src={"/dashboard/logo.svg"} alt="Logo" width={24} height={24} className="object-contain "/>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Data invalid!</p>
                <p className="text-xs text-gray-600">
                  Nama tim sudah digunakan, silahkan ganti.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="oldest" className="p-4 space-y-4">
            <p className="text-sm text-gray-500">
              Belum ada notifikasi lama.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
