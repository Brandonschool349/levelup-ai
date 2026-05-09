"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { Skull, RotateCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function GameOverScreen() {
  const { causeOfDefeat, retryFromDefeat, resetGame } = useGameStore();
  const router = useRouter();

  const handleGiveUp = () => {
    resetGame();
    router.push("/");
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/50 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />

      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[800px] h-[800px] bg-red-900/20 blur-[150px] rounded-full pointer-events-none" 
      />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6"
      >
        <Skull className="w-32 h-32 text-red-600 mb-8 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]" />
        <h1 className="text-7xl md:text-9xl font-black text-red-600 mb-6 tracking-widest uppercase drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">DEFEATED</h1>
        
        <div className="bg-red-950/50 border border-red-900/50 px-8 py-4 rounded-2xl backdrop-blur-md mb-16">
          <p className="text-xl text-red-200">You succumbed to:</p>
          <p className="text-3xl font-bold text-white mt-2">{causeOfDefeat || "Overwhelming Concepts"}</p>
        </div>

        <div className="flex gap-6 w-full justify-center">
          <button 
            onClick={retryFromDefeat}
            className="flex items-center gap-3 px-8 py-4 bg-red-700 hover:bg-red-600 text-white rounded-xl font-bold text-xl transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105"
          >
            <RotateCcw className="w-6 h-6" /> RISE AGAIN
          </button>
          
          <button 
            onClick={handleGiveUp}
            className="flex items-center gap-3 px-8 py-4 bg-black/60 hover:bg-red-950/40 border border-white/10 hover:border-red-500/30 text-slate-300 hover:text-white rounded-xl font-bold text-xl transition-all"
          >
            <Home className="w-6 h-6" /> ABANDON QUEST
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
