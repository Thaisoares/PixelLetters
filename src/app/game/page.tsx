import { Game } from "@/components/Game";
import { GameProvider } from "@/context/GameContext";

export default function GamePage() {
  return (
    <GameProvider lengthWord={5}>
      <Game />
    </GameProvider>
  );
}
