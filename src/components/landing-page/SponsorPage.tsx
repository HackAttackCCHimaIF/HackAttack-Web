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

  const sponsors = [
    {
      label: "Rumah Marta",
      img: "/sponsor/RumahMarta.jpg",
      desc: "Rumah Marta",
    },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[140vh] w-full text-white overflow-hidden">
      {/* Background layers */}
      <Image src="/landing-page/bgsponsor.svg" alt="bg" fill className="object-cover -z-10" />
      <Image src="/landing-page/rectangle.svg" alt="bg" fill className="object-cover -z-10" />
      <Image
        src="/landing-page/Spotlight.svg"
        alt="spotlight"
        fill
        className="object-cover md:object-contain z-0 top-0 absolute left-1/2"
      />

      {/* Tirai kiri */}
      <div className="absolute left-0 top-0 h-full w-[14%] z-20 2xl:flex hidden">
        <Image
          src="/landing-page/tirai2.svg"
          alt="tirai kiri"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Tirai kanan */}
      <div className="absolute right-0 top-0 h-full w-[14%] z-20 rotate-y-180 2xl:flex hidden">
        <Image
          src="/landing-page/tirai2.svg"
          alt="tirai kanan"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center text-center z-30 px-4">
        <h1 className="uppercase text-2xl md:text-3xl">
          Our <span className="font-bold bg-[#EF4B72] px-3 py-1 rounded-md">Sponsor</span>
        </h1>
        <p className="max-w-2xl mt-4 text-base md:text-lg opacity-90">
          We’re proud to be supported by companies and organizations that believe in the power of
          youth-driven innovation.
        </p>
      </div>

      {/* Sponsors Section */}
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 z-30">
          {sponsors.map((sponsor, index) => (
            <Tooltip key={index} open={activeCard === index} onOpenChange={() => {}}>
              <TooltipTrigger asChild>
                <Card
                  onClick={() => handleCardClick(index)}
                  className="cursor-pointer border-2 border-white/40 bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-2xl overflow-hidden w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] aspect-square flex items-center justify-center"
                >
                  <CardContent className="w-full h-full flex items-center justify-center p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={sponsor.img}
                        alt={sponsor.label}
                        fill
                        className="object-contain transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                align="center"
                className="bg-white backdrop-blur-2xl border text-black text-sm md:text-base font-medium px-4 py-2 rounded-xl shadow-lg border-white/40"
                sideOffset={6}
              >
                <p>{sponsor.desc}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {/* Footer Placeholder (optional for page structure) */}
      <div className="w-full h-40" />
    </div>
  )
}

export default SponsorPage
