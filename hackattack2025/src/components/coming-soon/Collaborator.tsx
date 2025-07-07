import Image from "next/image";
import { CollaboratorOrbit } from "./planet/CollaboratorOrbit";

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
      <div className="relative w-full py-20 sm:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Our Collaborator
          </h2>
          <p className="text-neutral-400 mt-2">
            Proudly working with amazing communities.
          </p>
        </div>

        <CollaboratorOrbit />
      </div>
    </div>
  );
}
