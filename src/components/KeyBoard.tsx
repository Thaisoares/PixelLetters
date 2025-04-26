"use client";

import { useGame } from "@/context/GameContext";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import { KeyboardLetter } from "./KeyboardLetter";

export const Keyboard = () => {
  const { handleKeyPress, handleSubmit, handleBackspacePress } = useGame();
  return (
    <div className="mt-8 flex flex-col gap-2">
      <div className="flex justify-center gap-1">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <KeyboardLetter
            key={key}
            letter={key}
            onClick={() => handleKeyPress(key)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <KeyboardLetter
            key={key}
            letter={key}
            onClick={() => handleKeyPress(key)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-1">
        <button
          className="w-[80px] h-[50px] bg-keyboard-background rounded-md font-bold text-sm text-keyboard-text hover:bg-keyboard-hover transition-colors"
          onClick={handleSubmit}
        >
          ENTER
        </button>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <KeyboardLetter
            key={key}
            letter={key}
            onClick={() => handleKeyPress(key)}
          />
        ))}
        <button
          className="w-[50px] h-[50px] bg-keyboard-background rounded-md font-bold text-xl text-keyboard-text hover:bg-keyboard-hover transition-colors"
          onClick={handleBackspacePress}
        >
          <BackspaceIcon className="p-3 text-keyboard-text" />
        </button>
      </div>
    </div>
  );
};
