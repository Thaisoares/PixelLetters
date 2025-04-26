"use client";

import { useState } from "react";
import Image from "next/image";

export const RulesModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-48 px-6 py-3 bg-button-background hover:bg-button-hover text-white font-bold rounded-lg transition-colors shadow-lg"
      >
        Como Jogar
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Como Jogar</h2>

            <div className="space-y-8">
              <p className="text-lg text-center font-medium">
                Adivinhe a palavra em 5 tentativas!
              </p>

              {/* Example Word Section */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg">
                  Digite uma palavra de 5 letras:
                </h3>
                <div className="flex justify-center">
                  <Image
                    src="/example-word.png"
                    alt="Exemplo de palavra"
                    width={300}
                    height={60}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <p className="text-sm text-center text-gray-600">
                  Exemplo: "TEMPO"
                </p>
              </div>

              {/* Pixel Colors Section */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg">
                  Os resultados serão mostrados com pixels coloridos:
                </h3>

                <div className="flex flex-col items-center space-y-6">
                  <div>
                    <Image
                      src="/first-try.png"
                      alt="Pixels azuis"
                      width={300}
                      height={60}
                      className="rounded-lg shadow-md"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center ">
                      <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                      <span className="font-medium">
                        Pixels azuis: letra correta na posição correta
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                      <span className="font-medium">
                        Pixels verdes: pixel deve estar nesta posição
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                      <span className="font-medium">
                        Pixels vermelhos: pixel não deve estar nesta posição
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="inline-block w-4 h-4 bg-gray-400 rounded-full mr-2"></span>
                      <span className="font-medium">
                        Pixels cinzas: pixels desconhecidos por enquanto
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Example */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg">
                  A cada tentativa, mais informações são reveladas:
                </h3>
                <div className="flex justify-center">
                  <Image
                    src="/progress-example.png"
                    alt="Exemplo de progresso"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <p className="text-sm text-center text-gray-600">
                  Com cada palavra inserida, mais linhas de pixels serão
                  coloridas para ajudar você a adivinhar.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg w-full transition-colors"
            >
              Entendi!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
