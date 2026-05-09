"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BossZone } from "@/lib/types";
import { useGameStore } from "@/store/game-store";
import { ShieldAlert, Sword, Timer, Skull } from "lucide-react";
import { cn } from "@/lib/utils";

interface BossFightProps {
  zone: BossZone;
  onComplete: () => void;
}

export function BossFight({ zone, onComplete }: BossFightProps) {
  const { addXP, takeDamage, playerStats, triggerDefeat } = useGameStore();
  const [bossHealth, setBossHealth] = useState(zone.maxHealth);
  const [timeLeft, setTimeLeft] = useState(zone.timeLimitSeconds);
  const [shake, setShake] = useState(false);
  const [attackAnimation, setAttackAnimation] = useState<"player" | "boss" | null>(null);

  const [quizIndex, setQuizIndex] = useState(0);
  const [sequenceSelection, setSequenceSelection] = useState<string[]>([]);

  // Clean up timer
  useEffect(() => {
    if (timeLeft <= 0 || bossHealth <= 0 || playerStats.health <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerDefeat("Time Expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, bossHealth, playerStats.health, triggerDefeat]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handlePlayerAttack = (damage: number) => {
    setAttackAnimation("player");
    setTimeout(() => {
      const newHealth = Math.max(0, bossHealth - damage);
      setBossHealth(newHealth);
      setAttackAnimation(null);

      if (newHealth <= 0) {
        addXP(zone.xpReward);
        setTimeout(() => onComplete(), 2000);
      }
    }, 500);
  };

  const handleBossAttack = () => {
    setAttackAnimation("boss");
    // Standard boss attack damage, if it drops below 0 the store handles defeat flag
    takeDamage(20, zone.bossName);
    triggerShake();
    setTimeout(() => setAttackAnimation(null), 500);
  };

  const renderTimedQuiz = () => {
    if (!zone.challenges) return null;
    const challenge = zone.challenges[quizIndex];
    if (!challenge) return null;

    const damage = Math.ceil(zone.maxHealth / zone.challenges.length);

    const onSelect = (idx: number) => {
      if (idx === challenge.correctAnswerIndex) {
        handlePlayerAttack(damage);
        setTimeout(() => setQuizIndex(prev => prev + 1), 1000);
      } else {
        handleBossAttack();
      }
    };

    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <motion.div
          key={quizIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl border border-red-900/50 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(239,68,68,0.15)] w-full"
        >
          <h3 className="text-3xl md:text-4xl text-white mb-12 text-center font-bold tracking-tight">
            {challenge.question}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenge.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(idx)}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-red-900/40 hover:border-red-500/50 text-slate-200 transition-all text-left text-xl font-medium shadow-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderMechanic = () => {
    switch (zone.mechanicType) {
      case "timed-quiz": return renderTimedQuiz();
      // simplified for golden path demo execution
      default: return renderTimedQuiz();
    }
  };

  const bossHealthPercent = (bossHealth / zone.maxHealth) * 100;
  const playerHealthPercent = (playerStats.health / playerStats.maxHealth) * 100;

  // Wait for defeat overlay to handle things if dead
  if (playerStats.health <= 0) return null;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-40 bg-black flex flex-col overflow-hidden",
        shake && "animate-[shake_0.5s_ease-in-out]"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/80 via-black to-slate-950 z-0" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-red-900/30 blur-[200px] rounded-full pointer-events-none z-0"
      />

      {/* Cinematic HUD - Centered and Constrained */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-8 pt-12 flex justify-between items-start">
        {/* Boss Header */}
        <div className="flex flex-col w-[40%]">
          <div className="flex items-center gap-4 mb-4">
            <Skull className="w-12 h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
            <h2 className="text-4xl font-black text-white uppercase tracking-widest text-shadow-lg shadow-red-500 truncate">{zone.bossName}</h2>
          </div>
          <div className="h-6 w-full bg-black/80 rounded-full border border-red-900/50 overflow-hidden relative shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-800 to-red-500"
              initial={{ width: "100%" }}
              animate={{ width: `${bossHealthPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Timer Center */}
        <div className="flex flex-col items-center bg-black/80 backdrop-blur-md px-10 py-4 rounded-3xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <div className={cn("flex items-center gap-3 text-5xl font-mono font-black", timeLeft < 15 ? "text-red-500 animate-pulse" : "text-amber-400")}>
            <Timer className="w-10 h-10" />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Player Header */}
        <div className="flex flex-col items-end w-[40%]">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl font-black text-emerald-50 tracking-wide drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">PLAYER</h2>
          </div>
          <div className="h-6 w-full bg-black/80 rounded-full border border-emerald-900/50 overflow-hidden relative shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <motion.div
              className="absolute top-0 right-0 h-full bg-gradient-to-l from-emerald-600 to-emerald-400 origin-right"
              initial={{ width: "100%" }}
              animate={{ width: `${playerHealthPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Encounter Area */}
      <div className="flex-1 relative z-10 flex items-center justify-center pb-12 w-full">
        <AnimatePresence>
          {attackAnimation === "player" && (
            <motion.div
              initial={{ x: -200, y: 100, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, y: -50, opacity: 1, scale: 2 }}
              exit={{ opacity: 0, scale: 3 }}
              className="absolute text-cyan-400 z-30 pointer-events-none drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]"
            >
              <Sword className="w-48 h-48" />
            </motion.div>
          )}
          {attackAnimation === "boss" && (
            <motion.div
              initial={{ x: 0, y: -200, opacity: 0, scale: 2 }}
              animate={{ x: 0, y: 100, opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute text-red-500 z-30 pointer-events-none drop-shadow-[0_0_50px_rgba(239,68,68,1)]"
            >
              <ShieldAlert className="w-64 h-64" />
            </motion.div>
          )}
        </AnimatePresence>

        {bossHealth <= 0 ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center z-20 bg-black/90 p-16 rounded-[3rem] border-2 border-emerald-500/50 shadow-[0_0_100px_rgba(16,185,129,0.6)] backdrop-blur-xl">
            <h1 className="text-8xl font-black text-emerald-400 neon-text mb-8 tracking-tighter">TITAN FALLEN</h1>
            <p className="text-4xl text-emerald-200 font-bold">+{zone.xpReward} XP</p>
          </motion.div>
        ) : (
          renderMechanic()
        )}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-15px); }
          20%, 40%, 60%, 80% { transform: translateX(15px); }
        }
      `}</style>
    </motion.div>
  );
}
