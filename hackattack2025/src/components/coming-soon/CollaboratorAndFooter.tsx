"use client";

import Image from "next/image";
import OrbitalAnimation from "./planet/CollaboratorOrbit";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function CollaboratorPage() {
  return (
    <div className="relative w-full h-full overflow-hidden ">

      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.svg"
          alt="Background"
          fill
          className="object-cover w-full h-full pointer-events-none select-none opacity-60"
          priority
        />
      </div>

      {/* Orbital animation and header content */}
      <div className="relative inset-0 z-0">
        <OrbitalAnimation />

        {/* Animated Text Section on Scroll */}
        <motion.div
          className="absolute bottom-10 right-2 md:right-5 lg:right-7 xl:right-10 text-white text-right border-r-4 pr-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          {/* Glow hijau kiri */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-400 opacity-10 rounded-full blur-[180px] z-0" />

          {/* Glow biru kanan */}
          <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-blue-400 opacity-10 rounded-full blur-[220px] z-0" />

          <div className="text-xl sm:text-2xl font-semibold">HackAttack2025</div>
          <div className="text-4xl sm:text-5xl font-koulen tracking-wider">
            COLLABORATION
          </div>
          <div className="text-xl sm:text-5xl font-koulen tracking-wider">
            PARTNERS
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
