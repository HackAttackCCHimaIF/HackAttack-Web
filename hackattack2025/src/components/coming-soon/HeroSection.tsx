import React from 'react'
import { Input } from "@/components/ui/input"   // Import komponen Input shadcn
import { Button } from "@/components/ui/button" // Import komponen Button shadcn
import Image from 'next/image'

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-start text-white overflow-hidden">

      {/* Background SVG (Full Screen) */}
      <Image
        src="/bg.svg"
        alt="background planet"
        fill
        className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none select-none"
        priority
      />

      {/* Planet  */}
      {/* <Image 
        src="/planet.svg"
        alt="planet"
        fill
        className="absolute bottom-0 right-0 opacity-30 pointer-events-none select-none z-0"
      /> */}

      {/* Konten utama */}
      <div className="w-[95%] mx-auto z-10">
        <div className="container px-4 w-fit">
          <div className="max-w-4xl flex flex-col gap-1">

            <p className="font-semibold text-lg tracking-tight text-gray-200 ">
              HackAttack2025
            </p>

            <h1 className="text-[160px] font-black uppercase font-koulen leading-[130px]">
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-white text-transparent bg-clip-text">
                Coming
              </span>
              <br />
              <span>Soon!</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-xl font-medium">
              An exciting collaboration between HIMA IF and CCI, bringing you one of the most anticipated hackathons of the year.
            </p>

            <form className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <div className="rounded-full p-[4px] bg-gradient-to-r from-[#666666] to-[#FFFFFF]/15">
                <Input 
                  type="email" 
                  placeholder="Enter Email" 
                  className="min-w-md w-full h-12 px-6 bg-neutral-900/80 
                  text-base text-white placeholder:text-neutral-400 
                  border-none rounded-full backdrop-blur-[18px] 
                  shadow-[0px_0px_6px_0px_rgba(91,91,91,0.25)] 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 
                  focus:ring-offset-2 focus:ring-offset-neutral-900"
                />
              </div>
              <div className="rounded-full p-[4px] bg-gradient-to-r from-[#01A850]/65 to-[#01A850]/70">
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
  )
}

export default HeroSection
