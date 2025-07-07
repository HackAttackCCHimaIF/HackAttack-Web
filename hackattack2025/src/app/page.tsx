import Countdown from "@/components/coming-soon/Countdown";
import HeroSection from "@/components/coming-soon/HeroSection";

export default function Home() {
  return (
    <main className=" h-full w-full">
      <HeroSection/>
      <Countdown/>
    </main>
  );
}
