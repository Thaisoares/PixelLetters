"use client";

import { useGame } from "@/context/GameContext";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Make sure to install @heroicons/react

export const VictoryModal = () => {
  const {
    gameState: { attempts, targetWord },
    handlePlayAgain,
    setShowVictory,
  } = useGame();

  const handleClose = () => {
    setShowVictory(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 md:p-8 text-center relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6 text-button-background" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Parabéns!</h2>

        <p className="text-lg mb-6">
          Você acertou a palavra <span className="font-bold">{targetWord}</span>{" "}
          em <span className="font-bold">{attempts.length}</span> tentativas!
        </p>

        <button
          onClick={handlePlayAgain}
          className="px-6 py-3 bg-button-background hover:bg-button-hover text-white font-bold rounded-lg w-full transition-colors"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};
