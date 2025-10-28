import React from "react"
import Image from "next/image"

const partners = [
  { name: "Info Lomba IT", logo: "/media/infoLombaIT.png" },
  { name: "Cyber Physical System Laboratory", logo: "/media/CPS.png" },
  { name: "HMSI", logo: "/media/HMSI.png" },
  // { name: "HMTI", logo: "/media/HMTI.png" },
  { name: "HMTT Telco", logo: "/media/HMTT Telco.png" },
  // { name: "RPL", logo: "/media/RPL.png" },
  { name: "KMTE", logo: "/media/KMTE.png" },
  { name: "EISD", logo: "/media/EISD Logo.png" },
  { name: "Motion Laboratory", logo: "/media/motion.png" },
  { name: "himads", logo: "/media/himads.png" },
  { name: "FSL", logo: "/media/FSL.png" },
  { name: "Chevalier Laboratory", logo: "/media/Chevalier.png" },
  { name: "MBC", logo: "/media/MBC.png" },
  { name: "UPI", logo: "/media/UPI.png" },
  { name: "Info Event", logo: "/media/InfoEvent.png" },
  { name: "Lomba MahasiswaID", logo: "/media/LombaMahasiswaID.png" },
]

const MediaPartnerSection = () => {
  return (
    <section className="w-full py-16 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
          Our Media Partners
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {partners.map((partner) => {
            const isCPS = partner.name === "Cyber Physical System Laboratory"

            return (
              <div
                key={partner.name}
                className={`opacity-85 hover:opacity-100 duration-300 hover:scale-120 transition-all flex justify-center items-center ${
                  isCPS
                    ? "md:w-[260px] md:h-[160px] w-[200px] h-[120px]"
                    : "md:w-32 md:h-32 w-24 h-24"
                }`}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={isCPS ? 260 : 120}
                  height={isCPS ? 160 : 120}
                  className={`object-contain ${
                    isCPS ? "scale-110" : ""
                  } transition-transform duration-300`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MediaPartnerSection
