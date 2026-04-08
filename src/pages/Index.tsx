import { useState } from "react";
import FortuneWheel from "@/components/FortuneWheel";
import PrizeModal from "@/components/PrizeModal";
import bgDesktop from "@/assets/bg.jpg";
import bgMob from "@/assets/bg-mob.jpg";
import tiger1 from "@/assets/tiger1.png";
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

        {/* Wheel area with tigers */}
        <div className="relative mb-2">
          {/* Tiger 2 - behind/hugging the wheel (z-[2]) */}
          <img
            src={tiger2}
            alt="Fortune Tiger"
            className="absolute -left-[25%] bottom-[5%] w-[55%] z-[2] pointer-events-none drop-shadow-xl animate-tiger-hug"
            style={{ transform: "scaleX(-1)" }}
            loading="lazy"
            width={512}
            height={512}
          />

          {/* Wheel (z-[3] internally managed) */}
          <div className="relative z-[3]">
            <FortuneWheel onResult={(p) => setPrize(p)} />
          </div>

          {/* Tiger 1 - in front of wheel (z-[35]) */}
          <img
            src={tiger1}
            alt="Fortune Tiger"
            className="absolute -right-[15%] -bottom-[10%] w-[50%] z-[35] pointer-events-none drop-shadow-2xl animate-tiger-bounce"
            loading="lazy"
            width={512}
            height={512}
          />
        </div>

        {/* Coins decorative - various positions with animations */}
        <img
          src={coins}
          alt=""
          className="absolute left-[2%] top-[15%] w-28 sm:w-36 opacity-90 animate-coin-float-1 pointer-events-none z-[40]"
          loading="lazy"
          width={512}
          height={512}
        />
        <img
          src={coins}
          alt=""
          className="absolute right-[2%] top-[10%] w-24 sm:w-32 opacity-80 animate-coin-float-2 pointer-events-none z-[40] -scale-x-100"
          loading="lazy"
          width={512}
          height={512}
        />
        <img
          src={coins}
          alt=""
          className="absolute left-[5%] bottom-[5%] w-20 sm:w-28 opacity-75 animate-coin-float-3 pointer-events-none z-[40]"
          loading="lazy"
          width={512}
          height={512}
        />
        <img
          src={coins}
          alt=""
          className="absolute right-[5%] bottom-[10%] w-22 sm:w-30 opacity-85 animate-coin-float-4 pointer-events-none z-[4]"
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
