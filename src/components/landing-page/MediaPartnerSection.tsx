import React from "react"
import Image from "next/image"

const partners = [
  { name: "Hack", logo: "/icons/hack.svg" },
  { name: "CCI", logo: "/icons/cci.svg" },
  { name: "HIMA", logo: "/icons/hima.svg" },
  { name: "CCI", logo: "/icons/telkom.svg" },
]

const MediaPartnerSection = () => {
  return (
    <section className="w-full py-16  backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-lg font-medium text-white/70 mb-6">
          Our Media Partners
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={120}
                className="object-contain md:w-32 md:h-32 w-24 h-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MediaPartnerSection
