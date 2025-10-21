import { HeaderDashboard } from "@/app/(dashboard)/_components/HeaderDashboard";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const RuleBookPage = () => {
  const guidebookImages = Array.from(
    { length: 13 },
    (_, i) => `/dashboard/Rulebook_page-000${i + 1} 1.png`
  );

  return (
    <div className="flex flex-col min-h-screen w-full pt-16 md:pt-0">
      <HeaderDashboard bottomText="Book" topText="Rule" />

      <div className="flex-1 flex flex-col pb-5 px-4">
        <Card className="flex-1 bg-white/10 backdrop-blur-md border-3 border-white/10 rounded-2xl text-white">
          <CardContent className="h-full w-full overflow-y-auto p-4 max-h-[80vh]">
            {/* Grid responsif: 1 kolom di mobile, 2 kolom di lg+ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {guidebookImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Rule Book Page ${index + 1}`}
                  width={1400}
                  height={2000}
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

export default RuleBookPage;
