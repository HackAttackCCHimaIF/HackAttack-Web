import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const ThemePage = () => {

  return (
    <div className="flex flex-col min-h-full w-full">
      <HeaderDashboard bottomText="Theme" />
      <div className="flex-1 flex flex-col pb-5 px-4">
        <Card className="md:flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white h-fit">
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="max-w-2xl text-justify">
              <p className="text-lg md:text-xl xl:text-2xl md:font-medium tracking-wider">
                Tema ini mengajak peserta untuk menghadirkan solusi digital yang
                mampu menjawab tantangan nyata di Indonesia, terutama dalam
                konteks ketimpangan pembangunan, pendidikan, dan pekerjaan.
                Melalui pendekatan teknologi dan inovasi, peserta diharapkan
                mampu menciptakan solusi yang inklusif, berkelanjutan, dan
                berdampak luas bagi masyarakat di berbagai pelosok Nusantara.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemePage;
