"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const cardsData = [
  {
    title: "About HACKATTACK",
    imageSrc: <Image src={"/landing-page/wayang1.png"} alt="wayang" fill className="object-contain right-0 z-0"/>,
    content: (
      <>
        <p>
          <span className="font-bold">HackAttack 2025 </span>
          is a national hackathon that brings together students,
          young developers, and creative minds from across Indonesia. This year,
          we&apos;re challenging you to design solutions that truly make a difference,
          under the theme:
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
    imageSrc: <Image src={"/landing-page/wayang1.png"} alt="wayang" fill className="object-contain inset-0 -z-10 bottom-0 "/>,
    content: (
      <>
        <p>
          <span className="font-bold">Tech for Nusantara: </span>
          Digitalization for the Nation.
        </p>
        <p className="mt-5">
          From equal access to education, to fair workforce opportunities —
          this year’s theme invites you to tackle some of the most pressing
          issues in Indonesia. Your solution could be the one that changes the game.
        </p>
      </>
    ),
  },
  {
    title: "Total Benefit",
    imageSrc: <Image src={"/landing-page/wayang1.png"} alt="wayang" fill className="object-contain inset-0 -z-10"/>,
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
    <main className="relative w-full min-h-screen flex items-center justify-center">
      {/* Background cloud */}
      {/* <div className="absolute top-0 right-0 w-2/3 h-[400px] z-10">
        <Image
          src="/landing-page/CLOUD (3).svg"
          alt="Cloud background"
          fill
          className="object-cover"
          priority
        />
      </div> */}

      {/* Background garuda */}
      <Image
        alt="Garuda"
        src={"/landing-page/garuda.svg"}
        fill
        className="absolute inset-0"
      />

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 w-full px-16 mx-auto min-h-[580px] relative z-20">
        {cardsData.map((card, index) => (
          <motion.div
            key={index}
            layout
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onClick={() => setActive(index)}
            className={cn(
              "cursor-pointer rounded-xl backdrop-blur-lg max-h-[580px] bg-white/10 border border-white/20 hover:bg-white/15 overflow-hidden relative",
              active === index ? "col-span-2" : "col-span-1"
            )}
          >
            {/* Gambar fixed di kanan, absolute */}
            {card.imageSrc && (
              <motion.div layout="position" className="pointer-events-none absolute top-0 bottom-0 right-0 w-[300px] opacity-50">
                <motion.div layout="position" className="relative w-full h-full">
                  {card.imageSrc}
                </motion.div>
              </motion.div>
            )}

            {/* Overlay supaya teks tetap terbaca */}
            <div className="absolute inset-0 bg-black/40 rounded-xl z-10"></div>

            {/* Konten dengan padding kanan supaya teks gak tertutup gambar */}
            <CardHeader className="min-h-[100px] pt-6 relative z-20 pr-44">
              <CardTitle className="flex flex-col items-start gap-1 max-w-[240px]">
                <motion.span
                  layout
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className={cn(
                    "px-2 py-1 font-bold text-white text-4xl max-w-sm line-clamp-2 border-l-8 border-[#EF4B72A3]",
                    active === index ? "bg-[#EF4B72A3] border-none" : ""
                  )}
                >
                  {card.title}
                </motion.span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white text-lg relative z-20 pr-44">
              <motion.div layout="position">{card.content}</motion.div>
            </CardContent>
          </motion.div>

        ))}
      </div>
    </main>
  );
}
