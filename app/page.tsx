"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BrainCircuit, Star, Trophy, Target } from "lucide-react";
import { useGameStore } from "@/store/game-store";
import { generateLearningPath } from "@/lib/ai-service";

export default function Home() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const { setGenerating, setGameData, playerStats } = useGameStore();

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setGenerating(true);
    router.push("/dashboard");

    try {
      const data = await generateLearningPath(topic);
      setGameData(data.topic, data.themeColor, data.islands, data.finalBoss);
    } catch (error) {
      console.error("Failed to generate:", error);
    } finally {
      setGenerating(false);
    }
  };

  const xpPercent = (playerStats.xp / playerStats.xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden text-white">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Player Hub Header */}
      <header className="relative z-20 w-full p-8 flex justify-between items-start max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 border border-indigo-400 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            <span className="text-3xl font-black">{playerStats.level}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-widest text-indigo-100">PLAYER ONE</h2>
            <div className="flex items-center gap-2 mt-1 w-48">
               <div className="h-2 flex-1 bg-slate-900 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-400" style={{ width: `${xpPercent}%` }} />
               </div>
               <span className="text-xs font-mono text-amber-400">{playerStats.xp} XP</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-end bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 font-bold tracking-widest mb-1 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" /> TOPICS MASTERED
            </span>
            <span className="text-2xl font-black text-emerald-300">{playerStats.topicsCompleted.length}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-8 backdrop-blur-sm">
            <Target className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold text-indigo-200 tracking-widest uppercase">Select Next Target</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-indigo-600 mb-6 drop-shadow-2xl tracking-tighter">
            LEVELUP AI
          </h1>
          
          <p className="text-2xl text-indigo-200 max-w-2xl mb-16 font-light">
            Enter any subject. The AI will generate a <strong className="text-white">unique game universe</strong> for you to conquer.
          </p>

          <form onSubmit={handleStart} className="w-full max-w-2xl relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-black/80 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-3 shadow-2xl">
              <div className="pl-6 pr-4">
                <BrainCircuit className="w-8 h-8 text-indigo-400" />
              </div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g. Quantum Physics, React, History of Rome"
                className="flex-1 bg-transparent border-none outline-none text-white text-2xl px-2 py-6 placeholder:text-slate-600 font-medium"
                required
              />
              <button
                type="submit"
                disabled={!topic.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white px-8 py-6 rounded-2xl font-black tracking-wider flex items-center gap-3 transition-all"
              >
                INITIATE <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Display completed topics if any */}
        {playerStats.topicsCompleted.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24 w-full max-w-3xl"
          >
            <h3 className="text-left text-sm text-slate-500 font-bold tracking-widest uppercase mb-6">Recent Conquests</h3>
            <div className="flex flex-wrap gap-4">
              {playerStats.topicsCompleted.map((t, idx) => (
                <div key={idx} className="px-6 py-3 rounded-xl bg-emerald-900/20 border border-emerald-500/30 flex items-center gap-3">
                  <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                  <span className="font-bold text-emerald-100">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
