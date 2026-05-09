"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

export function RecoveryMode() {
  const { islands, activeIslandIndex, activeZoneIndex, finishRecovery, themeColor, finalBoss } = useGameStore();
  
  let zone;
  if (activeZoneIndex === 3 && finalBoss) {
    zone = finalBoss;
  } else if (islands && islands.length > activeIslandIndex) {
    const world = islands[activeIslandIndex];
    zone = world?.zones?.[activeZoneIndex];
  }

  if (!zone) return null;

  const content = zone.recoveryContent || {
    simplifiedExplanation: "Take a deep breath. Focus on the core principles.",
    keyTakeaway: "Patience and practice lead to mastery.",
    miniFlashcards: []
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto flex flex-col items-center p-8 bg-indigo-950/40 backdrop-blur-xl border border-indigo-500/30 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.2)] relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500" />
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/50">
          <BookOpen className="w-8 h-8 text-indigo-300" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wide">Training Matrix</h2>
          <p className="text-indigo-300">Adaptive Recovery Protocol Initiated</p>
        </div>
      </div>

      <div className="w-full space-y-6">
        <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
          <h3 className="text-lg text-indigo-400 font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> Simplified Concept
          </h3>
          <p className="text-xl text-slate-200 leading-relaxed">{content.simplifiedExplanation}</p>
        </div>

        <div className="bg-emerald-950/30 p-6 rounded-2xl border border-emerald-500/20">
          <h3 className="text-lg text-emerald-400 font-bold mb-2">Key Takeaway</h3>
          <p className="text-2xl font-semibold text-emerald-100">{content.keyTakeaway}</p>
        </div>

        {content.miniFlashcards && content.miniFlashcards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {content.miniFlashcards.map((fc, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
                <span className="text-sm text-slate-400 mb-2">{fc.front}</span>
                <span className="text-lg font-bold text-white">{fc.back}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={finishRecovery}
        className="mt-12 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center gap-3"
      >
        I UNDERSTAND <ArrowRight className="w-6 h-6" />
      </button>
    </motion.div>
  );
}
