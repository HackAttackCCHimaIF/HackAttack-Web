import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

export default function CountdownPage() {
  return (
    <div className="w-screen min-h-screen relative overflow-hidden p-6 sm:p-12 flex items-center">
                    <Image
                      src={"/landing-page/pura.svg"}
                      alt="Awan"
                      width={100}
                      height={100}
                      className="w-1/2 lg:w-1/4 object-contain left-0 bottom-0 h-1/2 absolute opacity-60"
                    />
                    <Image
                      src={"/landing-page/penari1.svg"}
                      alt="Awan"
                      width={100}
                      height={100}
                      className="w-1/3 lg:w-1/2 object-contain hidden md:flex sm:left-1/3 lg:left-0 bottom-10 h-1/3 absolute"
                    />
                    <Image
                      src={"/landing-page/penari2.svg"}
                      alt="Awan"
                      width={100}
                      height={100}
                      className="w-1/3 lg:w-1/2 object-contain hidden lg:flex sm:right-1/3 lg:right-10 bottom-0 h-1/3 absolute"
                    />
                    <Image
                      src={"/landing-page/gatau.svg"}
                      alt="Awan"
                      width={100}
                      height={100}
                      className="w-full md:w-[70%] object-contain left-1/2 lg:right-0 bottom-0 h-1/2 absolute opacity-60"
                    />
      <div className="absolute -bottom-1 left-0 lg:left-1/2 w-full h-[240px] md:h-[300px] lg:h-fit">
                    <Image
                      src={"/landing-page/awanniga3.svg"}
                      alt="Awan"
                      width={100}
                      height={100}
                      className="w-full object-cover h-full"
                    />
              </div>
              <div className="absolute -bottom-1 right-1/2 w-full lg:flex hidden">
                    <Image
                      src={"/landing-page/awanniga3.svg"}
                      alt="Awan"
                      width={100}
                      height={100}
                      className="w-full object-cover rotate-y-180"
                    />
              </div>

      <CountdownTimer />
    </div>
  );
}
