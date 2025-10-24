import { ChevronRight } from "lucide-react"
import Image from "next/image"
import React from "react"

const MerchPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <Image
        src="/landing-page/map.svg"
        alt="Map"
        fill
        className="object-cover scale-110"
        priority
      />

      {/* Grid container */}
      <div className="px-4 sm:px-8 lg:px-16 z-10 relative">
        <div className="w-full min-h-screen row-span-9 lg:grid-rows-3 lg:min-h-[75vh] mb-8 mt-32 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 z-10 relative">

          {/* Item 1 - Baju */}
          <div className="col-span-2 relative md:col-span-3 lg:col-span-4 row-span-3 bg-[#BA4300]/20 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <Image
              src="/merch/Baju.png"
              alt="T-Shirt"
              fill
              className="object-contain absolute inset-0 mx-auto my-auto scale-110"
            />
            <div className="absolute top-8 left-8 flex gap-1 items-center">
              <div className="border-white border rounded-full p-0.5">
                <div className="rounded-full bg-white size-3.5" />
              </div>
              <div className="bg-black rounded-full size-3.5" />
            </div>
            <div className="absolute md:bottom-8 bottom-4 px-4 md:px-8 w-full items-center flex flex-row justify-between">
              <div className="max-w-sm text-white">
                <p className="text-xs sm:text-sm hidden md:block">
                  Soft, comfy, and easy to style—this tee isn’t just clothing, it’s a statement that you’re part of something bigger.
                </p>
              </div>
              <div className="p-2 bg-white/20 rounded-full">
                <div className="p-2 bg-white/20 rounded-full">
                  <ChevronRight className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 - Lanyard */}
          <div className="col-span-1 md:col-span-2 relative lg:col-span-2 row-span-3 lg:row-span-2 bg-[#0F75BD]/20 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <Image
              src="/merch/Lanyard.png"
              alt="Lanyard"
              fill
              className="object-contain absolute inset-0 scale-140"
            />
            <div className="absolute bottom-4 px-4 w-full items-center flex flex-row justify-between">
              <div className="max-w-sm text-white text-end">
                <h3 className="text-lg font-bold">Lanyard</h3>
                <p className="text-xs sm:text-sm hidden md:block">
                  Not just for holding your ID—this lanyard is a little badge of belonging, showing you’re part of a creative and inspiring community.
                </p>
              </div>
            </div>
          </div>

          {/* Item 3 - Key Chain */}
          <div className="col-span-3 md:col-span-5 relative lg:col-span-4 lg:row-span-1 row-span-2 bg-[#C7A7BC]/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <Image
              src="/merch/Key Chain.png"
              alt="Key Chain"
              fill
              className="object-contain absolute inset-0 mx-auto my-auto scale-110"
            />
            <div className="absolute top-4 px-4 items-start flex">
              <div className="max-w-sm text-white text-end">
                <h3 className="text-lg md:text-xl lg:text-4xl font-bold">Key Chain</h3>
              </div>
            </div>
          </div>

          {/* Item 4 - Sticker */}
          <div className="col-span-3 w-full md:col-span-5 relative lg:col-span-4 lg:row-span-1 row-span-2 bg-[#A90906]/20 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            {/* Sticker di kiri */}
            <Image
                src="/merch/Sticker.png"
                alt="Sticker Bundle"
                fill
                className="object-contain absolute top-0 scale-110"
            />

            {/* Text di kanan
            <Image
                src="/merch/text.png"
                alt="Sticker Text"
                fill
                className="object-contain absolute right-0 top-1/2 -translate-y-1/2 opacity-70"
            /> */}

            {/* Caption */}
            <div className="absolute bottom-4 right-4 flex items-end">
                <div className="max-w-sm text-white text-end uppercase">
                <h3 className="text-lg md:text-xl lg:text-4xl font-bold leading-4">
                    Sticker
                    <br />
                    <span className="text-base">Bundle</span>
                </h3>
                </div>
            </div>
            </div>


          {/* Item 5 - Tote Bag */}
          <div className="col-span-3 relative md:col-span-5 lg:col-span-6 row-span-2 h-full flex items-center lg:row-span-1 bg-[#E1C9B0]/20 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <Image
              src="/merch/Tote Bag.png"
              alt="Tote Bag"
              fill
              className="object-contain absolute inset-0 mx-auto my-auto scale-105 -z-10 opacity-90"
            />
            <div className="flex items-center justify-center w-full h-full px-4">
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                {/* Left */}
                <div className="flex flex-col items-start text-center md:text-left leading-none">
                  <h3 className="font-playfair uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none">
                    Tote
                  </h3>
                  <p className="text-xs sm:text-sm hidden md:block max-w-xs leading-snug">
                    Folds right into your pocket, opens up when you need it.
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end text-center md:text-right leading-none">
                  <h3 className="font-playfair uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none">
                    Bag
                  </h3>
                  <p className="text-xs sm:text-sm hidden md:block max-w-xs leading-snug">
                    Practical and perfect for everyday adventures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Title */}
        <div className="flex flex-row text-white items-center gap-4">
          <h2 className="uppercase text-2xl md:text-4xl font-bold leading-none tracking-tighter">
            Merch
            <br />
            Attack.
          </h2>
          <span className="font-bold text-[3.8rem] text-[#EF4B72] md:text-[5rem] leading-none tracking-tighter">
            2025
          </span>
        </div>
      </div>
    </div>
  )
}

export default MerchPage
