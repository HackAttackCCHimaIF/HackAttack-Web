"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, Edit } from "lucide-react";
import { NotificationDialog } from "./NotificationDialog";
import { useUserStore } from "@/lib/stores/userStore";

export const HeaderDashboard = ({
  isEditMode,
  setEditMode,
  topText,
  bottomText,
  isEdit,
  onSave,
}: {
  isEditMode?: boolean;
  isEdit?: boolean;
  setEditMode?: (mode: boolean) => void;
  topText?: string;
  bottomText: string;
  onSave?: () => void;
}) => {
  const { user } = useUserStore();

  const isLoggedIn = !!user;
  const displayName =
    user?.user_metadata?.full_name || user?.email || "User";

  return (
    <div className="py-4 px-4 flex justify-between items-center">
      {/* Judul */}
      <div className="relative inline-block">
        <div className="absolute -inset-0 bg-white/60 blur-2xl rounded-lg opacity-50"></div>
        <h1 className="relative text-[28px] sm:text-[36px] font-bold text-start max-w-[240px] pt-2 leading-tight sm:leading-none">
          <span className="block text-white uppercase">{topText}</span>
          <span className="block tracking-wide uppercase py-0.5 px-1 bg-pink-500/50 pr-4 text-white">
            {bottomText}
          </span>
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 md:gap-4">
        {isLoggedIn ? (
          <>
            {isEdit && (
              <Button
                onClick={() => {
                  if (isEditMode) {
                    onSave?.();
                    setEditMode?.(false);
                  } else {
                    setEditMode?.(true);
                  }
                }}
                size="lg"
                className={`flex items-center gap-2 rounded-full pl-2 pr-2 !py-6 ${
                  isEditMode
                    ? "bg-pink-600/50 hover:bg-pink-700/80 text-white lg:pl-6"
                    : "bg-white/10 hover:bg-white/20 text-white lg:pr-6"
                }`}
              >
                {isEditMode ? (
                  <div className="flex items-center gap-3">
                    <p className="hidden lg:flex">Simpan</p>
                    <div className="p-2 rounded-full lg:bg-white/10">
                      <Check size={8} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full lg:bg-white/10">
                      <Edit size={8} className="text-white" />
                    </div>
                    <p className="hidden lg:flex">Edit Profile</p>
                  </div>
                )}
              </Button>
            )}

            <NotificationDialog />

            <div className="flex items-center gap-3 rounded-full px-4 py-2 text-white">
              <div className="flex-col text-right lg:flex hidden">
                <p className="text-xs text-white/60">Selamat Datang,</p>
                <p className="text-lg">{displayName}</p>
              </div>
              <div className="text-black">
                <Avatar className="rounded-lg size-10">
                  <AvatarFallback>
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-3">
            {/* <Button className="bg-white/10 hover:bg-white/20 text-white rounded-full !px-4 !py-6">
              <LogIn />
              <p className="hidden md:block">Login</p>
            </Button>
            <Button className="bg-pink-500/60 hover:bg-pink-600 text-white rounded-full !px-4 !py-6">
              <UserPlus />
              <p className="hidden md:block">Register</p>
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
};
