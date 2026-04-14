import { useState, useCallback } from "react";
import wheelBr from "@/assets/wheel-br.png";
import subwheel from "@/assets/subwheel.png";
import wheelCenter from "@/assets/wheel-center.png";
import pointer from "@/assets/pointer.png";
import iconRefresh from "@/assets/icon-refresh.svg";

const PRIZES = [
  "10x",
  "50x",
  "2x",
  "100x",
  "100x",
  "3x",
  "4x",
  "8x",
  "25x",
  "25x",
];

const SLICE_ANGLE = 360 / PRIZES.length;
const WHEEL_OFFSET = SLICE_ANGLE / 2;
const SPIN_DURATION_MS = 4500;

const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;

const getPrizeIndexFromRotation = (angle: number) => {
  const normalizedRotation = normalizeAngle(angle);
  const pointerAngle = normalizeAngle(360 - normalizedRotation - WHEEL_OFFSET);

  return Math.floor(pointerAngle / SLICE_ANGLE) % PRIZES.length;
};

interface FortuneWheelProps {
  onResult: (prize: string) => void;
}

const FortuneWheel = ({ onResult }: FortuneWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const fullRotations = 5 + Math.floor(Math.random() * 4);
    const prizeAngle = prizeIndex * SLICE_ANGLE + SLICE_ANGLE / 2;
    const targetRotation = normalizeAngle(360 - prizeAngle - WHEEL_OFFSET);
    const currentRotation = normalizeAngle(rotation);
    const additionalRotation = normalizeAngle(targetRotation - currentRotation);
    const finalRotation = rotation + fullRotations * 360 + additionalRotation;
    const finalPrize = PRIZES[getPrizeIndexFromRotation(finalRotation)];

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      onResult(finalPrize);
    }, SPIN_DURATION_MS);
  }, [spinning, rotation, onResult]);

  return (
    <div
      className="relative mx-auto"
      style={{ width: "80vw", maxWidth: "400px", aspectRatio: "1/1" }}
    >
      <div
        className={`absolute inset-[-20px] rounded-full bg-casino-glow/20 blur-2xl transition-opacity duration-500 ${
          spinning ? "opacity-100 animate-glow-spin" : "opacity-60 animate-glow-pulse"
        }`}
      />

      <img
        src={subwheel}
        alt=""
        className="absolute inset-0 w-full h-full z-[5] pointer-events-none object-contain"
        draggable={false}
      />

      <img
        src={wheelBr}
        alt="Roleta de prêmios"
        className="absolute inset-[2%] w-[96%] h-[96%] z-[10] object-contain"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
            : "none",
        }}
        draggable={false}
      />

      <button
        onClick={spin}
        disabled={spinning}
        className={`absolute top-1/2 left-1/2 z-20 w-[22%] h-[22%] rounded-full cursor-pointer disabled:cursor-not-allowed focus:outline-none ${
          !spinning ? "animate-pulse-center" : ""
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
        aria-label="Girar roleta"
      >
        <div className="relative w-full h-full">
          <img
            src={wheelCenter}
            alt="Girar"
            className="w-full h-full object-contain"
            draggable={false}
          />
          <img
            src={iconRefresh}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] pointer-events-none"
            draggable={false}
          />
        </div>
      </button>

      <img
        src={pointer}
        alt=""
        className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[12%] z-30 pointer-events-none drop-shadow-lg object-contain"
        draggable={false}
      />
    </div>
  );
};

export default FortuneWheel;
