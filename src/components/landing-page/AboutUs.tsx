"use client";

import Image from "next/image";
import { useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utility/utils";
import { CheckCircle2, ChevronRight } from "lucide-react";

const cardsData = [
  {
    title: "About HACKATTACK",
    imageSrc: (
      <>
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/3 h-full opacity-100">
          <Image
            src={"/landing-page/tirai.svg"}
            alt="wayang"
            fill
            className="object-cover inset-0 -z-10 bottom-0"
          />
        </div>
        <div className="pointer-events-none absolute top-0 left-0 right-0 w-1/3 h-full opacity-100">
          <Image
            src={"/landing-page/tirai.svg"}
            alt="wayang"
            fill
            className="object-cover rotate-y-180 inset-0 -z-10 bottom-0"
          />
        </div>
      </>
    ),
    content: (
      <>
        <p>
          <span className="font-bold">HackAttack 2025 </span>
          is a national hackathon that brings together students, young
          developers, and creative minds from across Indonesia. This year,
          we&apos;re challenging you to design solutions that truly make a
          difference, under the theme:
        </p>
        <p className="mt-5 italic font-bold">
          “Tech for Nusantara: Digitalization for the Nation.”
        </p>
        <p className="mt-2">[find the problem be the solution]</p>
      </>
    ),
  },
  {
    title: "Theme Hackattack",
    imageSrc: (
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/3 h-full opacity-50">
        <Image
          src={"/landing-page/wayang1.png"}
          alt="wayang"
          fill
          className="object-cover inset-0 -z-10 bottom-0"
        />
      </div>
    ),
    content: (
      <>
        <p>
          <span className="font-bold">Tech for Nusantara: </span>
          Digitalization for the Nation.
        </p>
        <p className="mt-5">
          From equal access to education, to fair workforce opportunities — this
          year’s theme invites you to tackle some of the most pressing issues in
          Indonesia. Your solution could be the one that changes the game.
        </p>
      </>
    ),
  },
  {
    title: "Total Benefit",
    imageSrc: (
      <div className="pointer-events-none absolute top-1/2 bottom-0 right-0 w-full opacity-50">
        <Image
          src={"/landing-page/candi.svg"}
          alt="wayang"
          fill
          className="object-cover inset-0 -z-10 bottom-0"
        />
      </div>
    ),
    content: (
      <ul className="space-y-3">
        {[
          "Prizes Worth Up to IDR 10 Million",
          "Exclusive Workshops Aligned with the Hackathon Theme",
          "Team Collaboration Experience",
          "Sharpen Your Creativity & Problem-Solving Skills",
          "Networking & Exposure Opportunities",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="text-pink-400 mt-1" size={20} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function AboutUs() {
  const [active, setActive] = useState(0);

  return (
    <main className="relative w-full min-h-screen flex items-center justify-center py-8 overflow-hidden">
      <div className="absolute rotate-x-180 hidden lg:flex top-0 left-0 w-1/3 sm:w-1/5 md:w-1/6 h-[100px] sm:h-[150px] md:h-[250px] z-10">
        <Image
          src="/landing-page/cloud2.svg"
          alt="Cloud background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute -top-1 left-0 lg:left-1/2 w-full h-[120px] md:h-[320px] lg:h-fit z-10">
        <Image
          src={"/landing-page/awanniga3.svg"}
          alt="Awan"
          width={100}
          height={100}
          className="w-full object-cover h-full rotate-x-180"
        />
      </div>

      <Image
        alt="Garuda"
        src={"/landing-page/garuda.svg"}
        fill
        className="absolute inset-0"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full px-4 sm:px-8 lg:px-16 mx-auto min-h-[580px] relative z-20">
        {cardsData.map((card, index) => (
          <div
            key={index}
            onClick={() => setActive(index)}
            className={cn(
              "cursor-pointer rounded-xl backdrop-blur-lg pb-6 max-h-[580px] bg-white/10 border border-white/20 overflow-hidden relative " +
                "transition-all duration-500 ease-in-out transform",
              active === index
                ? "lg:col-span-2 col-span-1 scale-102 shadow-2xl"
                : "col-span-1 scale-100"
            )}
          >
            <div className="absolute inset-0 bg-black/40 rounded-xl z-10"></div>

            <CardHeader className="min-h-[100px] pt-6 relative z-20 pr-44">
              <CardTitle className="flex flex-col items-start gap-1 w-full lg:max-w-[220px]">
                <span
                  className={cn(
                    "px-2 py-1 font-bold text-white text-2xl sm:text-3xl lg:text-4xl max-w-sm line-clamp-2 border-l-8 border-[#EF4B72A3]",
                    active === index ? "bg-[#EF4B72A3] border-none" : ""
                  )}
                >
                  {card.title}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent
              className={cn(
                "text-white text-base sm:text-lg relative z-20 lg:pr-44 duration-200",
                active === index ? "block" : "hidden"
              )}
            >
              {card.content}
            </CardContent>

            {card.imageSrc}
            <div className="absolute items-center justify-center flex bottom-4 right-4 rounded-full cursor-pointer bg-white/40 size-10 transition-all duration-500">
              <ChevronRight
                className={cn(
                  "text-white size-5 transition-all duration-500",
                  active === index ? "rotate-y-180" : "rotate-0"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
