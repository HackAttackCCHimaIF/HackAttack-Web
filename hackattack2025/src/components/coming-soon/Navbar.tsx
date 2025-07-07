'use client';

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { List, X } from "phosphor-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const iconList = ["hima", "telkom", "cci", "hack"];

  return (
    <nav className="fixed top-[60px] left-1/2 -translate-x-1/2 w-[95%] z-50">
      {/* Border Gradient + Shadow */}
      <div className="rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 p-[1px] shadow-[0_0_40px_6px_rgba(255,255,255,0.1)]">
        {/* Inner Navbar */}
        <div className="flex h-16 w-full items-center justify-between rounded-full bg-black px-6 backdrop-blur-md">
          {/* Kiri: Logo + Gambar Ikon */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-koulen font-semibold tracking-widest bg-gradient-to-r from-sky-400 to-emerald-400 text-transparent bg-clip-text"
            >
              HACKATTACK
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {iconList.map((icon, index) => (
                <div
                  key={index}
                  className="bg-white rounded-full p-1 flex items-center justify-center"
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
          </div>

          {/* Toggle Button for Mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X size={32} weight="bold" />
            ) : (
              <List size={32} weight="bold" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold bg-transparent text-emerald-400 hover:bg-white/5 hover:text-emerald-300 focus:text-emerald-300 transition-colors"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/time"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold bg-transparent text-white hover:bg-white/5 hover:text-gray-300 focus:text-gray-300 transition-colors"
                  >
                    Time Count
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold bg-transparent text-white hover:bg-white/5 hover:text-gray-300 focus:text-gray-300 transition-colors"
                  >
                    Contact Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[100px] left-1/2 -translate-x-1/2 w-[97%] bg-black/90 rounded-xl backdrop-blur-md p-4 z-50 md:hidden shadow-lg">
          

          {/* Mobile Links */}
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-400 text-lg font-semibold px-4 py-2 rounded-md hover:bg-white/5 transition"
            >
              Home
            </Link>
            <Link
              href="/time"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-white/5 transition"
            >
              Time Count
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-white/5 transition"
            >
              Contact Us
            </Link>
            {/* Mobile Icons */}
          <div className="flex justify-start ml-3 mb-4">
            {iconList.map((icon, index) => (
              <div
                key={index}
                className=" rounded-full flex items-start justify-start"
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
