"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { InstagramLogo, LinkedinLogo } from 'phosphor-react';
import { Input } from '../ui/input';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative text-white pt-12 pb-6 bg-transparent overflow-hidden">
      {/* Background SVG */}
      <Image
          src="/bg.svg"
          alt="Background"
          fill
          className="absolute inset-0 object-cover -z-10 pointer-events-none select-none opacity-60"
          priority
      />

      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

        {/* Glow hijau bawah kiri – lebih rendah agar sambung ke atas */}
        {/* <div className="absolute top-[-80px] left-[0] w-[400px] h-[400px] bg-green-400 opacity-[0.08] rounded-full blur-[160px] z-0" /> */}

        {/* Glow biru bawah kanan – didekatkan agar smooth fade */}
        {/* <div className="absolute top-[-100px] right-[0] w-[500px] h-[500px] bg-blue-400 opacity-[0.08] rounded-full blur-[200px] z-0" /> */}

      <div className="w-[95%] mx-auto px-1">
        {/* Konten Utama */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          {/* Kiri: Logo dan Navigasi */}
          <div className="flex flex-col gap-5 w-full md:max-w-md">
            <Link
              href="/"
              className="font-koulen text-[32px] font-normal leading-none tracking-widest bg-gradient-to-r from-[#0F75BD] to-[#64BB48] text-transparent bg-clip-text"
            >
              HACKATTACK<span className="text-xs align-super text-white">25</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/" className="hover:underline text-neutral-200">Home</Link>
              <Link href="/contact" className="hover:underline text-neutral-200">Contact Us</Link>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed">
              Get ready to code, build, and innovate your way through real-world tech challenges. Full details launching soon. Stay tuned!
            </p>
          </div>

          {/* Kanan: Form */}
          <div className="w-full md:max-w-md">
            <form className="flex flex-col gap-3 w-full">
              <label htmlFor="message" className="font-semibold text-neutral-200">
                Send us Message
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  id="message"
                  placeholder="Enter your Message"
                  className="bg-white text-black px-4 py-3 placeholder:text-neutral-500 border border-neutral-300 w-full rounded-none"
                />
                <Button 
                  type="submit"
                  className="bg-[#0F75BD] px-6 py-3 text-white hover:bg-[#0F75BD]/90 w-full sm:w-auto rounded-none"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4  h-full">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © 2025 HackAttack. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-neutral-400 hover:text-white transition">
              <InstagramLogo size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-neutral-400 hover:text-white transition">
              <LinkedinLogo size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
