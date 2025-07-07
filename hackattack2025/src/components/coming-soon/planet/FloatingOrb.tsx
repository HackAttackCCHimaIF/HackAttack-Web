"use client";

import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type FloatingOrbProps = {
  type: 'glow' | 'planet';
  color: string;
  className?: string;
  animationProps?: MotionProps;
};

export const FloatingOrb = ({
  type,
  color,
  className,
  animationProps
}: FloatingOrbProps) => {
  const defaultAnimation: MotionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.05, 1],
      x: [0, 5, -3, 0],
      y: [0, -3, 5, 0],
    },
    transition: {
      duration: 8 + Math.random() * 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  };

  return (
    <motion.div
      {...defaultAnimation}
      {...animationProps}
      className={cn(
        "absolute -z-10 pointer-events-none",
        className
      )}
    >
      {/* Orb Glow */}
      {type === 'glow' && (
        <>
          <div style={{ backgroundColor: `${color}20` }} className="absolute inset-0 rounded-full blur-2xl" />
          <div style={{ backgroundColor: `${color}40` }} className="absolute inset-0 rounded-full blur-xl scale-90" />
          <div style={{ backgroundColor: `${color}80` }} className="absolute inset-0 rounded-full blur-lg scale-75" />
          <div style={{ backgroundColor: color }} className="absolute inset-0 rounded-full scale-50" />
        </>
      )}

      {/* Planet with Glow */}
      {type === 'planet' && (
        <>
          {/* Glow layers (similar to "glow" type) */}
          <div
            className="absolute inset-0 rounded-full blur-[120px] opacity-25"
            style={{ backgroundColor: `${color}40` }}
          />
          <div
            className="absolute inset-0 rounded-full blur-[80px] opacity-40"
            style={{ backgroundColor: `${color}70` }}
          />
          <div
            className="absolute inset-0 rounded-full blur-[40px] opacity-60"
            style={{ backgroundColor: `${color}A0` }}
          />

          {/* Planet Body */}
          <div
            style={{ backgroundColor: color }}
            className="relative w-full h-full rounded-full overflow-hidden z-10"
          >
            {/* Craters */}
            <div className="absolute w-1/4 h-1/4 bg-black/20 rounded-full top-[20%] left-[25%]" />
            <div className="absolute w-1/6 h-1/6 bg-black/20 rounded-full top-[50%] left-[60%]" />
            <div className="absolute w-1/5 h-1/5 bg-black/20 rounded-full top-[65%] left-[15%]" />
          </div>
        </>
      )}
    </motion.div>
  );
};
