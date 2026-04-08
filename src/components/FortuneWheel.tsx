import { useState, useCallback, useRef } from "react";
import wheelBr from "@/assets/wheel-br.png";
import subwheel from "@/assets/subwheel.png";
import wheelCenter from "@/assets/wheel-center.png";
import pointer from "@/assets/pointer.png";

const PRIZES = [
  "BÔNUS R$ 15.000",
  "50 RODADAS GRÁTIS",
  "Pin-Up Casino",
  "TENTE NOVAMENTE",
  "250 RODADAS GRÁTIS",
  "BÔNUS R$ 30.000",
  "Pin-Up Casino",
  "TENTE NOVAMENTE",
  "BÔNUS R$ 1.500",
  "100 RODADAS GRÁTIS",
];

const SLICE_ANGLE = 360 / PRIZES.length;

interface FortuneWheelProps {
  onResult: (prize: string) => void;
}

const FortuneWheel = ({ onResult }: FortuneWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [bouncing, setBouncing] = useState(false);
  const wheelRef = useRef<HTMLImageElement>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setBouncing(false);

    // Pick a random prize index (weighted toward good prizes)
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);

    // Calculate final rotation
    const fullRotations = 5 + Math.floor(Math.random() * 4); // 5-8 full rotations
    // The pointer is at the top (0deg). We need to align the prize slice center to top.
    const prizeAngle = prizeIndex * SLICE_ANGLE + SLICE_ANGLE / 2;
    const finalRotation = rotation + fullRotations * 360 + (360 - prizeAngle);

    setRotation(finalRotation);

    // Wait for spin to finish
    setTimeout(() => {
      setBouncing(true);
      setTimeout(() => {
        setBouncing(false);
        setSpinning(false);
        onResult(PRIZES[prizeIndex]);
      }, 500);
    }, 4500);
  }, [spinning, rotation, onResult]);

  return (
    <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
      {/* Glow effect */}
      <div
        className={`absolute inset-[-20px] rounded-full bg-casino-glow/20 blur-2xl transition-opacity duration-500 ${
          spinning ? "opacity-100 animate-glow-spin" : "opacity-60 animate-glow-pulse"
        }`}
      />

      {/* Subwheel border (fixed) */}
      <img
        src={subwheel}
        alt=""
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        draggable={false}
      />

      {/* Spinning wheel */}
      <img
        ref={wheelRef}
        src={wheelBr}
        alt="Roleta de prêmios"
        className={`absolute inset-[6%] w-[88%] h-[88%] z-[5] ${
          !spinning ? "animate-idle-wobble" : ""
        } ${bouncing ? "animate-bounce-stop" : ""}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
        }}
        draggable={false}
      />

      {/* Center button (fixed) */}
      <button
        onClick={spin}
        disabled={spinning}
        className={`absolute top-1/2 left-1/2 z-20 w-[22%] h-[22%] rounded-full cursor-pointer disabled:cursor-not-allowed focus:outline-none ${
          !spinning ? "animate-pulse-center" : ""
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
        aria-label="Girar roleta"
      >
        <img
          src={wheelCenter}
          alt="Girar"
          className="w-full h-full"
          draggable={false}
        />
      </button>

      {/* Pointer (fixed, at top) */}
      <img
        src={pointer}
        alt=""
        className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[15%] z-30 pointer-events-none drop-shadow-lg"
        draggable={false}
      />
    </div>
  );
};

export default FortuneWheel;
