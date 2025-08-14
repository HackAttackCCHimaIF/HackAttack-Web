'use client'

import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden mt-12">
      {/* Background Map */}
      <div className="absolute inset-0 z-0 translate-y-10 blur-sm">
        <Image
          src="/landing-page/Map.svg"
          alt="Map background"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Cloud */}
      {/* <div className="absolute bottom-0 right-0 w-full sm:w-2/3 h-[200px] sm:h-[400px] z-10">
        <Image
          src="/landing-page/CLOUD (4).svg"
          alt="Cloud background"
          fill
          className="object-cover"
          priority
        />
      </div> */}

      {/* Wayang Foreground */}
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-14 rotate-0 sm:-rotate-1 w-[240px] sm:w-[400px]">
        <Image
          src="/landing-page/wayang.svg"
          alt="Wayang"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Wayang Blur (Shadow) */}
      <div className="absolute -bottom-20 sm:-bottom-50 -right-[70%] sm:-right-60 z-0 rotate-0 sm:-rotate-1 w-[660px] sm:w-[860px]">
        <Image
          src="/landing-page/wayang.svg"
          alt="Wayang"
          width={860}
          height={860}
          className="object-contain blur-sm"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 flex items-start justify-center h-full flex-col px-4 sm:px-8 lg:px-16 text-white">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[48px] font-bold text-start max-w-lg leading-tight sm:leading-none">
          <span className="block">
            Build Real Solutions for Indonesia —
          </span>
          <span className="block bg-[#EF4B72A3] p-1 sm:p-2 sm:pr-8 uppercase">
            HACKATTACK 2025
          </span>
          <span className="block">
            Is here
          </span>
        </h1>
        <div className="mt-3 max-w-md">
          <p className="text-sm sm:text-base font-medium">
            Are you ready to turn ideas into impact? Join one of..
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
