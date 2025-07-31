"use client";

import React from "react";
import "./StarryBackground.css";

type StarryBackgroundProps = {
  count?: number;
  className?: string;
  starClassName?: string;
};

const StarryBackground = ({
  count = 25, // dikurangi biar ringan
  className = '',
  starClassName = '',
}: StarryBackgroundProps) => {
  const stars = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
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
  }, [count, starClassName]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[-10] ${className}`}>
      {stars}
    </div>
  );
};

export default StarryBackground;
