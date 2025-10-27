import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const ThemePage = () => {
  return (
    <div className="flex flex-col min-h-full w-full pt-16 md:pt-0">
      <HeaderDashboard bottomText="Theme" />

      <div className="flex-1 flex flex-col pb-5 px-4">
        <Card className="relative md:flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white h-fit overflow-hidden">
          {/* Candi di bawah tengah */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
            <Image
              src="/theme/candi.png"
              alt="candi"
              width={600}
              height={185}
              className="w-full md:w-full lg:w-1/2 h-auto"
            />
          </div>

          <div className="absolute bottom-0 right-0 pointer-events-none">
            <Image
              src="/theme/wayang.png"
              alt="wayang"
              width={900}
              height={1300}
              className="object-contain hidden lg:block w-[320px] opacity-20 h-auto"
            />
          </div>

          <div className="absolute top-0 left-0 pointer-events-none">
            <Image
              src="/theme/wayangatas.png"
              alt="wayang"
              width={900}
              height={1300}
              className="object-contain hidden lg:block w-[160px] opacity-20 h-auto"
            />
          </div>

          <CardHeader className="pt-12 relative z-10">
            <CardTitle className="text-2xl font-playfair md:text-3xl lg:text-4xl xl:text-5xl xl:max-w-1/2">
              Creating <span className="text-[#EF4B72] bg-white"> Digital Solutions</span> for a More Inclusive Indonesia
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex items-center justify-center relative z-10">
            <div className="text-lg flex flex-col gap-4 md:text-xl xl:text-2xl tracking-wider w-full text-justify">
              <p>
                Indonesia still faces real challenges: unequal development across regions, limited access to quality education, and gaps in job opportunities. But within these challenges lies a great opportunity to innovate.<br/>
              </p>
              <p>
                Through technology, we can create solutions that don’t just solve today’s problems, but also pave the way toward a fairer, more sustainable, and more inclusive future for people across the archipelago.<br/>
              </p>
              <p className="font-bold">
                Indonesia still faces real challenges: unequal development across regions, limited access to quality education, and gaps in job opportunities. But within these challenges lies a great opportunity to innovate.<br/>
              </p>
              <p>
                Through technology, we can create solutions that don’t just solve today’s problems, but also pave the way toward a fairer, more sustainable, and more inclusive future for people across the archipelago.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ThemePage;
