"use client";

import React from 'react';
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import Image from 'next/image';
import { FloatingOrb } from './planet/FloatingOrb'; 

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-start text-white overflow-hidden">
      {/* Full-screen SVG background for space theme */}
      <Image
        src="/bg.svg"
        alt="background planet"
        fill
        className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none select-none opacity-60"
        priority
      />

      {/* Central content wrapper */}
      <div className="w-[95%] mx-auto z-10">
        <div className="container px-4 w-fit">
          <div className="max-w-4xl flex flex-col gap-1">

            {/* Pre-title text */}
            <p className="font-semibold text-lg tracking-tight text-gray-200 ">
              HackAttack2025
            </p>

            {/* Main title with gradient "Coming Soon" effect */}
            <h1 className="text-[160px] font-black uppercase font-koulen leading-[130px]">
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-white text-transparent bg-clip-text">
                Coming
              </span>
              <br />
              <span>Soon!</span>
            </h1>

            {/* Description paragraph */}
            <p className="text-base md:text-lg text-gray-300 max-w-xl font-medium">
              An exciting collaboration between HIMA IF and CCI, bringing you one of the most anticipated hackathons of the year.
            </p>

            {/* Animated glowing orb background accent */}
            <FloatingOrb 
              type="glow"
              color="#F9A318"
              className="
                absolute 
                left-1/2 top-[60%] 
                sm:left-[70%] sm:top-[30%] 
                md:left-1/2 md:top-1/2 
                -translate-x-1/2 -translate-y-1/2 
                w-28 h-28 
                -z-10 pointer-events-none
              "
              animationProps={{
                initial: { opacity: 0.8, scale: 1, x: 0, y: 0 },
                animate: {
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.15, 1],
                  x: [0, 2, -1.5, 0],
                  y: [0, -2, 1.5, 0],
                },
                transition: {
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
            />

            <FloatingOrb 
              type="planet"
              color="#047A3CA3"
              className="w-24 h-24 top-[30%] right-[15%] absolute" 
              animationProps={{
                initial: { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 },
                animate: {
                  rotate: [0, -10, 0, 10, 0],
                  scale: [1, 1.15, 1],
                  x: ["0vw", "-2vw", "0vw", "2vw", "0vw"],
                  y: ["0vh", "-1vh", "0vh", "1vh", "0vh"],
                },
                transition: { 
                  duration: 6,        
                  ease: "easeInOut",   
                  repeat: Infinity,     
                  repeatType: "loop",   
                }
              }}
            />

            {/* Second floating orb with custom path and fade animation */}
            <FloatingOrb 
              type="planet"
              color="#2F67B4" 
              className="w-24 h-24 top-[70%] right-[15%] absolute" 
              animationProps={{
                animate: {
                  x: ["0vw", "-15vw", "0vw"],  
                  y: ["0vh", "-20vh", "0vh"],  
                  rotate: [0, 5, -5, 0],       
                  scale: [1, 1.1, 1],          
                },
                transition: { 
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              }}
            />


            {/* Email subscription form */}
            <form className="mt-6 w-full flex items-center gap-3 overflow-x-auto">
              {/* Wrapper for input with gradient border */}
              <div className="rounded-full p-[4px] bg-gradient-to-r from-[#666666] to-[#FFFFFF]/15 flex-1 min-w-0">
                <Input 
                  type="email" 
                  placeholder="Enter Email" 
                  className="w-full h-12 px-6 bg-neutral-900/80 
                  text-base text-white placeholder:text-neutral-400 
                  border-none rounded-full backdrop-blur-[18px] 
                  shadow-[0px_0px_6px_0px_rgba(91,91,91,0.25)] 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 
                  focus:ring-offset-2 focus:ring-offset-neutral-900"
                />
              </div>

              {/* Wrapper for submit button with gradient border */}
              <div className="rounded-full p-[4px] bg-gradient-to-r from-[#01A850]/65 to-[#01A850]/70 shrink-0">
                <Button 
                  type="submit" 
                  className="w-[142px] h-[44px] bg-[#01A850]/10 border-none 
                  rounded-full text-white text-base font-semibold backdrop-blur-[18px] 
                  hover:bg-[#01A850]/40 focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Notify me!
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
