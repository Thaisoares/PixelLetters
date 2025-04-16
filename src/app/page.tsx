import { RulesModal } from "@/components/RulesModal";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-darkBackground flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <Image
            src="/logo2.png"
            alt="Pixletters Logo"
            width={450}
            height={150}
            priority
            className="mb-36"
          />

          <div className="flex flex-col gap-6 items-center">
            <Link href="/game">
              <button className="w-48 px-6 py-3 bg-button-background hover:bg-button-hover text-button-text font-bold rounded-lg transition-colors shadow-lg">
                Jogar
              </button>
            </Link>

            <RulesModal />

            <div className="mt-6 text-gray-400 text-sm">
              <p>Inspirado no jogo Pixletters</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
