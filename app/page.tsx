"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Star,
  Trophy,
  Target,
  Loader2 // Importé este para el estado de carga
} from "lucide-react";
import { useGameStore } from "@/store/game-store";
import { generateLearningPath } from "@/lib/ai-service";

export default function Home() {
  const router = useRouter();
  const [topic, setTopic] = useState("");

  const {
    setGenerating,
    isGenerating, // Asegúrate de que tu store tenga este valor
    setGameData,
    playerStats,
  } = useGameStore();

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isGenerating) return;

    try {
      setGenerating(true);
      const data = await generateLearningPath(topic);
      console.log("GAME DATA FROM API:", data);
      setGameData(data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to generate:", error);
    } finally {
      setGenerating(false);
    }
  };

  const xpPercent =
    playerStats.xpToNextLevel > 0
      ? (playerStats.xp / playerStats.xpToNextLevel) * 100
      : 0;

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden text-white">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header / Stats Bar */}
      <header className="relative z-20 w-full p-8 flex justify-between items-start max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 border border-indigo-400 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            <span className="text-3xl font-black">{playerStats.level}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-widest text-indigo-100 uppercase">Player One</h2>
            <div className="flex items-center gap-2 mt-1 w-48">
              <div className="h-2 flex-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${xpPercent}%` }} />
              </div>
              <span className="text-xs font-mono text-amber-400">{playerStats.xp} XP</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
          <span className="text-xs text-slate-400 font-bold tracking-widest mb-1 flex items-center gap-2 uppercase">
            <Trophy className="w-4 h-4 text-emerald-400" />
            Topics Mastered
          </span>
          <span className="text-2xl font-black text-emerald-300">{playerStats.topicsCompleted}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full"
        >
          {/* Logo Section */}
          <div className="relative mb-8 flex flex-col items-center w-full">
            <BrainCircuit className="w-12 h-12 text-indigo-400 mb-6 animate-pulse" />
            <Image
              src="/levelupai_logo.png"
              alt="LevelUp AI Logo"
              width={350}
              height={100}
              className="object-contain drop-shadow-[0_0_25px_rgba(99,102,241,0.3)]"
              priority
            />
          </div>

          <p className="text-2xl text-indigo-200 max-w-2xl mx-auto mb-12 font-light">
            Enter any subject. The AI will generate a <strong className="text-white">unique game universe</strong> for you to conquer.
          </p>

          {/* Input Form */}
          <form
            onSubmit={handleStart}
            className="w-full max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-xl flex gap-4 shadow-2xl"
          >
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: Cars, React, Math, Python..."
              disabled={isGenerating}
              className="flex-1 bg-transparent outline-none px-4 text-lg text-white placeholder:text-slate-500 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 transition font-bold flex items-center gap-2 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Start
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Tags */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Cars", "React", "Python", "Physics"].map((item) => (
              <button
                key={item}
                onClick={() => setTopic(item)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}