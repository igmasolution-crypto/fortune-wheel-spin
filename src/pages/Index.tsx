import { useState } from "react";
import FortuneWheel from "@/components/FortuneWheel";
import PrizeModal from "@/components/PrizeModal";
import bgDesktop from "@/assets/bg.jpg";
import bgMob from "@/assets/bg-mob.jpg";
import tiger1 from "@/assets/tiger1.png";
import tiger2 from "@/assets/tiger2.png";
import coins from "@/assets/coins.png";
import banner from "@/assets/banner.png";
import disclaimer from "@/assets/disclaimer.png";

const Index = () => {
  const [prize, setPrize] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
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
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto px-4 pt-4 pb-4 -mt-16 sm:-mt-20">
        {/* Banner */}
        <div className="w-full text-center -mb-10 relative z-[50]">
          <img
            src={banner}
            alt="Inscreva-se, Jogue e Ganhe!"
            className="w-full max-w-[700px] mx-auto drop-shadow-lg object-contain"
          />
        </div>

        {/* Wheel area with tigers */}
        <div className="relative mb-2">
          {/* Tiger 2 - behind/hugging the wheel (z-[2]) */}
          <img
            src={tiger2}
            alt="Fortune Tiger"
            className="absolute -left-[20%] sm:-left-[25%] -bottom-[8%] sm:-bottom-[10%] w-[45%] sm:w-[55%] z-[35] pointer-events-none drop-shadow-xl animate-tiger-hug"
            style={{ transform: "scaleX(-1)" }}
            loading="lazy"
          />

          {/* Wheel (z-[3] internally managed) */}
          <div className="relative z-[3]">
            <FortuneWheel onResult={(p) => setPrize(p)} />
          </div>

          {/* Tiger 1 - in front of wheel (z-[35]) */}
          <img
            src={tiger1}
            alt="Fortune Tiger"
            className="absolute -right-[10%] sm:-right-[15%] -bottom-[8%] sm:-bottom-[10%] w-[40%] sm:w-[50%] z-[35] pointer-events-none drop-shadow-2xl animate-tiger-bounce"
            loading="lazy"
          />
        </div>

        {/* Coins decorative */}
        <img
          src={coins}
          alt=""
          className="absolute left-[2%] top-[15%] w-16 sm:w-36 opacity-90 animate-coin-float-1 pointer-events-none z-[40]"
          loading="lazy"
        />
        <img
          src={coins}
          alt=""
          className="absolute right-[2%] top-[10%] w-14 sm:w-32 opacity-80 animate-coin-float-2 pointer-events-none z-[40] -scale-x-100"
          loading="lazy"
        />
        {/* Hide extra coins on mobile */}
        <img
          src={coins}
          alt=""
          className="hidden sm:block absolute left-[5%] bottom-[5%] w-28 opacity-75 animate-coin-float-3 pointer-events-none z-[40]"
          loading="lazy"
        />
        <img
          src={coins}
          alt=""
          className="hidden sm:block absolute right-[5%] bottom-[10%] w-24 opacity-85 animate-coin-float-4 pointer-events-none z-[4]"
          loading="lazy"
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
