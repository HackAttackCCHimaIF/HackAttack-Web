"use client";

import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type FloatingOrbProps = {
  type: 'glow' | 'planet1' | 'planet2' | 'planet3';
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

  const PlanetGlow = ({ color }: { color: string }) => (
    <>
      <div
        style={{ backgroundColor: `${color}30` }}
        className="absolute inset-0 rounded-full blur-[160px] scale-[1.4] pointer-events-none"
      />
      <div
        style={{ backgroundColor: `${color}70` }}
        className="absolute inset-0 rounded-full blur-[100px] scale-[1.25] pointer-events-none"
      />
      <div
        style={{ backgroundColor: `${color}80` }}
        className="absolute inset-0 rounded-full blur-[60px] scale-[1.1] pointer-events-none"
      />
    </>
  );


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
          <div
            style={{ backgroundColor: `${color}20` }}
            className="absolute inset-0 rounded-full blur-[160px] scale-[1.8]"
          />
          <div
            style={{ backgroundColor: `${color}40` }}
            className="absolute inset-0 rounded-full blur-[100px] scale-[1.4]"
          />
          <div
            style={{ backgroundColor: `${color}80` }}
            className="absolute inset-0 rounded-full blur-[60px] scale-[1.1]"
          />
          <div
            style={{ backgroundColor: color }}
            className="absolute inset-0 rounded-full scale-75"
          />
        </>
      )}

      {/* Planet */}
      {type === 'planet1' && (
        <>
          <PlanetGlow color={color} />

          <div
            style={{
              backgroundColor: color,
              boxShadow: `0 0 30px ${color}AA, 0 0 80px ${color}66`,
            }}
            className="relative w-full h-full rounded-full overflow-hidden z-10 animate-pulse-slow"
          >
            <div className="absolute w-1/4 h-1/4 bg-black/20 rounded-full top-[20%] left-[25%]" />
            <div className="absolute w-1/6 h-1/6 bg-black/25 rounded-full top-[50%] left-[60%]" />
            <div className="absolute w-1/5 h-1/5 bg-black/15 rounded-full top-[65%] left-[15%]" />
            <div className="absolute w-1/6 h-1/6 bg-black/10 rounded-full top-[40%] left-[40%]" />
          </div>
        </>
      )}


        {type === 'planet2' && (
          <>
            <PlanetGlow color={color} />

            <div
              style={{
                backgroundColor: color,
                boxShadow: `0 0 30px ${color}AA, 0 0 80px ${color}66`,
              }}
              className="relative w-full h-full rounded-full overflow-hidden z-10 animate-pulse-slow"
            >
              <div className="absolute w-1/6 h-1/6 bg-black/20 rounded-full top-[15%] left-[20%]" />
              <div className="absolute w-1/8 h-1/8 bg-black/15 rounded-full top-[40%] left-[55%]" />
              <div className="absolute w-1/10 h-1/10 bg-black/25 rounded-full top-[60%] left-[30%]" />
              <div className="absolute w-1/12 h-1/12 bg-black/30 rounded-full top-[70%] left-[70%]" />
              <div className="absolute w-1/12 h-1/12 bg-black/25 rounded-full top-[50%] left-[10%]" />
            </div>
          </>
        )}


        {type === 'planet3' && (
          <>
            <PlanetGlow color={color} />

            <div
              style={{
                backgroundColor: color,
                boxShadow: `0 0 30px ${color}AA, 0 0 80px ${color}66`,
              }}
              className="relative w-full h-full rounded-full overflow-hidden z-10 animate-pulse-slow"
            >
              <div className="absolute w-1/3 h-1/3 bg-black/25 rounded-full top-[30%] left-[30%]" />
              <div className="absolute w-1/8 h-1/8 bg-black/20 rounded-full top-[65%] left-[20%]" />
              <div className="absolute w-1/10 h-1/10 bg-black/15 rounded-full top-[50%] left-[70%]" />
            </div>
          </>
        )}


    </motion.div>
  );
};
