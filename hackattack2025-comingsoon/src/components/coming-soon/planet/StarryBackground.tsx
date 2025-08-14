"use client";

import React, { useState, useEffect } from "react";
import "./StarryBackground.css";

type StarryBackgroundProps = {
  count?: number;
  className?: string;
  starClassName?: string;
};

const StarryBackground = ({
  count = 25, // dikurangi biar ringan
  className = "",
  starClassName = "",
}: StarryBackgroundProps) => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const generatedStars = Array.from({ length: count }).map((_, i) => {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = `${Math.random() * 3}s`;
      const duration = `${3 + Math.random() * 3}s`;

      return (
        <div
          key={i}
          className={`starry ${starClassName}`}
          style={{
            left,
            top,
            animationDelay: delay,
            animationDuration: duration,
          }}
        />
      );
    });

    setStars(generatedStars);
  }, [count, starClassName, isMounted]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-[-10] ${className}`}
    >
      {isMounted ? stars : null}
    </div>
  );
};

export default StarryBackground;
