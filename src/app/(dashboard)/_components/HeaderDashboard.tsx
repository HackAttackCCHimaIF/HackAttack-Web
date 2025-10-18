"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/lib/stores/userStore";
import { NotificationDialog } from "./NotificationDialog";

export const HeaderDashboard = ({
  topText,
  bottomText,
}: {
  topText?: string;
  bottomText: string;
}) => {
  const { user } = useUserStore();

  const isLoggedIn = !!user;
  const displayName =
    user?.user_metadata?.full_name || user?.email || "User";

  return (
    <div className="py-4 px-4 flex justify-between items-center">
      {/* Judul */}
      <div className="relative inline-block">
        <div className="absolute -inset-0 left-1/8 bg-white/60 blur-2xl rounded-full opacity-50"></div>
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
          <></>
        )}
      </div>
    </div>
  );
};
