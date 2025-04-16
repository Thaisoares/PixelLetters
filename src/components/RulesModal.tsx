"use client";

import { useState } from "react";

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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Como Jogar</h2>

            <div className="space-y-6">
              <p className="text-lg text-center font-medium">
                Adivinhe a palavra em 5 tentativas!
              </p>

              <div>
                <h3 className="font-bold mb-3 text-lg">Dicas:</h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>Cada palavra tem 5 letras</li>
                  <li>As letras são formadas por pixels</li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    <span>Pixels azuis: letra correta na posição correta</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    <span>Pixels verdes: pixel deve estar nesta posição</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                    <span>
                      Pixels vermelhos: pixel não deve estar nesta posição
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 bg-gray-400 rounded-full mr-2"></span>
                    <span>
                      Pixels cinzas: pixels desconhecidos por enquanto
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  A cada palavra inserida, mais linhas de pixels serão reveladas
                  para ajudar você a adivinhar a palavra correta.
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
