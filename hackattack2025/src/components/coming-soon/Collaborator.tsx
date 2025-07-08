import Image from "next/image";
import OrbitalAnimation from "./planet/CollaboratorOrbit";

export default function CollaboratorPage() {
  return (
    <div className="relative w-full overflow-hidden ">

      {/* Background Layer (pindahkan ke luar, tidak terkurung konten) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.svg"
          alt="Background"
          fill
          className="object-cover w-full h-full pointer-events-none select-none opacity-60"
          priority
        />
      </div>

      {/* Konten utama */}
      <div className="relative w-full">
        <OrbitalAnimation />
      </div>
    </div>
  );
}
