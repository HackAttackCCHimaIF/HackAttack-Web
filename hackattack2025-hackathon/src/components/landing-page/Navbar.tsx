"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iconList = ["hima", "telkom", "cci", "hack"];

  return (
    <nav className="w-full fixed top-0 z-50 px-4 sm:px-8 lg:px-16 py-4 ">
      <div className="flex items-center justify-between bg-stone-950/80 backdrop-blur-2xl px-8 rounded-full py-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Image
            src="/navbar/Icon.svg"
            alt="Site Logo"
            width={156}
            height={27}
            priority
            className="object-contain w-[100px] sm:w-[130px] lg:w-[156px]"
          />
          {/* Icon list only for md+ */}
          <div className="hidden md:flex items-center gap-3">
            {iconList.map((icon) => (
              <motion.div
                key={icon}
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center justify-center"
                style={{ width: 26, height: 26 }}
              >
                <Image
                  src={`/icons/${icon}.svg`}
                  alt={`${icon} icon`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 text-white font-medium">
            <Link
              href={"/"}
              className="cursor-pointer hover:text-pink-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="cursor-pointer hover:text-pink-400 transition-colors duration-200"
            >
              Workshop
            </Link>
            <Link
              href={"/"}
              className="cursor-pointer hover:text-pink-400 transition-colors duration-200"
            >
              Merch Attack
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="text-white border-none bg-[#84D26B]/25 hover:bg-[#84D26B]/40 rounded-full hover:text-white"
            >
              Guide Book
            </Button>
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-green-400 inline-block">
              <Button className="bg-stone-950 rounded-full w-full h-full text-white hover:bg-stone-800">
                Register Now
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-stone-950/90 backdrop-blur-2xl rounded-xl p-4">
          <div className="flex flex-col gap-3 text-white font-medium">
            <Link
              href={"/"}
              className="hover:text-pink-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="hover:text-pink-400 transition-colors duration-200"
            >
              Workshop
            </Link>
            <Link
              href={"/"}
              className="hover:text-pink-400 transition-colors duration-200"
            >
              Merch Attack
            </Link>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <Button
              variant="outline"
              className="text-white border-none bg-[#84D26B]/25 hover:bg-[#84D26B]/40 rounded-full hover:text-white w-full"
            >
              Guide Book
            </Button>
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-green-400 inline-block w-full">
              <Button className="bg-stone-950 rounded-full w-full h-full text-white hover:bg-stone-800">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
