"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlashcardZone } from "@/lib/types";
import { useGameStore } from "@/store/game-store";
import { RotateCcw } from "lucide-react";

interface FlashcardProps {
  zone: FlashcardZone;
  onComplete: () => void;
}

export function Flashcard({ zone, onComplete }: FlashcardProps) {
  const { addXP } = useGameStore();
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = zone.cards[currentCardIdx];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = (knewIt: boolean) => {
    if (knewIt) {
      addXP(50);
    }
    
    if (currentCardIdx < zone.cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentCardIdx(prev => prev + 1), 150);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white neon-text">{zone.title}</h2>
        <p className="text-purple-300 mt-2">Card {currentCardIdx + 1} of {zone.cards.length}</p>
      </div>

      <div className="relative w-full max-w-lg h-[400px] perspective-[1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCardIdx}
            className="w-full h-full absolute inset-0 preserve-3d cursor-pointer"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            onClick={handleFlip}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <h3 className="text-3xl font-bold text-white mb-8">{card.front}</h3>
              <p className="text-slate-400 text-sm flex items-center gap-2 mt-auto">
                <RotateCcw className="w-4 h-4" /> Tap to flip
              </p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(34,211,238,0.15)] [transform:rotateY(180deg)] border-cyan-500/30">
              <h3 className="text-2xl text-cyan-50">{card.back}</h3>
              
              <div className="mt-12 flex gap-4 w-full" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleNext(false)}
                  className="flex-1 py-3 rounded-xl border border-rose-500/50 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
                >
                  Need Review
                </button>
                <button
                  onClick={() => handleNext(true)}
                  className="flex-1 py-3 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        .perspective-[1000px] {
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
