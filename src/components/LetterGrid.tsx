"use client";

import { Pixel } from "@/types/game";
import { useGame } from "@/context/GameContext";

interface LetterGridProps {
  pixels: Pixel[];
  isCorrectLetter?: boolean;
  isEmpty?: boolean;
  isCurrentPosition?: boolean;
  position?: number;
}

export const LetterGrid = ({
  pixels,
  isCorrectLetter = false,
  isEmpty = false,
  isCurrentPosition = false,
  position,
}: LetterGridProps) => {
  const { setCurrentPosition } = useGame();

  const handleClick = () => {
    if (position) {
      setCurrentPosition(position);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-letter-sm h-letter-sm
        md:w-letter-md md:h-letter-md 
        p-1.5 
        ${
          isEmpty
            ? isCurrentPosition
              ? "border-cyan-400 border-2 bg-darkBackground/5"
              : "border-button-hover border-[1px]"
            : isCurrentPosition
            ? "bg-darkBackground  md:p-2 border-2 border-darkBackground"
            : "bg-darkBackground md:p-2 border-2 border-darkBackground"
        }
        flex items-center justify-center rounded-[0.2rem]
        ${position ? "cursor-pointer" : ""}
        transition-all duration-150
      `}
    >
      {!isEmpty && (
        <div className="grid grid-cols-5 gap-[1px] md:gap-[2px] w-full h-full">
          {Array.from({ length: 35 }).map((_, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            const pixel = pixels.find((p) => p.row === row && p.col === col);

            return (
              <div
                key={index}
                className={`rounded-full ${
                  !pixel
                    ? "bg-transparent"
                    : isCorrectLetter
                    ? "bg-correct-letter"
                    : pixel.color === "gray"
                    ? "bg-inactive-pixel"
                    : pixel.color === "green"
                    ? "bg-correct-pixel"
                    : pixel.color === "red"
                    ? "bg-wrong-pixel"
                    : "bg-inactive-pixel"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
