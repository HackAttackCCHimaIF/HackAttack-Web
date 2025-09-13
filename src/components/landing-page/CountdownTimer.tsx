"use client";
import React from "react";
import { motion } from "framer-motion";
import TimeDisplay from "./TimeDisplay";

const CountdownTimer = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="relative w-full flex items-center justify-center text-white py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <TimeDisplay />
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl sm:mt-3 md:mt-6 text-white text-center">
            Until Hackathon Start
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;
