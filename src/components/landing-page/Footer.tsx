"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InstagramLogo, LinkedinLogo, TiktokLogo } from "phosphor-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameMessage) {
      toast.error("Please enter your name");
      return;
    }

    if (!emailMessage.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!message) {
      toast.error("Please enter your message");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/sendmessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailMessage.trim(),
          name: nameMessage,
          message: message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setEmailMessage("");
        setNameMessage("");
        setMessage("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again (Footer).");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <footer className="relative text-white pt-12 pb-6 bg-transparent overflow-hidden z-[9999]">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-[-1]" />

      {/* Glow hijau bawah kiri – lebih rendah agar sambung ke atas */}
      {/* <div className="absolute top-[-80px] left-[0] w-[400px] h-[400px] bg-green-400 opacity-[0.08] rounded-full blur-[160px] z-0" /> */}

      {/* Glow biru bawah kanan – didekatkan agar smooth fade */}
      {/* <div className="absolute top-[-100px] right-[0] w-[500px] h-[500px] bg-blue-400 opacity-[0.08] rounded-full blur-[200px] z-0" /> */}

      <div className="w-[95%] mx-auto px-1">
        {/* Konten Utama */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Kiri: Logo dan Navigasi */}
          <div className="flex flex-col gap-5 w-full md:max-w-md">
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/"
                className="font-koulen text-[32px] font-normal leading-none tracking-widest bg-gradient-to-r from-[#0F75BD] to-[#64BB48] text-transparent bg-clip-text"
              >
                HACKATTACK
                <span className="text-xs align-super text-white">25</span>
              </Link>
            </motion.div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <motion.div
                whileHover={{ y: -1, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/" className=" text-neutral-200">
                  Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -1, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hackattack.ccihimaif25@gmail.com&su=Contact%20Us%20From%20Hackattack%20Website"
                  className=" text-neutral-200"
                >
                  Contact us
                </Link>
              </motion.div>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed">
              Get ready to code, build, and innovate your way through real-world
              tech challenges. Full details launching soon. Stay tuned!
            </p>
          </div>

          {/* Kanan: Form */}
          <div className="w-full md:max-w-md">
            <form
              className="flex flex-col gap-3 w-full"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="message"
                className="font-semibold text-neutral-200"
              >
                Send us a Message
              </label>
              {/* Row 1: Name and Email inputs */}
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-row gap-2 w-full">
                  <Input
                    id="nameMessage"
                    value={nameMessage}
                    onChange={(e) => setNameMessage(e.target.value)}
                    placeholder="Your Name"
                    className="bg-white text-black px-4 py-3 placeholder:text-neutral-500 border border-neutral-300 w-1/3 rounded-none"
                    required
                  />
                  <Input
                    id="emailMessage"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Your Email"
                    className="bg-white text-black px-4 py-3 placeholder:text-neutral-500 border border-neutral-300 w-full rounded-none"
                    required
                  />
                </div>
              </div>
              {/* Row 2: Message input */}
              <Input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="bg-white text-black px-5 py-5 placeholder:text-neutral-500 border border-neutral-300 w-full rounded-none"
                required
              />
              {/* Row 3: Send button */}
              <motion.div
                whileHover={!isLoading ? { y: -1, scale: 1.03 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full sm:w-auto"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    px-6 py-3 text-white w-full rounded-none
                    transition-all duration-200 ease-in-out
                    ${
                      isLoading
                        ? "bg-[#0F75BD]/70 cursor-not-allowed"
                        : "bg-[#0F75BD] hover:bg-[#0F75BD]/90 hover:shadow-lg"
                    }
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send"
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4  h-full">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © 2025 HackAttack. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ y: -1, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="https://www.instagram.com/hackattack.ccihimaif/"
                aria-label="Instagram"
                target="_blank"
                className="text-neutral-400 hover:text-white transition"
              >
                <InstagramLogo size={20} />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -1, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="https://www.linkedin.com/company/hackattack2025/"
                aria-label="LinkedIn"
                target="_blank"
                className="text-neutral-400 hover:text-white transition"
              >
                <LinkedinLogo size={20} />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -1, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="https://www.tiktok.com/@hackattack2025"
                aria-label="Tiktok"
                target="_blank"
                className="text-neutral-400 hover:text-white transition"
              >
                <TiktokLogo size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
