import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const ThemePage = () => {
  return (
    <div className="flex flex-col min-h-full w-full">
      <HeaderDashboard bottomText="Theme" />

      <div className="flex-1 flex flex-col pb-5 px-4">
        <Card className="relative md:flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white h-fit overflow-hidden">
          {/* Wayang kiri (atas kiri) */}
          <div className="hidden xl:block absolute top-0 -left-10 w-[180px] md:w-[220px] lg:w-[260px] h-[260px] md:h-[340px] lg:h-[420px] z-0 pointer-events-none">
            <Image
              src="/theme/wayangkiri.png"
              alt="Wayang Kiri"
              fill
              className="object-contain opacity-30"
            />
          </div>

          {/* Candi (tengah bawah) */}
          <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[90px] md:h-[140px] lg:h-[180px] z-0 pointer-events-none">
            <Image
              src="/theme/candi.png"
              alt="Candi"
              fill
              className="object-contain w-full h-auto opacity-50"
            />
          </div>

          {/* Wayang kanan (bawah kanan) */}
          <div className="hidden xl:block absolute -bottom-4 -right-4 w-[220px] md:w-[320px] lg:w-[420px] h-[300px] md:h-[420px] lg:h-[560px] z-0 pointer-events-none">
            <Image
              src="/theme/wayang.png"
              alt="Wayang Kanan"
              fill
              className="object-contain opacity-30"
            />
          </div>

          {/* Konten teks */}
          <CardContent className="relative z-10 flex-1 flex items-start justify-start p-6 md:p-12 min-h-[60vh]">
            <div className="max-w-7xl space-y-6">
              {/* Judul Utama */}
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold leading-snug font-playfair max-w-3xl">
                Creating{" "}
                <span className="text-[#EF4B72] bg-white px-1">
                  Digital Solutions
                </span>{" "}
                for a More Inclusive Indonesia
              </h2>

              {/* Deskripsi awal */}
              <p className="text-base md:text-lg xl:text-xl leading-relaxed text-gray-200">
                Indonesia still faces real challenges: unequal development
                across regions, limited access to quality education, and gaps in
                job opportunities. But within these challenges lies a great
                opportunity to innovate.
              </p>

              <p className="text-base md:text-lg xl:text-xl leading-relaxed text-gray-200">
                Through technology, we can create solutions that don’t just
                solve today’s problems, but also pave the way toward a fairer,
                more sustainable, and more inclusive future for people across
                the archipelago.
              </p>

              {/* Highlight section */}
              <p className="text-lg md:text-xl xl:text-2xl font-semibold leading-relaxed">
                This theme invites participants to build digital solutions with
                real impact—bridging those who are left behind with new
                opportunities, narrowing inequality, and empowering communities
                through innovation.
              </p>

              {/* Closing statement */}
              <p className="text-base md:text-lg xl:text-xl leading-relaxed text-gray-200">
                Together, let’s create ideas and projects that are not only
                smart in technology but also meaningful for humanity. Because
                the best innovations are the ones that truly touch people’s
                lives.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemePage;
