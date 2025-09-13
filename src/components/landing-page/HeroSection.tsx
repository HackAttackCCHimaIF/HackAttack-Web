'use client'

import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden mt-12">
      {/* Background Map */}
      <div className="absolute inset-0 z-0 translate-y-10 blur-xs">
        <Image
          src="/landing-page/Map.svg"
          alt="Map background"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Cloud kanan */}
      <div className="absolute -bottom-1 left-0 lg:left-1/2 w-full h-[160px] md:h-[320px] lg:h-fit z-10">
                          <Image
                            src={"/landing-page/awanniga3.svg"}
                            alt="Awan"
                            width={100}
                            height={100}
                            className="w-full object-cover h-full"
                          />
                    </div>

      {/* Cloud kiri */}
      <div className="absolute bottom-0 hidden lg:flex left-0 w-1/3 sm:w-1/5 md:w-1/6 h-[100px] sm:h-[150px] md:h-[250px] z-10">
        <Image
          src="/landing-page/cloud2.svg"
          alt="Cloud background"
          fill
          className="object-cover"
          priority
        />
      </div>


      {/* Wayang Foreground */}
      <div className="absolute bottom-5 hidden lg:block sm:bottom-20 right-0 sm:right-14 rotate-0 sm:-rotate-1 w-[240px] sm:w-[400px]">
        <Image
          src="/landing-page/wayang.svg"
          alt="Wayang"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Wayang Blur (Shadow) */}
      <div className="absolute -bottom-40 sm:-bottom-50 -right-[70%] sm:-right-60 z-0 rotate-0 sm:-rotate-1 w-[660px] sm:w-[860px]">
        <Image
          src="/landing-page/wayang.svg"
          alt="Wayang"
          width={860}
          height={860}
          className="object-contain blur-sm"
        />
      </div>

      <div className="relative z-20 flex items-start justify-center h-full flex-col px-4 sm:px-8 lg:px-16 text-white">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[48px] font-bold text-start max-w-lg leading-tight sm:leading-none">
          <span className="block">
            Build Real Solutions for Indonesia —
          </span>
          <span className="block tracking-wide bg-[#EF4B72A3] max-w-[280px] sm:min-w-xl sm:max-w-full p-1 sm:p-2 sm:pr-8 uppercase">
            HACKATTACK 2025
          </span>
          <span className="block">
            is here!
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
