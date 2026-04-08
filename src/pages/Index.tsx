import { useState } from "react";
import FortuneWheel from "@/components/FortuneWheel";
import PrizeModal from "@/components/PrizeModal";
import bgDesktop from "@/assets/bg.jpg";
import bgMob from "@/assets/bg-mob.jpg";
import tiger2 from "@/assets/tiger2.png";
import coins from "@/assets/coins.png";

const Index = () => {
  const [prize, setPrize] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center">
      {/* Background */}
      <img
        src={bgDesktop}
        alt=""
        className="hidden sm:block absolute inset-0 w-full h-full object-cover z-0"
      />
      <img
        src={bgMob}
        alt=""
        className="sm:hidden absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-casino-dark/40 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto px-4 pt-4 pb-0">

        {/* Banner */}
        <div className="w-full text-center mb-6">
          <h1 className="font-display text-3xl sm:text-5xl drop-shadow-lg tracking-widest leading-tight">
            <span className="text-white">INSCREVA-SE, JOGUE,</span>{" "}
            <span className="text-white">GANHE!</span>
          </h1>
        </div>

        {/* Wheel */}
        <div className="relative mb-2">
          <FortuneWheel onResult={(p) => setPrize(p)} />
        </div>

        {/* Coins decorative */}
        <img
          src={coins}
          alt=""
          className="absolute left-[-30px] bottom-[30%] w-24 sm:w-32 opacity-80 animate-float-coin pointer-events-none z-[5]"
          loading="lazy"
          width={512}
          height={512}
        />
        <img
          src={coins}
          alt=""
          className="absolute right-[-20px] bottom-[35%] w-20 sm:w-28 opacity-70 animate-float-coin-2 pointer-events-none z-[5] -scale-x-100"
          loading="lazy"
          width={512}
          height={512}
        />

        {/* Tiger */}
        <img
          src={tiger2}
          alt="Fortune Tiger"
          className="w-40 sm:w-56 mt-[-20px] drop-shadow-2xl z-[6] pointer-events-none"
          loading="lazy"
          width={512}
          height={512}
        />
      </div>

      {/* Prize Modal */}
      {prize && (
        <PrizeModal prize={prize} onClose={() => setPrize(null)} />
      )}
    </div>
  );
};

export default Index;
