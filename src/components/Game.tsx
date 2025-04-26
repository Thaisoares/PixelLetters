"use client";

import { useGame } from "@/context/GameContext";
import { GameGrid } from "./GameGrid";
import { Header } from "./Header";
import { Keyboard } from "./KeyBoard";
import { VictoryModal } from "./VictoryModal";

export const Game = () => {
  const {
    gameState,
    currentPosition,
    error,
    showVictory,
    handleKeyPress,
    handleSubmit,
    handleBackspacePress,
    setCurrentPosition,
    handlePlayAgain,
  } = useGame();
  console.log(gameState.targetWord);
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-lg mx-auto">
          <GameGrid />

          {error && (
            <div className="mt-4 p-4 bg-error-background text-error-text rounded text-center">
              {error}
            </div>
          )}

          <Keyboard />
        </div>
      </main>

      {showVictory && <VictoryModal />}
    </div>
  );
};
