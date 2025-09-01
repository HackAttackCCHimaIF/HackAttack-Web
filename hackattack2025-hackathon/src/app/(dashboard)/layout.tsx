"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
          <Sidebar isLoggedIn={false} onSignOut={() => {}} />
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
