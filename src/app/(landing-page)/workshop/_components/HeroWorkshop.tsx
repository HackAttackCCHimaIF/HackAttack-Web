"use client"

import Image from "next/image"
import React from "react"
import PosterShowcase from "./PosterShowcase"

const HeroWorkshop = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing-page/Map.svg"
          alt="Map background"
          fill
          priority
          className="object-cover md:object-contain transition-all duration-500"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col lg:grid lg:grid-cols-2 items-center justify-center h-full px-4 sm:px-8 lg:px-16 text-white">
        {/* Text Content */}
        <div className="flex flex-col items-start justify-center space-y-6 text-left">
          <h1 className="relative inline-block text-[28px] sm:text-[36px] lg:text-[48px] font-bold max-w-xl leading-tight sm:leading-none">
            <span className="absolute inset-0 blur-[32px] bg-white/15 -z-10 rounded-lg"></span>
            <p>
              HackAttack{" "}
              <span className="bg-gradient-to-r from-[#0f75bd] to-[#64BB48] bg-clip-text text-transparent">
                Workshop
              </span>
            </p>
          </h1>

          <div className="max-w-md">
            <p className="text-lg sm:text-xl font-semibold">
              Level up with our exclusive
            </p>
            <div className="relative bg-[#EF4B72] px-2 py-1 overflow-hidden inline-block mt-1">
              <div className="absolute inset-0 blur-[20px] bg-white/50 -z-10" />
              <p className="text-lg sm:text-xl font-semibold relative">
                HackAttack workshops!
              </p>
            </div>
          </div>
        </div>

        {/* Poster */}
        <div className="hidden md:flex items-center justify-center w-full h-full">
          <PosterShowcase />
        </div>
      </div>
    </section>
  )
}

export default HeroWorkshop
