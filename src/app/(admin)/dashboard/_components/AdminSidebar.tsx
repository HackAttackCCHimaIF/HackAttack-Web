"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, LogOut, Menu, X, LogIn, UserPlus, UserCog, Camera } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utility/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface SidebarProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
}

export default function AdminSidebar({ isLoggedIn, onSignOut }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Registration", href: "/dashboard/admin", icon: <UserCog size={18} className="fill-current text-white" fill="white"/> },
    { label: "Submission", href: "/dashboard/admin/submission", icon: <FileText size={18} /> },
    { label: "Workshop", href: "/dashboard/admin/workshop", icon: <Camera size={18} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50 w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition"
        >
          <Menu size={24} className="text-white" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="hidden md:flex fixed top-4 left-4 h-[96vh] w-64 border-white border bg-gradient-to-t from-black to-white/50 backdrop-blur-sm shadow-xl flex-col justify-between rounded-3xl overflow-hidden"
      >
        {/* Logo & Navigation */}
        <div className="flex flex-col h-full items-start pt-12 gap-12 text-white text-xl font-bold">
          <div className="flex flex-row items-center px-6">
            <Image src="/dashboard/logo.svg" alt="Logo" className="w-9 h-9" width={36} height={36} />
            <div className="leading-none ml-2">
              <p>HACKATTACK</p>
              <p className="text-sm">2025</p>
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
                <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 p-3 pb-2 pl-6 rounded-lg text-gray-300 hover:text-white relative transition
                    ${pathname === item.href ? "text-white font-semibold" : ""}`}
                >
                {pathname === item.href && (
                    <div className="absolute left-0 top-0 h-full w-2 bg-[#0F75BD] rounded-md"></div>
                )}
                <div
                    className={cn(
                    "flex items-center gap-3 px-4 py-1 w-full transition",
                    pathname === item.href
                        ? "bg-gradient-to-r from-[#0F75BD] to-white/20"
                        : ""
                    )}
                >
                    <div
                    className={cn(
                        "text-white p-2 rounded-full",
                        pathname === item.href
                        ? "bg-[radial-gradient(circle_at_center,#0F75BD_0%,#97B3D9_50%,#5579AB_100%)]"
                        : "bg-white/10"
                    )}
                    >
                    {item.icon}
                    </div>
                    <span>{item.label}</span>
                </div>
                </a>
            ))}
            </nav>

        </div>

        {/* Bottom Section */}
        <div className="p-6 flex flex-col gap-3">
          {isLoggedIn ? (
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({className: "bg-white/50 hover:bg-white/60 !px-4 !py-6"})}
              >
                <LogIn size={18} />
                <span>Login as Admin</span>
              </Link>
              <Link
                href="/register"
                className={buttonVariants({className: "bg-white/10 hover:bg-white/20 text-white !px-4 !py-6"})}
              >
                <UserPlus size={18} />
                <span>Register as Admin</span>
              </Link>
            </>
          )}
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 left-0 h-full w-64 border-white border-r bg-gradient-to-t from-black to-white/50 backdrop-blur-sm shadow-xl flex flex-col justify-between rounded-r-3xl overflow-hidden z-50 text-white"
            >
              <div className="flex justify-between items-center px-6 py-4">
                <div className="flex items-center gap-2 font-bold">
                  <Image src="/dashboard/logo.svg" alt="Logo" width={36} height={36} />
                  <span>HACKATTACK</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 px-6">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white relative transition
                      ${pathname === item.href ? "text-pink-500 font-semibold" : ""}`}
                  >
                    {pathname === item.href && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-pink-500 rounded-r-md"></div>
                    )}
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="p-6 flex flex-col gap-3">
                {isLoggedIn ? (
                  <button
                    onClick={onSignOut}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <>
                    <a
                      href="/sign-in"
                      className="flex items-center gap-2 bg-white/50 hover:bg-white/60 px-4 py-2 rounded-lg transition"
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </a>
                    <a
                      href="/sign-up"
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
                    >
                      <UserPlus size={18} />
                      <span>Register</span>
                    </a>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
