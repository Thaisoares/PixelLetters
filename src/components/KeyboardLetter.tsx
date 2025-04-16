import { letterToPixels } from "@/lib/letterMapping";

interface KeyboardLetterProps {
  letter: string;
  onClick: () => void;
}

export const KeyboardLetter = ({ letter, onClick }: KeyboardLetterProps) => {
  const pixels = letterToPixels(letter);

  return (
    <button
      onClick={onClick}
      className="w-keyboard-sm h-keyboard-sm md:w-keyboard-md md:h-keyboard-md bg-keyboard-background rounded-md flex items-center justify-center hover:bg-keyboard-hover transition-colors"
    >
      <div className="grid grid-cols-5 gap-[1px] w-[20px] h-[28px] md:w-[25px] md:h-[35px]">
        {Array.from({ length: 35 }).map((_, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          const pixel = pixels.find((p) => p.row === row && p.col === col);

          return (
            <div
              key={index}
              className={`rounded-full ${
                pixel ? "bg-keyboard-text" : "bg-transparent"
              }`}
            />
          );
        })}
      </div>
    </button>
  );
};
