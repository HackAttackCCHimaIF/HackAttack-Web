"use client";

import React, { useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import Image from "next/image";
import { supabase } from "@/lib/config/supabase";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/userStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, loading, setLoading, reset } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    reset();
    router.push("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
          <Sidebar isLoggedIn={!!user} onSignOut={handleSignOut} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 h-full pt-16 md:pt-0 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
