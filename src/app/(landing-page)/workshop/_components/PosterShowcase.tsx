"use client"

import Image from "next/image"
import React, { useState } from "react"

const PosterShowcase = () => {
  // Default aktif poster pertama (index 0)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handlePosterClick = (index: number) => {
    // Kalau klik yang lain, ganti aktif
    if (activeIndex !== index) {
      setActiveIndex(index)
    }
    // Kalau klik yang sama, biarkan tetap aktif (tidak toggle)
  }

  return (
    <div className="flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
      <div className="relative flex gap-3 perspective">
        {/* Poster kiri */}
        <div
          onClick={() => handlePosterClick(0)}
          className={`transform-style preserve-3d transition-all duration-500 cursor-pointer ${
            activeIndex === 0 ? "opacity-100 scale-105" : "opacity-50 hover:opacity-80"
          }`}
        >
          <Image
            src="/poster/hackattack.PNG"
            alt="HackAttack Workshop 1"
            width={338}
            priority
            height={332}
            className="rounded-xl shadow-2xl transform rotate-y-10"
          />
        </div>

        {/* Poster kanan */}
        <div
          onClick={() => handlePosterClick(1)}
          className={`transform-style preserve-3d transition-all duration-500 cursor-pointer ${
            activeIndex === 1 ? "opacity-100 scale-105" : "opacity-50 hover:opacity-80"
          }`}
        >
          <Image
            src="/poster/hackattack.PNG"
            alt="HackAttack Workshop 2"
            width={338}
            height={332}
            priority
            className="rounded-xl shadow-2xl transform -rotate-y-10"
          />
        </div>
      </div>
    </div>
  )
}

export default PosterShowcase
