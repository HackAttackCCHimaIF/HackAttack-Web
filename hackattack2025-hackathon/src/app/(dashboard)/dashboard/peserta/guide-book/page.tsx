"use client";

import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";

const GuideBookPage = () => {
  const [userProfile] = useState({ name: "John Doe", isLoggedIn: true });

  const guidebookImages = Array.from({ length: 13 }, (_, i) => `/dashboard/guide${i + 1}.png`);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <HeaderDashboard userProfile={userProfile} bottomText="Book" topText="Guide"/>

      <div className="flex-1 flex flex-col pb-5">
        <Card className="flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white">
          <CardContent className="h-full w-full overflow-y-auto p-4 max-h-[80vh]">
            <div className="w-full flex flex-col">
              {guidebookImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Guide Book Page ${index + 1}`}
                  width={1200}
                  height={1800}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
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
