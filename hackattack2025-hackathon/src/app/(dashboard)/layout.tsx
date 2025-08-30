"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-row relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing-page/Map.svg"
          alt="Map background"
          fill
          className="object-contain pointer-events-none opacity-100"
          priority
        />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <div className="w-68">
            <Sidebar isLoggedIn={true} onSignOut={() => {}} />
        </div>

        <div className="flex flex-col flex-1 ">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
