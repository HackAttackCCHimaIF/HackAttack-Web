'use client'

import Image from 'next/image'
import React from 'react'

const HeroWorkshop = () => {
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

      <div className="relative z-20 flex items-start justify-center h-full flex-col px-4 sm:px-8 lg:px-16 text-white">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[48px] font-bold text-start max-w-xl leading-tight sm:leading-none">
          <span className="block font-bold">
                HackAttack
                <span className="bg-gradient-to-r from-[#0f75bd] to-[#64BB48] bg-clip-text text-transparent">
                    {" "}Workshop
                </span>
            </span>
        </h1>
        <div className="mt-3 max-w-md">
          <p className="text-lg sm:text-xl font-semibold">
            Level up with our exclusive 
          </p>
          <div className='bg-[#EF4B72] px-2 py-1'>
            <p className="text-lg sm:text-xl font-semibold">
                HackAttack workshops!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroWorkshop
