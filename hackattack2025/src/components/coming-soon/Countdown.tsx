"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import TimeDisplay from './Time/TimeDisplay';

const Countdown = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-10 text-white p-4">

      {/* Background SVG full screen */}
      <Image
        src="/bg.svg"
        alt="Background"
        fill
        className="absolute inset-0 object-cover -z-10 pointer-events-none select-none opacity-60"
        priority
      />

      {/* Starry background (optional) */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Lingkaran Luar - Border Gradient, entry anim */}
      <motion.div
        className="absolute top-[53%] md:top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[240px] lg:h-[240px]
          rounded-full p-[3px] bg-gradient-to-b from-white to-black z-20"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        viewport={{ once: false }} // hanya trigger 1x saat masuk viewport
      >
        <div className="w-full h-full rounded-full bg-black shadow-[0_0_60px_25px_rgba(15,117,189,0.4)]
          sm:shadow-[0_0_80px_30px_rgba(15,117,189,0.4)]
          md:shadow-[0_0_100px_40px_rgba(15,117,189,0.4)]
          lg:shadow-[0_0_120px_50px_rgba(15,117,189,0.4)]"
        />
      </motion.div>

      {/* Lingkaran Outline Putih */}
      <motion.div
        className="absolute top-[52%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[320px] h-[320px] sm:w-[280px] sm:h-[280px] md:w-[420px] md:h-[420px] lg:w-[566px] lg:h-[566px]
          rounded-full border-2 border-white/20 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      {/* Judul Countdown */}
      <motion.h1
        className="text-[48px] sm:text-[72px] md:text-[100px] lg:text-[160px] font-koulen font-bold uppercase tracking-widest text-center leading-none z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        Time Countdown
      </motion.h1>

      {/* Timer Section (dibungkus motion) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: false }}
        className="z-30"
      >
        <TimeDisplay />
      </motion.div>
    </div>
  );
};

export default Countdown;
