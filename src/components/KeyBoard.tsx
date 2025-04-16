import { KeyboardLetter } from "./KeyboardLetter";
import { BackspaceIcon } from "@heroicons/react/24/solid";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

export const Keyboard = ({
  onKeyPress,
  onEnter,
  onBackspace,
}: KeyboardProps) => {
  return (
    <div className="mt-8 flex flex-col gap-2">
      <div className="flex justify-center gap-1">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <KeyboardLetter
            key={key}
            letter={key}
            onClick={() => onKeyPress(key)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <KeyboardLetter
            key={key}
            letter={key}
            onClick={() => onKeyPress(key)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-1">
        <button
          className="w-[80px] h-[50px] bg-keyboard-background rounded-md font-bold text-sm text-keyboard-text hover:bg-keyboard-hover transition-colors"
          onClick={onEnter}
        >
          ENTER
        </button>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <KeyboardLetter
            key={key}
            letter={key}
            onClick={() => onKeyPress(key)}
          />
        ))}
        <button
          className="w-[50px] h-[50px] bg-keyboard-background rounded-md font-bold text-xl text-keyboard-text hover:bg-keyboard-hover transition-colors"
          onClick={onBackspace}
        >
          <BackspaceIcon className="p-3 text-keyboard-text" />
        </button>
      </div>
    </div>
  );
};
