"use client"

import React, { useState } from "react"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SponsorPage = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index)
  }

   const sponsors: { size: "large" | "medium" | "small"; label: string }[] = [
    { size: "large", label: "Sponsor 1" },
    { size: "large", label: "Sponsor 2" },
    { size: "medium", label: "Sponsor 3" },
    { size: "medium", label: "Sponsor 4" },
    { size: "small", label: "Sponsor 5" },
    { size: "small", label: "Sponsor 6" },
  ]

  const sizeClasses = {
    large: "h-[120px] md:h-[160px] lg:h-[200px]",
    medium: "h-[90px] md:h-[120px] lg:h-[150px]",
    small: "h-[70px] md:h-[90px] lg:h-[110px]",
  }

  return (
    <div className="text-white w-screen h-full flex flex-col relative pt-16 overflow-hidden">
      {/* Backgrounds */}
      <Image src="/landing-page/bgsponsor.svg" alt="bg" fill className="object-cover" />
      <Image src="/landing-page/rectangle.svg" alt="bg" fill className="object-cover" />
      <Image
        src="/landing-page/Spotlight.svg"
        alt="spotlight"
        fill
        className="object-cover md:object-contain z-30 top-0 absolute left-1/2"
      />

      {/* Tirai kiri */}
      <div className="absolute left-0 top-0 h-full w-[13%] z-20 2xl:flex hidden">
        <Image src="/landing-page/tirai2.svg" alt="tirai kiri" fill priority className="object-contain" />
      </div>

      {/* Tirai kanan */}
      <div className="absolute right-0 top-0 h-full w-[14%] z-20 rotate-y-180 2xl:flex hidden">
        <Image src="/landing-page/tirai2.svg" alt="tirai kanan" fill priority className="object-contain" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center w-full gap-6 px-4 z-30">
        <h1 className="uppercase text-2xl">
          Our <span className="font-bold bg-[#EF4B72] pl-1 pr-3">Sponsor.</span>
        </h1>
        <div className="max-w-2xl text-center">
          <p className="text-lg">
            We’re proud to be supported by companies and organizations that believe in the power of
            youth-driven innovation.
          </p>
        </div>
      </div>

      {/* Cards Section */}
       <TooltipProvider delayDuration={0}>
        <div className="z-30 flex flex-col items-center gap-8 mt-12 px-4 pb-32">
          {/* Row 1 - Large */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-[70vw]">
            {sponsors.slice(0, 2).map((sponsor, index) => (
              <Tooltip
                key={index}
                open={activeCard === index}
                onOpenChange={() => {}}
              >
                <TooltipTrigger asChild>
                  <Card
                    onClick={() => handleCardClick(index)}
                    className={`cursor-pointer border-2 border-white bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${sizeClasses[sponsor.size]}`}
                  >
                    <CardContent className="w-full flex items-center justify-center h-full">
                      <p className="uppercase text-lg md:text-xl lg:text-2xl font-bold text-center">
                        {sponsor.label}
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="bg-white backdrop-blur-2xl border text-black text-sm md:text-base font-medium px-3 py-2 rounded-xl shadow-lg border-white/40"
                  sideOffset={4}
                >
                  <p>{sponsor.label} description or details</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Row 2 - Medium */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-[60vw]">
            {sponsors.slice(2, 4).map((sponsor, index) => (
              <Tooltip
                key={index + 2}
                open={activeCard === index + 2}
                onOpenChange={() => {}}
              >
                <TooltipTrigger asChild>
                  <Card
                    onClick={() => handleCardClick(index + 2)}
                    className={`cursor-pointer border-2 border-white bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${sizeClasses[sponsor.size]}`}
                  >
                    <CardContent className="w-full flex items-center justify-center h-full">
                      <p className="uppercase text-base md:text-lg lg:text-xl font-bold text-center">
                        {sponsor.label}
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="bg-white backdrop-blur-2xl border text-black text-sm md:text-base font-medium px-3 py-2 rounded-xl shadow-lg border-white/40"
                  sideOffset={4}
                >
                  <p>{sponsor.label} description or details</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Row 3 - Small */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-[50vw]">
            {sponsors.slice(4, 6).map((sponsor, index) => (
              <Tooltip
                key={index + 4}
                open={activeCard === index + 4}
                onOpenChange={() => {}}
              >
                <TooltipTrigger asChild>
                  <Card
                    onClick={() => handleCardClick(index + 4)}
                    className={`cursor-pointer border-2 border-white bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${sizeClasses[sponsor.size]}`}
                  >
                    <CardContent className="w-full flex items-center justify-center h-full">
                      <p className="uppercase text-sm md:text-base lg:text-lg font-bold text-center">
                        {sponsor.label}
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="bg-white backdrop-blur-2xl border text-black text-sm md:text-base font-medium px-3 py-2 rounded-xl shadow-lg border-white/40"
                  sideOffset={4}
                >
                  <p>{sponsor.label} description or details</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </TooltipProvider>

      {/* Footer placeholder */}
      <div className="w-full bg-black h-64 z-10" />
    </div>
  )
}

export default SponsorPage
