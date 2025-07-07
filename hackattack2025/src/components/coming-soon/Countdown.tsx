"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- Helper Component untuk setiap unit waktu (Hari, Jam, Menit) ---
const TimeUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex gap-1">
      {value.split("").map((digit, index) => (
        <div
          key={index}
          className="relative bg-white/10 w-12 h-16 md:w-14 md:h-20 rounded-md shadow-lg flex items-center justify-center overflow-hidden"
        >
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-muted/10"></div>
          <span className="text-4xl md:text-5xl font-mono text-white tracking-widest">
            {digit}
          </span>
        </div>
      ))}
    </div>
    <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-neutral-300">
      {label}
    </span>
  </div>
);


// --- Komponen Utama Countdown ---
const Countdown = () => {
  const targetDate = new Date('2025-09-20T09:00:00');

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-10 text-white p-4">

        {/* Background SVG full screen */}
        <Image
            src="/bg.svg"
            alt="Background"
            fill
            className="absolute inset-0 object-cover -z-10 pointer-events-none select-none"
            priority
        />

        {/* Lingkaran luar: gradient border */}
        <div
        className="
            absolute top-[53%] md:top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[180px] h-[180px]
            sm:w-[220px] sm:h-[220px]
            md:w-[260px] md:h-[260px]
            lg:w-[240px] lg:h-[240px]
            rounded-full p-[3px]
            bg-gradient-to-b from-white to-black z-20
        "
        >
        {/* Lingkaran dalam: shadow biru */}
        <div
            className="
            w-full h-full rounded-full bg-black
            shadow-[0_0_60px_25px_rgba(15,117,189,0.4)]
            sm:shadow-[0_0_80px_30px_rgba(15,117,189,0.4)]
            md:shadow-[0_0_100px_40px_rgba(15,117,189,0.4)]
            lg:shadow-[0_0_120px_50px_rgba(15,117,189,0.4)]
            "
        />
        </div>

        {/* Lingkaran outline putih */}
        <div
        className="
            absolute top-[52%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[320px] h-[320px]
            sm:w-[280px] sm:h-[280px]
            md:w-[420px] md:h-[420px]
            lg:w-[566px] lg:h-[566px]
            rounded-full border-2 border-white/20 z-10
        "
        />

        {/* Judul Countdown */}
        <h1 className="text-[48px] sm:text-[72px] md:text-[100px] lg:text-[160px] font-koulen font-bold uppercase tracking-widest text-center leading-none z-10">
            Time Countdown
        </h1>

        {/* Waktu countdown */}
        <div className="flex items-center justify-center gap-2 md:gap-4 z-30">
            <TimeUnit value={formatTime(timeLeft.days)} label="Days" />
            <span className="text-4xl md:text-6xl pb-8 text-neutral-400">:</span>
            <TimeUnit value={formatTime(timeLeft.hours)} label="Hours" />
            <span className="text-4xl md:text-6xl pb-8 text-neutral-400">:</span>
            <TimeUnit value={formatTime(timeLeft.minutes)} label="Minutes" />
        </div>
        </div>

  );
};

export default Countdown;
