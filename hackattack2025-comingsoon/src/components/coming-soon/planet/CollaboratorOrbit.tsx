"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StarryBackground from "./StarryBackground";

const planets = [
  {
    id: "hima",
    name: "Himpunan Mahasiswa S1 Informatika",
    dept: "Universitas Telkom",
    description:
      "Himpunan Mahasiswa Informatika Universitas Telkom adalah organisasi keprofesian di bidang informatika, berlandaskan Tridharma Perguruan Tinggi dan Pancasila.",
    color: "bg-blue-500",
    glow: "bg-blue-400",
    icon: "/icons/hima.svg",
    delay: 0,
    size: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14",
    glowSize: "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
    initialAngle: 0,
  },
  {
    id: "cci",
    name: "Central Computer Improvement",
    dept: "Universitas Telkom",
    description:
      "Central Computer Improvement (CCI) adalah UKM dari Fakultas Ekonomi dan Bisnis Telkom University yang fokus pada teknologi informasi sejak 2006.",
    color: "bg-green-500",
    glow: "bg-green-400",
    icon: "/icons/cci.svg",
    delay: 0,
    size: "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12",
    glowSize: "w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18",
    initialAngle: 135,
  },
  {
    id: "telkom",
    name: "Telkom",
    dept: "University",
    description:
      "Telkom University adalah perguruan tinggi swasta di Bandung yang fokus pada teknologi, bisnis, dan seni. Berdiri tahun 2013 hasil penggabungan 4 institusi Yayasan Pendidikan Telkom.",
    color: "bg-red-500",
    glow: "bg-red-400",
    icon: "/icons/telkom.svg",
    delay: 0,
    size: "w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-16 lg:h-16",
    glowSize: "w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22",
    initialAngle: 225,
  },
];

const orbitClass = (index: number, breakpoint: string) => {
  const base = 20 + index * 5;
  const clampSize =
    breakpoint === "sm"
      ? `clamp(180px, ${base + 5}vw, 380px)`
      : breakpoint === "md"
        ? `clamp(200px, ${base + 10}vw, 460px)`
        : breakpoint === "lg"
          ? `clamp(240px, ${base + 12}vw, 540px)`
          : `clamp(320px, ${base + 14}vw, 640px)`;
  return `w-[${clampSize}] h-[${clampSize}]`;
};

function useBreakpoint() {
  const [bp, setBp] = useState("base");
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const handle = () => {
      const width = window.innerWidth;
      const next =
        width < 640
          ? "sm"
          : width < 768
            ? "md"
            : width < 1024
              ? "lg"
              : width < 1280
                ? "xl"
                : "2xl";
      setBp(next);
    };
    const onResize = () => {
      if (t) clearTimeout(t);
      t = setTimeout(handle, 150);
    };
    handle(); // initial
    window.addEventListener("resize", onResize);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return bp;
}

const getOrbitSize = (index: number) => {
  const vwPart = 20 + index * 10;
  const vhPart = 20 + index * 8;
  return `calc(${vwPart}vw + ${vhPart}vh)`;
};

// Compute popover placement (top/bottom) ONCE when opening, by sampling DOM geometry
function computePopoverPlacement(planetEl: HTMLElement, orbitEl: HTMLElement) {
  const planetRect = planetEl.getBoundingClientRect();
  const orbitRect = orbitEl.getBoundingClientRect();
  const orbitCenterY = orbitRect.top + orbitRect.height / 2;
  const planetCenterY = planetRect.top + planetRect.height / 2;
  // If planet is in lower half of orbit, popover goes "top"; else "bottom"
  return planetCenterY > orbitCenterY ? "top" : "bottom";
}

