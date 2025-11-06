"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const InfoRow = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex flex-row gap-3 items-center">
    <Image
      src={icon}
      alt={text}
      width={40}
      height={40}
      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
    />
    <p className="text-sm sm:text-lg md:text-xl font-semibold">{text}</p>
  </div>
);

const WorkshopCard = ({
  title,
  date,
  time,
  description,
}: {
  title: string;
  date: string;
  time: string;
  description: string;
}) => (
  <Card className="bg-white/10 backdrop-blur-xs border border-white/10 w-full text-white rounded-md pt-0">
    <CardHeader className="pt-6 rounded-t-xl">
      <CardTitle className="flex items-stretch text-xl md:text-2xl lg:text-3xl font-semibold leading-snug gap-3">
        <div className="max-w-2 w-full bg-[#EF4B72]/60 rounded-none" />
        <h2 className="flex items-center">{title}</h2>
      </CardTitle>
    </CardHeader>
    <CardContent className="max-h-[60vh] overflow-y-auto space-y-6 h-full">
      <InfoRow icon="/calendar.svg" text={date} />
      <InfoRow icon="/clock.svg" text={time} />
    </CardContent>
    <CardFooter>
      <div className="py-2.5 px-4 border rounded-xl">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          Description
        </h3>
        <p className="text-white/85 text-sm sm:text-base">{description}</p>

      </div>
    </CardFooter>
  </Card>
);

const ExclusiveAccessSection = () => {
  return (
    <div className="flex justify-center items-center min-h-[200vh] md:min-h-[160vh]">
      <Card
        className="border-none bg-black rounded-3xl sm:rounded-[8rem] w-full text-white py-12 sm:py-24 px-6 sm:px-16 relative overflow-hidden"
        style={{
          boxShadow: `
            0 0 30px rgba(136, 206, 255, 0.5),
            0 0 60px rgba(136, 206, 255, 0.3),
            0 0 100px rgba(136, 206, 255, 0.2)
          `,
        }}
      >
        {/* Dekorasi */}
        <Image
          src="/batik.png"
          alt="Batik"
          width={300}
          height={300}
          className="object-contain absolute bottom-0 left-0 opacity-80 w-[200px] sm:w-[300px] h-auto"
        />
        <Image
          src="/batika.png"
          alt="Batik"
          width={300}
          height={300}
          className="object-contain absolute top-0 right-0 opacity-80 w-[200px] sm:w-[300px] h-auto"
        />
        <Image
          src="/wayangmerch.png"
          alt="Wayang"
          width={300}
          height={300}
          className="object-contain absolute bottom-0 right-0 opacity-80 w-[200px] sm:w-[300px] h-auto"
        />

        {/* Header */}
        <CardHeader>
          <CardTitle className="text-2xl sm:text-4xl font-bold mb-3 leading-snug md:leading-none">
            <span className="bg-gradient-to-r from-[#0f75bd] to-[#64BB48] bg-clip-text text-transparent">
              Workshop
            </span>
            : <br className="md:hidden block" />
            <span className="bg-[#EF4B72] px-2 py-1 block sm:inline mt-1 md:mt-0 w-fit">
              Exclusive Access
            </span>
          </CardTitle>
          <CardDescription className="text-base sm:text-xl font-semibold text-white">
            This is where champions begin
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="h-full grid grid-cols-1 md:grid-cols-2 mt-12 gap-6">
          <WorkshopCard
            title="Decode the Problem: Framing Ideas into Digital Impact for Nusantara"
            date="Minggu, 9 November 2025"
            time="13:00 - 16:00 WIB"
            description="Discover how to turn real-world challenges into sustainable digital solutions. In this workshop, you’ll learn to decode hackathon topics aligned with three SDGs and transform ideas into impactful innovations for Nusantara."
          />

          <WorkshopCard
            title="Code the Solution: Prototyping Smart Innovations for Real World Impact"
            date="Minggu, 16 November 2025"
            time="13:00 - 16:00 WIB"
            description="'Code the Solution: Prototyping Smart Innovations for Real-World Impact guides participants to transform concepts into interactive digital prototypes — bridging creativity with real-world solutions.'"
          />

          {/* Benefit */}
          <Card className="col-span-1 md:col-span-2 bg-white/10 backdrop-blur-xs border border-white/10 w-full text-white rounded-md pt-0">
            <CardHeader className="pt-6 rounded-t-xl">
              <CardTitle className="flex items-stretch text-xl md:text-2xl lg:text-3xl font-semibold leading-snug gap-3">
                <div className="w-full max-w-2 bg-[#EF4B72]/60 rounded-none" />
                <div className="flex flex-row gap-3 items-center">
                  <Image
                    src="/trophy.svg"
                    alt="Trophy"
                    width={28}
                    height={28}
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  />
                  <h2>Benefit</h2>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription className="text-white space-y-3">
                <ul className="list-disc list-inside marker:text-[#EF4B72]/80 space-y-0.5 text-sm sm:text-base leading-relaxed">
                  <li>
                    Networking with mentors and other participants.
                  </li>
                  <li>
                    Enhance your portfolio with an idea that blends creativity and impact.
                  </li>
                  <li>
                    Earn an official e-certificate (TAK for Telkom University Students).
                  </li>
                  <li>
                    Strong foundation for hackathon preparation.
                  </li>
                  <li>
                    Bonus GoPay Total 100K for Best Case Solution & Best Projects.
                  </li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>


        </CardContent>

        {/* Footer */}
        <CardFooter className="flex w-full items-center justify-center mt-12">
          <Link
            href="/workshop/payment"
            className={buttonVariants({
              className:
                "!rounded-none border !bg-white/10 w-auto border-white/30 !py-6 sm:!py-8 !px-8 sm:!px-12 hover:scale-105 hover:!bg-white/10 hover:border-white/40 transition-colors duration-300",
            })}
          >
            <p className="font-semibold text-xl sm:text-3xl text-white hover:text-white/80 transition-colors duration-300">
              Register
            </p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExclusiveAccessSection;
