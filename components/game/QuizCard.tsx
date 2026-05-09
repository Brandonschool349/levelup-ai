"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizZone } from "@/lib/types";
import { useGameStore } from "@/store/game-store";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  zone: QuizZone;
  onComplete: () => void;
}

export function QuizCard({ zone, onComplete }: QuizCardProps) {
  const { addXP, takeDamage, registerFail, playerStats } = useGameStore();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = zone?.questions?.[currentQIndex];
  if (!question) {
    return (
      <div className="p-6 text-center text-red-400">
        No questions found for this level.
      </div>
    );
  }

  // Wait for defeat overlay
  if (playerStats.health <= 0) return null;

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question.correctAnswerIndex) {
      addXP((zone.xpReward ?? 0) / zone.questions.length);
    } else {
      takeDamage(10, zone.title); // Standard penalty
      registerFail(zone.id); // Track adaptive learning fails
    }
  };

  const handleNext = () => {
    if (currentQIndex < zone.questions.length - 1) {
      setSelectedAnswer(null);
      setShowExplanation(false);
      setCurrentQIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white neon-text-cyan tracking-wide">{zone.title}</h2>
        <p className="text-cyan-300 mt-3 font-medium tracking-widest uppercase">Question {currentQIndex + 1} of {zone.questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQIndex}
          initial={{ x: 50, opacity: 0, rotateY: -5 }}
          animate={{ x: 0, opacity: 1, rotateY: 0 }}
          exit={{ x: -50, opacity: 0, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full max-w-3xl bg-black/60 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] rounded-[2rem] p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
            <motion.div
              className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              initial={{ width: `${(currentQIndex / zone.questions.length) * 100}%` }}
              animate={{ width: `${((currentQIndex + 1) / zone.questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <h3 className="text-3xl font-bold text-white mb-10 text-center leading-relaxed">{question.question}</h3>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === question.correctAnswerIndex;
              const showStatus = selectedAnswer !== null;

              return (
                <motion.button
                  key={idx}
                  whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedAnswer !== null}
                  className={cn(
                    "w-full p-6 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border-2",
                    !showStatus && "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-slate-200 shadow-sm",
                    showStatus && isCorrect && "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
                    showStatus && isSelected && !isCorrect && "bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]",
                    showStatus && !isSelected && !isCorrect && "bg-black/40 border-white/5 text-slate-600 opacity-50"
                  )}
                >
                  <span className="text-xl font-medium">{option}</span>
                  {showStatus && isCorrect && <CheckCircle2 className="w-8 h-8 text-emerald-500 drop-shadow-md" />}
                  {showStatus && isSelected && !isCorrect && <XCircle className="w-8 h-8 text-rose-500 drop-shadow-md" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/20 text-slate-200">
                  <p className="text-lg"><strong className="text-cyan-400 uppercase tracking-widest text-sm mr-2 block mb-1">Explanation</strong> {question.explanation}</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-10 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  >
                    {currentQIndex < zone.questions.length - 1 ? "Next Question" : "Complete Trial"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
