"use client";

import Image from "next/image";

const ORBIT_PATH = `path('M 250, 187.5 m -160, 0 a 160,80 0 1,0 320,0 a 160,80 0 1,0 -320,0')`;

type Collaborator = {
  id: string;
  name: string;
  logo: string;
  color: string;      
  position: string;    
};

// Data diperbarui dengan properti 'position'
const collaborators: Collaborator[] = [
  { id: "hima",   name: "HIMA IF",   logo: "/hima-logo.png",   color: "bg-blue-500",  position: "15%" },
  { id: "telkom", name: "Telkom U",  logo: "/telkom-logo.png", color: "bg-red-500",   position: "50%" },
  { id: "cci",    name: "CCI",       logo: "/cci-logo.png",    color: "bg-green-500", position: "80%" },
];


type OrbitingPlanetProps = Collaborator;

const OrbitingPlanet: React.FC<OrbitingPlanetProps> = ({
  logo,
  name,
  color,
  position, 
}) => (
  <div
    className="absolute w-max h-max z-20"
    style={{
      offsetPath: ORBIT_PATH,
      offsetRotate: "0deg",
      offsetDistance: position, 
    }}
  >
    <div className="flex items-center gap-2 -translate-y-1/2">
      {/* Planet Bulat */}
      <div className={`relative w-8 h-8 rounded-full ${color} flex-shrink-0`}>
        <div className={`absolute inset-0.5 rounded-full ${color} brightness-125`} />
      </div>
      {/* Label dengan Logo */}
      <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
        <Image src={logo} alt={name} width={20} height={20} className="object-contain"/>
        <span className="text-white text-xs whitespace-nowrap">{name}</span>
      </div>
    </div>
  </div>
);

export const CollaboratorOrbit: React.FC = () => (
  <div className="relative w-full aspect-[4/3] max-w-4xl mx-auto">
    {/* Matahari di tengah */}
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-2xl" />
        <div className="absolute inset-0 rounded-full bg-yellow-400/50 blur-lg scale-75" />
        <div className="absolute inset-0 rounded-full bg-yellow-400 scale-50" />
      </div>
    </div>

    {/* Jalur orbit (visual) */}
    <svg viewBox="0 0 500 375" className="absolute inset-0 w-full h-full pointer-events-none">
      <path
        d="M 250, 187.5 m -160, 0 a 160,80 0 1,0 320,0 a 160,80 0 1,0 -320,0"
        fill="none"
        stroke="white"
        strokeOpacity="0.15"
        strokeWidth="0.5"
        strokeDasharray="4 4"
      />
    </svg>

    {/* Planet statis (tidak lagi mengorbit) */}
    {collaborators.map((collab) => (
      <OrbitingPlanet key={collab.id} {...collab} />
    ))}
  </div>
);