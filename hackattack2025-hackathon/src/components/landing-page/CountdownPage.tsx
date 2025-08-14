import CountdownTimer from "./CountdownTimer";

export default function CountdownPage() {
  return (
    <div className="flex justify-center items-center h-full relative overflow-hidden flex-col">
      {/* <div className="absolute bottom-0 left-0 w-full">
        <Image
          src={"/landing-page/Awan1.svg"}
          alt="Awan"
          width={100}
          height={100}
          className="w-full object-cover"
        />
      </div> */}

      <CountdownTimer />
    </div>
  );
}
