"use client";
import React, { useEffect, useState } from "react";

const TimeUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-1 sm:gap-2 justify-center">
    {/* Label */}
    <span className="text-xs sm:text-base md:text-2xl font-semibold uppercase tracking-widest text-neutral-300">
      {label}
    </span>

    {/* Digit Box */}
    <div className="flex gap-1 sm:gap-2">
      {value.split("").map((digit, index) => (
        <div
          key={index}
          className="
            relative 
            bg-white/10 
            w-[55px] h-[65px] 
            sm:w-[60px] sm:h-[90px] 
            md:w-[90px] md:h-[140px] 
            lg:w-[120px] lg:h-[200px]
            rounded-lg sm:rounded-xl 
            shadow-lg flex items-center justify-center overflow-hidden
          "
        >
          {/* Upper half shading */}
          <div className="h-1/2 bg-white/10 w-full absolute top-0" />
          {/* Middle line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
          {/* Digit */}
          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-[80px] font-mono font-semibold text-white tracking-widest">
            {digit}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function TimeDisplay() {
  const targetDate = new Date("2025-10-20T09:00:00");

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
    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 z-30">
      <TimeUnit value={formatTime(timeLeft.days)} label="Days" />
      <span className="text-lg sm:text-2xl md:text-4xl lg:text-6xl pb-4 sm:pb-8 text-neutral-400">
        :
      </span>
      <TimeUnit value={formatTime(timeLeft.hours)} label="Hours" />
      <span className="text-lg sm:text-2xl md:text-4xl lg:text-6xl pb-4 sm:pb-8 text-neutral-400">
        :
      </span>
      <TimeUnit value={formatTime(timeLeft.minutes)} label="Minutes" />
    </div>
  );
}