export default function OrbitAccurate() {
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);
  const [clickCooldown, setClickCooldown] = useState<Record<string, boolean>>(
    {}
  );
  const [popoverDir, setPopoverDir] = useState<
    Record<string, "top" | "bottom">
  >({});

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const planetAnchorRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const orbitRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const breakpoint = useBreakpoint();

  const getPopoverClasses = useMemo(
    () => (dir: "top" | "bottom") =>
      dir === "top"
        ? {
            container: "bottom-full mb-10",
            arrow: "-bottom-2 left-1/2 -translate-x-1/2 rotate-45",
          }
        : {
            container: "top-full mt-4",
            arrow: "-top-2 left-1/2 -translate-x-1/2 rotate-45",
          },
    []
  );

  const handlePlanetClick = (planetId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (clickCooldown[planetId]) return;

    setClickCooldown((prev) => ({ ...prev, [planetId]: true }));
    setTimeout(() => {
      setClickCooldown((prev) => ({ ...prev, [planetId]: false }));
    }, 300);

    // If we are opening this popover, compute placement once
    if (expandedPlanet !== planetId) {
      const anchor = planetAnchorRefs.current[planetId];
      const orbit = orbitRefs.current[planetId];
      if (anchor && orbit) {
        const dir = computePopoverPlacement(anchor, orbit);
        setPopoverDir((prev) => ({ ...prev, [planetId]: dir }));
      }
      setExpandedPlanet(planetId);
    } else {
      // closing
      setExpandedPlanet(null);
    }
  };

  return (
    <div className="relative w-full min-h-[125vh] overflow-hidden bg-transparent pointer-events-none">
      {/* Starfield background */}
      <StarryBackground />

      {/* Sun in the center */}
      <div className="absolute top-1/2 left-1/2 xl:left-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-64 xl:h-64 rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-[#FAB94F] opacity-10 blur-[60px] pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-[#FAB94F] opacity-30 blur-[40px] pointer-events-none" />

          {/* Main sun body */}
          <div className="relative w-full h-full rounded-full bg-gradient-radial from-yellow-100 via-[#FFD94F] to-orange-600 shadow-inner shadow-yellow-400/50">
            {/* Inner pulsating glow layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="w-28 h-28 bg-gradient-to-r from-yellow-200 via-[#FAB94F] to-[#FAB94F] rounded-full shadow-[0_0_30px_20px_rgba(255,200,0,0.4)]" />
                <div className="absolute w-32 h-32 bg-yellow-100 rounded-full blur-[60px] opacity-60 animate-pulse" />
                <div className="absolute w-24 h-24 bg-orange-300 rounded-full blur-3xl opacity-40 animate-pulse delay-200" />
              </div>
            </div>
            {/* Highlight glossy */}
            <div className="absolute top-3 left-3 w-14 h-14 bg-white/40 rounded-full blur-md opacity-80" />
            {/* Rim shadow */}
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-black/20 rounded-full blur-[40px]" />
          </div>
        </motion.div>
      </div>

      {/* Orbits and planets */}
      {planets.map((planet, index) => {
        const dir = popoverDir[planet.id] ?? "bottom";
        const pop = getPopoverClasses(dir);

        return (
          <motion.div
            key={planet.id}
            ref={(el) => {
              orbitRefs.current[planet.id] = el;
            }}
            className={`absolute top-1/2 left-1/2 xl:left-1/3 transform -translate-x-1/2 -translate-y-1/2 ${orbitClass(
              index,
              breakpoint
            )}`}
            style={{
              width: getOrbitSize(index),
              height: getOrbitSize(index),
              zIndex: expandedPlanet === planet.id ? 50 : index,
            }}
            initial={{ rotate: planet.initialAngle }}
            animate={{ rotate: 360 + planet.initialAngle }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Orbit Path */}
            <div className="absolute inset-0 border border-dashed border-white/20 rounded-full pointer-events-none" />

            {/* Planet on orbit */}
            <motion.div
              className="absolute top-0 left-[60%]"
              style={{ transform: "translateX(-50%)" }}
              initial={{ rotate: -planet.initialAngle }}
              animate={{ rotate: -360 - planet.initialAngle }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                ref={(el) => {
                  planetAnchorRefs.current[planet.id] = el;
                }}
                className="relative flex flex-col items-center"
              >
                {/* Glow layer */}
                <motion.div
                  className={`absolute ${planet.glowSize} rounded-full ${planet.glow} opacity-30 blur-lg`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                {/* Planet core with dynamic shading  */}
                <div className="relative flex items-center justify-center">
                  {/* Outer glow ring / orbit ring */}
                  <div className="absolute w-[160%] h-[160%] rounded-full border-2 border-white/30 blur-sm opacity-40 pointer-events-none" />
                  <div
                    className={`relative ${planet.size} rounded-full overflow-hidden border border-white shadow-lg`}
                  >
                    <div
                      className={`w-full h-full rounded-full ${planet.color}`}
                    />

                    {/* Shading layer */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-l from-black/50 to-transparent"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Inner highlight ring */}
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                  </div>
                  <div className="border p-7 md:p-10 lg:p-12 border-dashed absolute rounded-full"></div>
                </div>

                {/* Label Button */}
                <Button
                  ref={(el) => {
                    buttonRefs.current[planet.id] = el;
                  }}
                  size={"lg"}
                  variant="secondary"
                  className="group flex items-center mt-10 px-4 py-8 lg:py-10 w-fit rounded-xl backdrop-blur-md border border-white/30 shadow-md space-x-4 cursor-pointer bg-white/10 hover:bg-white/20 transition-all duration-200 active:scale-95 pointer-events-auto"
                  onClick={(e) => handlePlanetClick(planet.id, e)}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 rounded-full border border-white/30 overflow-hidden">
                    <Image
                      src={planet.icon}
                      alt={planet.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col text-left text-white">
                    <span className="text-sm sm:text-base font-medium leading-tight">
                      {planet.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit mt-1 px-2 py-0.5 text-xs border-gray-400 text-gray-300 bg-transparent"
                    >
                      {planet.dept}
                    </Badge>
                  </div>
                </Button>

                {/* Floating Detail Card (popover) */}
                {expandedPlanet === planet.id && (
                  <Card
                    className={`absolute z-[9999] ${pop.container} w-[18rem] sm:w-[20rem] md:w-[22rem] bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ease-in-out`}
                  >
                    <CardHeader className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                          <Image
                            src={planet.icon}
                            alt={planet.name}
                            width={28}
                            height={28}
                            className="object-contain"
                          />
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-sm font-semibold">
                            {planet.name}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="text-gray-300 text-[11px] sm:text-xs border-gray-400 bg-transparent"
                          >
                            {planet.dept}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="px-4 pb-4 pt-0 space-y-4">
                      <p className="text-gray-100 text-sm leading-relaxed tracking-wide">
                        {planet.description}
                      </p>
                    </CardContent>

                    {/* Dynamic Arrow */}
                    <div
                      className={`absolute ${pop.arrow} w-4 h-4 bg-white/10 border border-white/20 z-10`}
                    />
                  </Card>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
