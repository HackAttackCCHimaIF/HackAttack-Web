"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TimeDisplay from "./Time/TimeDisplay";
import StarryBackground from "./planet/StarryBackground";

const Countdown = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center text-white p-4">
      {/* Background SVG */}
      <Image
        src="/bg.svg"
        alt="Background"
        fill
        className="absolute inset-0 object-cover -z-10 pointer-events-none select-none opacity-60"
        priority
      />

      {/* Starry background */}
      <StarryBackground/>

      {/* Title - Positioned behind black circle but above timer */}
      <motion.h1
        className="absolute 
          top-[calc(48.5%-6rem)] 
          sm:top-[calc(45%-6rem)] 
          md:top-[calc(44%-6rem)] 
          lg:top-[calc(43%-6rem)] 
          xl:top-[calc(42%-6rem)]
          left-1/2 -translate-x-1/2 z-15 w-full text-center
          text-[calc(28px+3vw)] sm:text-[calc(32px+2vw)] md:text-[calc(64px+1.5vw)] lg:text-[calc(76px+1vw)] xl:text-[calc(84px+0.5vw)]
          font-koulen font-bold uppercase tracking-widest leading-none"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        Time Countdown
      </motion.h1>

      {/* Lingkaran Utama (Inner) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[240px] lg:h-[240px]
          rounded-full p-[3px] bg-gradient-to-b from-white to-black z-20"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <div
          className="w-full h-full rounded-full bg-black
            shadow-[0_0_60px_25px_rgba(15,117,189,0.4)]
            sm:shadow-[0_0_80px_30px_rgba(15,117,189,0.4)]
            md:shadow-[0_0_100px_40px_rgba(15,117,189,0.4)]
            lg:shadow-[0_0_120px_50px_rgba(15,117,189,0.4)]"
        />
      </motion.div>

      {/* Lingkaran Outline Putih */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[320px] h-[320px] sm:w-[280px] sm:h-[280px] md:w-[420px] md:h-[420px] lg:w-[566px] lg:h-[566px]
          rounded-full border-2 border-white/20 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      {/* Timer di tengah lingkaran */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: false }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
      >
        <TimeDisplay />
      </motion.div>
    </div>
  );
};

export default Countdown;