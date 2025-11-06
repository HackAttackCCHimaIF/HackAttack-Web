"use client";

import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const GuideBookPage = () => {
  const guidebookImages = Array.from(
    { length: 13 },
    (_, i) => `/dashboard/guidebook_page-${i + 1}.jpg`
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      <HeaderDashboard bottomText="Book" topText="Guide" />

      <div className="flex-1 flex flex-col pb-5 px-4">
        <Card className="flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white">
          <CardContent className="h-full w-full overflow-y-auto p-4 max-h-[80vh]">
            {/* Grid responsif: 1 kolom di mobile, 2 kolom di md+ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {guidebookImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Guide Book Page ${index + 1}`}
                  width={700}
                  height={1000}
                  className="w-full h-auto rounded-lg object-contain"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgV4xPPwAAAAASUVORK5CYII="
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuideBookPage;
