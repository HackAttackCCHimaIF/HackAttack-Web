"use client";
import React, { useEffect, useState } from "react";

// Komponen kotak unit waktu (days/hours/minutes)
const TimeUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex gap-1">
      {value.split("").map((digit, index) => (
        <div
          key={index}
          className="relative bg-white/10 w-12 h-16 md:w-14 md:h-20 rounded-md shadow-lg flex items-center justify-center overflow-hidden"
        >
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-muted/10" />
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

export default function TimeDisplay() {
  const targetDate = new Date("2025-09-20T09:00:00");

  const calculateTimeLeft = () => {
    const diff = +targetDate - +new Date();
    return diff > 0
      ? {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
        }
      : { days: 0, hours: 0, minutes: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (t: number) => String(t).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 z-30">
      <TimeUnit value={formatTime(timeLeft.days)} label="Days" />
      <span className="text-4xl md:text-6xl pb-8 text-neutral-400">:</span>
      <TimeUnit value={formatTime(timeLeft.hours)} label="Hours" />
      <span className="text-4xl md:text-6xl pb-8 text-neutral-400">:</span>
      <TimeUnit value={formatTime(timeLeft.minutes)} label="Minutes" />
    </div>
  );
}
