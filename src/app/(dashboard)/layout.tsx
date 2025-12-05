"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";
import { useUserStore } from "@/lib/stores/userStore";
import Sidebar from "./_components/Sidebar";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UnderMaintenance from "./_components/UnderMaintenance";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<User | null>(null);
  const [loading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { reset } = useUserStore();
  const router = useRouter();

  const MAINTENANCE_MODE = false;

  useEffect(() => {
    const redirectToLandingPage = () => {
      router.push("/");
    };

    // const getUser = async () => {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();

    //   setUser(session?.user ?? null);

    //   if (session?.user) {
    //     setStoreUser(session.user);
    //   } else {
    //     setStoreUser(null);
    //   }

    //   setLoading(false);
    // };

    // getUser();

    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange(async (_event, session) => {
    //   setUser(session?.user ?? null);

    //   if (session?.user) {
    //     setStoreUser(session.user);
    //   } else {
    //     setStoreUser(null);
    //   }

    //   setLoading(false);
    // });

    // return () => subscription.unsubscribe();
    redirectToLandingPage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmSignOut = async () => {
    await supabase.auth.signOut();
    reset();
    router.push("/");
    setShowLogoutDialog(false);
  };

  const handleCancelSignOut = () => {
    setShowLogoutDialog(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (MAINTENANCE_MODE) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <UnderMaintenance />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex relative bg-black">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing-page/Map.svg"
            alt="Map background"
            fill
            className="object-cover pointer-events-none opacity-100"
            priority
          />
        </div>

        <div className="relative z-10 flex w-full h-full">
          {/* Sidebar */}
          <div className="w-0 md:w-68">
            <Sidebar isLoggedIn={!!user} onSignOut={handleSignOutClick} />
          </div>

          {/* Main Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 h-full md:pt-0 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-black/90 border border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-white">
              Konfirmasi Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Apakah Anda yakin ingin keluar dari akun Anda? Anda perlu login
              kembali untuk mengakses dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelSignOut}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSignOut}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DashboardLayout;
