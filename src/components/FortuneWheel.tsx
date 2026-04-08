import { useState, useCallback, useRef } from "react";
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
// Offset to calibrate slice 0 position on the wheel image (degrees clockwise from top)
const WHEEL_OFFSET = 0;

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

    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const fullRotations = 5 + Math.floor(Math.random() * 4);
    const prizeAngle = prizeIndex * SLICE_ANGLE + SLICE_ANGLE / 2;
    const finalRotation = rotation + fullRotations * 360 + (360 - prizeAngle - WHEEL_OFFSET);

    setRotation(finalRotation);

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
    <div
      className="relative mx-auto"
      style={{ width: "80vw", maxWidth: "400px", aspectRatio: "1/1" }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-[-20px] rounded-full bg-casino-glow/20 blur-2xl transition-opacity duration-500 ${
          spinning ? "opacity-100 animate-glow-spin" : "opacity-60 animate-glow-pulse"
        }`}
      />

      {/* Subwheel border (fixed) - BEHIND spinning wheel */}
      <img
        src={subwheel}
        alt=""
        className="absolute inset-0 w-full h-full z-[5] pointer-events-none object-contain"
        draggable={false}
      />

      {/* Spinning wheel with prizes - ON TOP of subwheel */}
      <img
        ref={wheelRef}
        src={wheelBr}
        alt="Roleta de prêmios"
        className={`absolute inset-[2%] w-[96%] h-[96%] z-[10] object-contain ${bouncing ? "animate-bounce-stop" : ""}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
            : "none",
        }}
        draggable={false}
      />

      {/* Center button with refresh icon (fixed) - z-20 */}
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

      {/* Pointer (fixed, at top) - z-30 */}
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
