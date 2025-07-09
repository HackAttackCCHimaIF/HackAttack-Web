"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const planets = [
  {
    name: "Himpunan Mahasiswa S1 Informatika",
    dept: "Universitas Telkom",
    color: "bg-blue-500",
    glow: "bg-blue-400",
    image: "/icons/hima.svg",
    delay: 0,
    size: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10",
    glowSize: "w-10 h-10",
  },
  {
    name: "Central Computer Improvement",
    dept: "Universitas Telkom",
    color: "bg-green-500",
    glow: "bg-green-400",
    image: "/icons/cci.svg",
    delay: 10,
    size: "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8",
    glowSize: "w-9 h-9",
  },
  {
    name: "Telkom",
    dept: "University",
    color: "bg-red-500",
    glow: "bg-red-400",
    image: "/icons/telkom.svg",
    delay: 20,
    size: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10",
    glowSize: "w-10 h-10",
  },
];


const orbitClass = (index: number) => {
  const base = 40 + index * 6;
  return `
    w-[${base + 5}vw] h-[${base + 5}vw]
    sm:w-[${base + 10}vw] sm:h-[${base + 10}vw]
    md:w-[${base + 10}vw] md:h-[${base + 10}vw]
  `;
};


export default function OrbitAccurate() {
  return (
    <div className="relative w-full h-[115vh] overflow-hidden bg-transparent pointer-events-none">
      {/* Starfield background */}
      <div className="absolute inset-0">
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

      {/* Sun in the center */}
      <div className="absolute top-1/2 left-1/2 xl:left-1/3  z-10 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-64 xl:h-64 rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-[#FAB94F] opacity-10 blur-[60px] pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-[#FAB94F] opacity-30 blur-[40px] pointer-events-none" />

          {/* Main sun body */}
          <div className="relative w-full h-full rounded-full bg-gradient-radial from-yellow-100 via-[#FFD94F] to-orange-600 shadow-inner shadow-yellow-400/50">

            {/* Inner pulsating glow layer (lebih besar & blur) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Inti terang */}
                <div className="w-28 h-28 bg-gradient-to-r from-yellow-200 via-[#FAB94F] to-[#FAB94F] rounded-full shadow-[0_0_30px_20px_rgba(255,200,0,0.4)]" />

                {/* Glow yang menyebar */}
                <div className="absolute w-32 h-32 bg-yellow-100 rounded-full blur-[60px] opacity-60 animate-pulse" />
                <div className="absolute w-24 h-24 bg-orange-300 rounded-full blur-3xl opacity-40 animate-pulse delay-200" />
              </div>
            </div>

            {/* Highlight glossy */}
            <div className="absolute top-3 left-3 w-14 h-14 bg-white/40 rounded-full blur-md opacity-80" />

            {/* Bayangan pinggir */}
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-black/20 rounded-full blur-[40px]" />
          </div>


        </motion.div>
      </div>


      {/* Orbits and planets */}
      {planets.map((planet, index) => (
        <motion.div
          key={planet.name}
          className={`absolute top-1/2 left-1/2 xl:left-1/3 transform -translate-x-1/2 -translate-y-1/2 ${orbitClass(index)}`}
          style={{
            width: `${42 + index * 5}vw`, 
            height: `${42 + index * 5}vw`, 
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            delay: planet.delay,
          }}
        >
          {/* Orbit Path */}
          <div className="absolute inset-0 border border-dashed border-white/20 rounded-full pointer-events-none" />

          {/* Planet on orbit */}
          <motion.div
            className="absolute top-0 left-1/2"
            style={{ transform: "translateX(-50%)" }}
            animate={{ rotate: [0, -360] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              delay: planet.delay,
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Glow layer */}
              <motion.div
                className={`absolute ${planet.glowSize} rounded-full ${planet.glow} opacity-30 blur-lg`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />

              {/* Planet core with dynamic shading */}
              <div className="relative flex items-center justify-center">
                {/* Outer glow ring / orbit ring */}
                <div className="absolute w-[160%] h-[160%] rounded-full border-2 border-white/30 blur-sm opacity-40 pointer-events-none" />

                {/* Planet Body */}
                <div className={`relative ${planet.size} rounded-full overflow-hidden border border-white shadow-lg`}>
                  {/* Solid base color */}
                  <div className={`w-full h-full rounded-full ${planet.color}`} />

                  {/* Shading layer */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-l from-black/50 to-transparent"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                      delay: planet.delay,
                    }}
                  />

                  {/* Optional highlight ring inside */}
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                </div>
                <div className="border p-7 border-dashed absolute rounded-full"></div>
              </div>


              {/* Label */}
              <motion.div
                className="flex items-center mt-6 sm:mt-6 px-3 py-2 w-fit bg-white/5 rounded-lg backdrop-blur-sm border border-white/20 shadow-sm space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: planet.delay + 1 }}
              >
                {/* Lingkaran Inisial */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-white/10 border border-white/30">
                  <Image
                    src={planet.image}
                    alt={planet.name}
                    className="object-contain w-full h-full"
                    height={24}
                    width={24}
                  />
                </div>

                {/* Teks Nama & Departemen */}
                <div className="text-left leading-tight">
                  <div className="text-white font-semibold text-xs sm:text-sm md:text-base truncate">
                    {planet.name}
                  </div>
                  <div className="text-gray-300 text-[10px] sm:text-xs truncate">{planet.dept}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>


        </motion.div>
      ))}
    </div>
  );
}
