"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlashcardZone } from "@/lib/types";
import { useGameStore } from "@/store/game-store";
import { RotateCcw, Brain, CheckCircle2 } from "lucide-react";

interface FlashcardProps {
  zone: FlashcardZone;
  onComplete: () => void;
}

export function Flashcard({ zone, onComplete }: FlashcardProps) {
  const { addXP } = useGameStore();

  const cards = zone.cards ?? [];
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = cards[currentCardIdx];

  if (!card) {
    return (
      <div className="p-8 text-center text-red-400">
        No flashcards found for this level.
      </div>
    );
  }

  const xpPerCard = Math.floor((zone.xpReward ?? 100) / cards.length);

  const handleNext = (knewIt: boolean) => {
    if (!isFlipped) return;

    if (knewIt) {
      addXP(xpPerCard);
    }

    if (currentCardIdx < cards.length - 1) {
      setIsFlipped(false);

      setTimeout(() => {
        setCurrentCardIdx((prev) => prev + 1);
      }, 180);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Brain className="w-8 h-8 text-purple-300" />
          <h2 className="text-4xl font-black text-white neon-text">
            {zone.title}
          </h2>
        </div>

        <p className="text-purple-300 tracking-widest uppercase text-sm">
          Memory Card {currentCardIdx + 1} of {cards.length}
        </p>
      </div>

      <div className="relative w-full max-w-lg h-[400px] perspective-[1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCardIdx}
            className="w-full h-full absolute inset-0 preserve-3d cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateY: isFlipped ? 180 : 0,
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            <div className="absolute inset-0 backface-hidden w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(168,85,247,0.18)]">
              <p className="text-purple-300 text-sm uppercase tracking-widest mb-6">
                Concept
              </p>

              <h3 className="text-3xl font-black text-white leading-tight">
                {card.front}
              </h3>

              <p className="text-slate-400 text-sm flex items-center gap-2 mt-auto">
                <RotateCcw className="w-4 h-4" />
                Tap to reveal
              </p>
            </div>

            <div className="absolute inset-0 backface-hidden w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(34,211,238,0.18)] [transform:rotateY(180deg)] border-cyan-500/30">
              <p className="text-cyan-300 text-sm uppercase tracking-widest mb-6">
                Explanation
              </p>

              <h3 className="text-2xl text-cyan-50 leading-relaxed">
                {card.back}
              </h3>

              <div
                className="mt-12 flex gap-4 w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleNext(false)}
                  className="flex-1 py-4 rounded-xl border border-rose-500/50 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors font-bold"
                >
                  Need Review
                </button>

                <button
                  onClick={() => handleNext(true)}
                  className="flex-1 py-4 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Got It
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!isFlipped && (
        <p className="mt-8 text-slate-500 text-sm">
          Flip the card before choosing.
        </p>
      )}

      <style jsx global>{`
        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}