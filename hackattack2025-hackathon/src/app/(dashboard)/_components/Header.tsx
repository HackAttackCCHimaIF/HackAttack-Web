"use client";

import React from "react";
import { usePathname } from "next/navigation";

const HeaderDashboard = () => {
  const pathname = usePathname();

  // Tentukan teks berdasarkan route
  let topText = "Build Real Solutions for Indonesia —";
  let bottomText = "HACKATTACK 2025";

  if (pathname.includes("/dashboard/peserta")) {
    topText = "Team";
    bottomText = "PROFILE";
  } else if (pathname.includes("/dashboard/theme")) {
    topText = "Build your"; 
    bottomText = "THEME";
  } else if (pathname.includes("/dashboard/guide-book")) {
    topText = "Explore the";
    bottomText = "GUIDE BOOK";
  } else if (pathname.includes("/dashboard/rule-book")) {
    topText = "Follow the";
    bottomText = "RULE BOOK";
  } else if (pathname.includes("/dashboard/submission")) {
    topText = "Submit your";
    bottomText = "SUBMISSION";
  }

  return (
    <div className="py-4 px-3">
      <h1 className="text-[28px] sm:text-[36px] font-bold text-start max-w-[240px] leading-tight sm:leading-none">
        {/* Span atas */}
        <span className="block text-white">{topText}</span>

        <span
          className={`block tracking-wide uppercase py-0.5 px-1 ${
            pathname.includes("/dashboard/profile")
              ? "bg-transparent text-white"
              : "bg-[#EF4B72A3] text-white"
          }`}
        >
          {bottomText}
        </span>
      </h1>
    </div>
  );
};

export default HeaderDashboard;
