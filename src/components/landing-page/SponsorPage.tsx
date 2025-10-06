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
      <div className="absolute left-0 top-0 h-full w-1/4 z-20 xl:flex hidden">
        <Image src="/landing-page/tirai2.svg" alt="tirai kiri" fill priority />
      </div>

      {/* Tirai kanan */}
      <div className="absolute right-0 top-0 h-full w-1/4 z-20 rotate-y-180 xl:flex hidden">
        <Image src="/landing-page/tirai2.svg" alt="tirai kanan" fill priority />
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
        <div className="px-4 z-30">
          {[90, 80, 70, 50].map((height, groupIdx) => (
            <div
              key={groupIdx}
              className={`mx-auto w-full gap-4 grid grid-cols-3 grid-rows-2 mt-8 md:mt-12 lg:mt-16 ${
                groupIdx === 0
                  ? "max-w-[90vw]"
                  : groupIdx === 1
                  ? "max-w-[80vw]"
                  : groupIdx === 2
                  ? "max-w-[70vw]"
                  : "max-w-[60vw] pb-16 md:pb-32 lg:pb-40"
              }`}
            >
              {Array.from({ length: 6 }, (_, index) => {
                const cardIndex = groupIdx * 6 + index
                const isActive = activeCard === cardIndex

                return (
                  <Tooltip key={cardIndex} open={isActive} onOpenChange={() => {}}>
                    <TooltipTrigger asChild>
                      <Card
                        onClick={() => handleCardClick(cardIndex)}
                        className="cursor-pointer w-full border-2 border-white bg-white/10 text-white rounded-2xl h-[60px] md:h-[80px] flex items-center justify-center transition-all duration-300 hover:bg-white/20"
                      >
                        <CardContent className="w-full flex items-center justify-center h-full">
                          <p className="uppercase text-sm md:text-lg lg:text-xl font-bold text-center">
                            Sponsor {cardIndex + 1}
                          </p>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>

                    <TooltipContent
                      side="top"
                      align="center"
                      className="bg-white backdrop-blur-2xl border-1 text-black text-sm md:text-base font-medium px-3 py-2 rounded-xl shadow-lg border-white/40"
                      sideOffset={4}
                      collisionPadding={8}
                      avoidCollisions
                    >
                      <p>Sponsor {cardIndex + 1} description or details</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          ))}
        </div>
      </TooltipProvider>

      {/* Footer placeholder */}
      <div className="w-full bg-black h-64 z-10" />
    </div>
  )
}

export default SponsorPage
