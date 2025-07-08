'use client'

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import HeroSection from "@/components/coming-soon/HeroSection";
import Countdown from "@/components/coming-soon/Countdown";
import CollaboratorPage from "@/components/coming-soon/CollaboratorAndFooter";
import Navbar from "@/components/coming-soon/Navbar";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
  const { ref: countdownRef, inView: countdownInView } = useInView({ threshold: 0.5 });
  const { ref: collabRef, inView: collabInView } = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (collabInView) {
      setActiveSection("collab");
      window.history.replaceState(null, '', '#collab');
    } else if (countdownInView) {
      setActiveSection("countdown");
      window.history.replaceState(null, '', '#countdown');
    } else if (heroInView) {
      setActiveSection("home");
      window.history.replaceState(null, '', '#home');
    }
  }, [heroInView, countdownInView, collabInView]);

  return (
    <main className="h-full w-full">
      <Navbar activeSection={activeSection} />
      <section id="home" ref={heroRef}>
        <HeroSection />
      </section>
      <section id="countdown" ref={countdownRef}>
        <Countdown />
      </section>
      <section id="collab" ref={collabRef}>
        <CollaboratorPage />
      </section>
    </main>
  );
}
