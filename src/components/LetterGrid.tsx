// src/components/LetterGrid.tsx
import { Pixel } from "@/types/game";

interface LetterGridProps {
  pixels: Pixel[];
}

export const LetterGrid = ({ pixels }: LetterGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-[2px] w-[60px] h-[60px] bg-black p-1">
      {Array.from({ length: 25 }).map((_, index) => {
        const pixel = pixels.find((p) => p.row * 5 + p.col === index);
        return (
          <div
            key={index}
            className={`rounded-full ${
              pixel?.color === "gray"
                ? "bg-gray-500"
                : pixel?.color === "green"
                ? "bg-green-500"
                : pixel?.color === "red"
                ? "bg-red-500"
                : pixel?.color === "blue"
                ? "bg-blue-500"
                : "bg-gray-800"
            }`}
          />
        );
      })}
    </div>
  );
};
