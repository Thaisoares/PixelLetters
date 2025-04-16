interface VictoryModalProps {
  attempts: number;
  targetWord: string;
  onPlayAgain: () => void;
}

export const VictoryModal = ({
  attempts,
  targetWord,
  onPlayAgain,
}: VictoryModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-3xl font-bold text-center mb-4">Parabéns!</h2>
        <p className="text-center text-lg mb-4">
          Você acertou a palavra <span className="font-bold">{targetWord}</span>{" "}
          em {attempts} tentativa{attempts > 1 ? "s" : ""}!
        </p>
        <div className="flex justify-center">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-button-background text-white rounded-lg font-bold hover:bg-button-hover transition-colors"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};
