"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

const UnderMaintenance = () => {
  const tapeBg =
  "repeating-linear-gradient(45deg, rgba(239,75,114,0.75) 0px, rgba(239,75,114,0.75) 20px, rgba(176,48,80,0.75) 20px, rgba(176,48,80,0.75) 40px)";


  const tapeText1 = [
    "UNDER MAINTENANCE",
    "•",
    "DO NOT ENTER",
    "•",
  ];

  const tapeText2 = [
    "SYSTEM UPDATE IN PROGRESS",
    "•",
    "KEEP OUT",
    "•",
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">

      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
        <Image src="/dashboard/logo.svg" alt="HackAttack Logo" width={40} height={40} />
        <div className="leading-tight">
          <p className="text-white font-extrabold text-lg tracking-wide">HACKATTACK</p>
          <p className="text-white/60 text-xs font-medium">2025</p>
        </div>
      </div>

      {/* Police Line 1 */}
      <div
        className="absolute top-1/2 -translate-y-[65px] rotate-12 w-[120%] h-12 flex items-center z-10 overflow-hidden"
        style={{ background: tapeBg }}
      >
        <div
          className="flex gap-3 whitespace-nowrap px-4"
          style={{ animation: "slideTape 18s linear infinite alternate" }}
        >
          {[...Array(10)].map((_, repeatIndex) =>
            tapeText1.map((segment, i) => (
              <span
                key={`line1-${repeatIndex}-${i}`}
                className={`${i % 2 === 0 ? "text-white" : "text-black"} font-extrabold uppercase tracking-widest`}
              >
                {segment}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Police Line 2 */}
      <div
        className="absolute top-1/2 translate-y-[50px] -rotate-10 w-[120%] h-12 flex items-center z-10 overflow-hidden"
        style={{ background: tapeBg }}
      >
        <div
          className="flex gap-3 whitespace-nowrap px-4"
          style={{ animation: "slideTape 22s linear infinite alternate-reverse" }}
        >
          {[...Array(10)].map((_, repeatIndex) =>
            tapeText2.map((segment, i) => (
              <span
                key={`line2-${repeatIndex}-${i}`}
                className={`${i % 2 === 0 ? "text-white" : "text-black"} font-extrabold uppercase tracking-widest`}
              >
                {segment}
              </span>
            ))
          )}
        </div>
      </div>


      <Card
        className="
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            bg-white/10 border border-white/20 backdrop-blur-md
            px-6 py-4 z-20
            text-center
        "
        >
        <p
            className="font-extrabold text-white uppercase tracking-[0.2em]"
            style={{
            fontSize: "clamp(1.5rem, 5.5vw, 2.2rem)",
            }}
        >
            Under Maintenance
        </p>
        </Card>


    </div>
  );
};

export default UnderMaintenance;
