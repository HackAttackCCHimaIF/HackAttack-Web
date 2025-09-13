"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AdminWorkshopTable from "./AdminWorkshopTable";
import Image from "next/image";

export default function AdminWorkshopSuspenseWrapper() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [participants, setParticipants] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulasi fetch data
  useEffect(() => {
    const timer = setTimeout(() => {
      const shouldFail = Math.random() < 0.3; // 30% kemungkinan gagal

      if (shouldFail) {
        setError("Oops! We couldn’t load the data");
      } else {
        setParticipants([
          {
            name: "Yesi Sukmawati",
            email: "yesi.sukmawati23@gmail.com",
            role: "Team Leader",
            team: "Volkaholics",
            institution: "Telkom University",
            status: "Pending",
            date: "15/08/2025",
          },
          {
            name: "Daffa Hakim",
            email: "daffa.hakim@gmail.com",
            role: "Team Leader",
            team: "Next Devs",
            institution: "UI",
            status: "Approve",
            date: "16/08/2025",
          },
        ]);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="relative w-full flex-1 h-full flex items-center justify-center rounded-[20px] overflow-hidden bg-gradient-to-r from-[#0F75BD] to-[#64BB48]">

        {/* Background hitam transparan */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-[#575757] opacity-90" />

        {/* Tirai kiri */}
        <Image
          src="/landing-page/tirai2.svg"
          width={1000}
          height={1000}
          alt="tirai kiri"
          className="absolute left-0 top-0 h-full w-auto"
        />

        {/* Tirai kanan */}
        <Image
          src="/landing-page/tirai2knn.svg"
          width={1000}
          height={1000}
          alt="tirai kanan"
          className="absolute right-0 top-0 h-full w-auto"
        />

        {/* Konten error */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
          <p className="text-white text-xl font-semibold">{error}</p>
          <button
            onClick={() => location.reload()}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!participants) {
    return (
      <div className="rounded-[20px] p-[2px] bg-gradient-to-r from-[#0F75BD] to-[#64BB48] h-full">
        <div className="bg-gradient-to-t from-black to-[#575757] rounded-[18px] p-6 text-white h-full flex flex-col">
          {/* Header Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-6 w-48 bg-white/20 rounded-md" />
            <Skeleton className="h-4 w-72 mt-2 bg-white/20 rounded-md" />
          </div>

          {/* Search Skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-10 flex-1 bg-white/20 rounded-md" />
            <Skeleton className="h-10 w-32 bg-white/20 rounded-md" />
          </div>

          {/* Table Skeleton */}
          <div className="flex-1 space-y-3 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-12 w-full bg-white/20 rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <AdminWorkshopTable />;
}
