"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { DynamicRenderer } from "@/components/game/DynamicRenderer";
import { AudioEngine } from "@/components/AudioEngine";
import { Heart, Star, LogOut, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const router = useRouter();
  const { playerStats, currentTopic, isGenerating, resetGame, themeColor, islands, activeIslandIndex, isMuted, toggleMute } = useGameStore();

  useEffect(() => {
    if (!currentTopic && !isGenerating) {
      router.push("/");
    }
  }, [currentTopic, isGenerating, router]);

  const handleExit = () => {
    resetGame();
    router.push("/");
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={cn("w-64 h-64 rounded-full blur-[100px] absolute", `bg-${themeColor}-600/30`)}
        />
        <div className="z-10 text-center flex flex-col items-center">
          <div className={cn("w-20 h-20 border-4 border-t-transparent rounded-full animate-spin mb-12", `border-${themeColor}-500`)} />
          <h2 className={cn("text-5xl font-black neon-text mb-6 tracking-widest", `text-${themeColor}-400`)}>GENERATING WORLD...</h2>
          <p className={cn("text-xl animate-pulse font-light", `text-${themeColor}-200`)}>Synthesizing roadmap, weaving mechanics, establishing connection...</p>
        </div>
      </div>
    );
  }

  if (!currentTopic || !islands || islands.length === 0) return null; // Wait for redirect

  const hpPercent = (playerStats.health / playerStats.maxHealth) * 100;
  const xpPercent = (playerStats.xp / playerStats.xpToNextLevel) * 100;

  const currentWorld = islands[activeIslandIndex];

  // Dynamic Backgrounds based on world theme
  const getBgClass = () => {
    if (!currentWorld) return "from-slate-900 to-black";
    switch (currentWorld.theme) {
      case "beginner": return "from-blue-950 via-slate-900 to-black";
      case "intermediate": return "from-purple-950 via-slate-900 to-black";
      case "advanced": return "from-red-950 via-slate-900 to-black";
      default: return "from-slate-900 to-black";
    }
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col text-white overflow-hidden relative">
      <AudioEngine />

      {/* Immersive Dynamic Background Layers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWorld?.theme || 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className={cn("absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] pointer-events-none z-0", getBgClass())}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

      {/* HUD Header */}
      <header className="relative z-20 w-full bg-black/40 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">ACTIVE QUEST</span>
            <h1 className={cn("text-2xl font-black neon-text truncate max-w-[300px]", `text-${themeColor}-400`)}>{currentTopic}</h1>
          </div>

          <div className="flex items-center gap-6 bg-black/60 px-6 py-3 rounded-full border border-white/10 shadow-inner">
            {/* HP Bar */}
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-500" />
              <div className="w-32 h-3 bg-slate-900 rounded-full overflow-hidden shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                <motion.div
                  className="h-full bg-rose-500"
                  animate={{ width: `${hpPercent}%` }}
                />
              </div>
              <span className="text-sm font-mono font-bold text-rose-300">{playerStats.health}</span>
            </div>

            <div className="w-px h-6 bg-white/20 mx-2" />

            {/* XP Bar */}
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400" />
              <div className="w-48 h-3 bg-slate-900 rounded-full overflow-hidden shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                <motion.div
                  className="h-full bg-amber-500"
                  animate={{ width: `${xpPercent}%` }}
                />
              </div>
              <span className="text-sm font-mono font-bold text-amber-300">Level {playerStats.level}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={toggleMute} className="text-slate-400 hover:text-white transition-colors">
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 text-cyan-400" />}
          </button>

          <button
            onClick={handleExit}
            className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors px-4 py-2 rounded-lg hover:bg-rose-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold">ABANDON QUEST</span>
          </button>
        </div>
      </header>

      {/* Main Game Area - FULLSCREEN FLEX */}
      <main className="flex-1 relative z-10 flex flex-col overflow-y-auto overflow-x-hidden">
        <DynamicRenderer />
      </main>
    </div>
  );
}
