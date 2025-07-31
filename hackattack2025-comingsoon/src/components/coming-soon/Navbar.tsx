'use client';

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { List, X } from "phosphor-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "home", label: "Home" },
  { id: "countdown", label: "Time Count" },
  { id: "collab", label: "Contact Us" },
];

type NavbarProps = {
  activeSection: string;
};

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const iconList = ["hima", "telkom", "cci", "hack"];

  return (
    <nav className="fixed top-[20px] md:top-[30px] left-1/2 -translate-x-1/2 w-[95%] z-50">
      <div className="rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 p-[1px] shadow-[0_0_40px_6px_rgba(255,255,255,0.1)]">
        <div className="flex h-16 w-full items-center justify-between rounded-full bg-black px-6 backdrop-blur-md">
          {/* Logo dan ikon */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ y: -2, scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/"
                className="font-koulen text-2xl font-normal leading-none tracking-widest bg-gradient-to-r from-[#0F75BD] to-[#64BB48] text-transparent bg-clip-text"
              >
                HACKATTACK<span className="text-xs align-super text-white">25</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center">
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

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={32} weight="bold" /> : <List size={32} weight="bold" />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <motion.div whileHover={{ y: -2, scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Link
                        href={`#${item.id}`}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                          activeSection === item.id
                            ? "text-emerald-400 bg-none"
                            : "text-white hover:text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-[9999] w-[97%] bg-black/90 rounded-xl backdrop-blur-md p-4 md:hidden shadow-lg">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-semibold px-4 py-2 rounded-md transition ${
                  activeSection === item.id
                    ? "text-emerald-400"
                    : "text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex justify-start ml-3 mt-2">
              {iconList.map((icon) => (
                <div
                  key={icon}
                  className="rounded-full flex items-start justify-start"
                  style={{ width: 37.4, height: 37.4 }}
                >
                  <Image
                    src={`/icons/${icon}.svg`}
                    alt={`${icon} icon`}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
