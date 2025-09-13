"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/config/supabase";
import { User } from "@supabase/supabase-js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const iconList = ["hima", "telkom", "cci", "hack"];

  const homeSubItems = [
    { href: "#about-us", label: "About Us" },
    { href: "#timeline", label: "Timeline" },
    { href: "#countdown", label: "Countdown" },
    { href: "#speeddating", label: "Speed Dating" },
    { href: "#sponsor", label: "Sponsor" },
    { href: "#faq", label: "FAQ" },
  ];

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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

        <div className="hidden xl:flex items-center gap-6">
          <div className="flex items-center gap-6 text-white font-medium">
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-1 cursor-pointer transition-colors duration-200 pb-1 ${
                  pathname === "/"
                    ? "text-pink-400 border-b-2 border-pink-400"
                    : "hover:text-pink-400"
                }`}
              >
                Home
                {open ? (
                  <ChevronUp size={16} className="transition-transform" />
                ) : (
                  <ChevronDown size={16} className="transition-transform" />
                )}
              </button>

              {open && (
                <div className="absolute left-0 mt-6 border border-white/5 w-48 rounded-lg bg-stone-950/80 backdrop-blur-2xl shadow-lg transition-all duration-200 ease-in-out">
                  {homeSubItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/workshop"
              className={`cursor-pointer transition-colors duration-200 pb-1 ${
                pathname === "/workshop"
                  ? "text-pink-400 border-b-2 border-pink-400"
                  : "hover:text-pink-400"
              }`}
            >
              Workshop
            </Link>
            <Link
              href="/merch"
              className={`cursor-pointer transition-colors duration-200 pb-1 ${
                pathname === "/merch"
                  ? "text-pink-400 border-b-2 border-pink-400"
                  : "hover:text-pink-400"
              }`}
            >
              Merch Attack
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="text-white border-none bg-[#84D26B]/25 border border-[#84D26B] hover:bg-[#84D26B]/40 rounded-full hover:text-white"
            >
              Guide Book
            </Button>
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-green-400 inline-block">
              {!loading && (
                <Link
                  href={user ? "/dashboard/peserta" : "/register"}
                  className="w-full"
                >
                  <Button className="bg-stone-950 rounded-full w-full h-full text-white hover:bg-stone-800">
                    {user ? "Dashboard" : "Register Now"}
                  </Button>
                </Link>
              )}
              {loading && (
                <Button
                  className="bg-stone-950 rounded-full w-full h-full text-white hover:bg-stone-800"
                  disabled
                >
                  Loading...
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="xl:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden mt-4 flex flex-col gap-4 bg-stone-950/90 backdrop-blur-2xl rounded-xl px-4 py-8">
          <div className="flex flex-col gap-3 text-white font-medium">
            <div className="flex flex-col">
              <button
                onClick={() => setIsHomeOpen(!isHomeOpen)}
                className={`flex items-center justify-between transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-pink-400 underline"
                    : "hover:text-pink-400"
                }`}
              >
                <span>Home</span>
                {isHomeOpen ? (
                  <ChevronUp size={18} className="ml-2" />
                ) : (
                  <ChevronDown size={18} className="ml-2" />
                )}
              </button>

              {isHomeOpen && (
                <div className="my-3.5 ml-4 flex flex-col gap-2.5">
                  {homeSubItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="text-sm text-gray-300 hover:text-pink-400"
                      onClick={() => {
                        setIsHomeOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/workshop"
              className={`transition-colors duration-200 ${
                pathname === "/workshop"
                  ? "text-pink-400 underline"
                  : "hover:text-pink-400"
              }`}
            >
              Workshop
            </Link>

            <Link
              href="/merch"
              className={`transition-colors duration-200 ${
                pathname === "/merch"
                  ? "text-pink-400 underline"
                  : "hover:text-pink-400"
              }`}
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
              {!loading && (
                <Link
                  href={user ? "/dashboard" : "/register"}
                  className="w-full"
                >
                  <Button className="bg-stone-950 rounded-full w-full h-full text-white hover:bg-stone-800">
                    {user ? "Dashboard" : "Register Now"}
                  </Button>
                </Link>
              )}
              {loading && (
                <Button
                  className="bg-stone-950 rounded-full w-full h-full text-white hover:bg-stone-800"
                  disabled
                >
                  Loading...
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
