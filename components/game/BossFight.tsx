"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Zap,
  Heart,
  Skull,
  CheckCircle2,
  Timer,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BossFightProps = {
  zone: any;
  onComplete: () => void;
};

const PLAYER_MAX_HEALTH = 100;
const BOSS_MAX_HEALTH = 100;
const DAMAGE_TO_BOSS = 20;
const DAMAGE_TO_PLAYER = 25;
const START_SECONDS = 45;

export function BossFight({ zone, onComplete }: BossFightProps) {
  const questions = useMemo(() => {
    const raw =
      zone?.questions ||
      zone?.quiz?.questions ||
      zone?.bossQuestions ||
      [];

    if (Array.isArray(raw) && raw.length > 0) return raw;

    return [
      {
        question: "What is the core concept of this challenge?",
        options: [
          "Understanding the fundamentals",
          "Skipping the basics",
          "Guessing randomly",
          "Ignoring feedback",
        ],
        correctAnswerIndex: 0,
      },
      {
        question: "What makes this interface agentic?",
        options: [
          "It adapts based on player performance",
          "It only shows static text",
          "It never changes state",
          "It removes interaction",
        ],
        correctAnswerIndex: 0,
      },
      {
        question: "Why does LevelUp AI generate worlds?",
        options: [
          "To turn topics into playable learning paths",
          "To replace all UI with chat",
          "To avoid feedback",
          "To hide progression",
        ],
        correctAnswerIndex: 0,
      },
      {
        question: "What should happen when users struggle?",
        options: [
          "The UI should adapt and support recovery",
          "The app should punish them only",
          "The journey should disappear",
          "The boss should instantly win",
        ],
        correctAnswerIndex: 0,
      },
      {
        question: "How do you defeat this boss?",
        options: [
          "By proving mastery across multiple answers",
          "With one lucky answer",
          "By skipping questions",
          "By abandoning the quest",
        ],
        correctAnswerIndex: 0,
      },
    ];
  }, [zone]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [bossHealth, setBossHealth] = useState(BOSS_MAX_HEALTH);
  const [playerHealth, setPlayerHealth] = useState(PLAYER_MAX_HEALTH);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null
  );
  const [isResolving, setIsResolving] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);

  const currentQuestion = questions[questionIndex % questions.length];

  const options =
    currentQuestion?.options ||
    currentQuestion?.answers ||
    currentQuestion?.choices ||
    [];

  const correctAnswerIndex =
    typeof currentQuestion?.correctAnswerIndex === "number"
      ? currentQuestion.correctAnswerIndex
      : typeof currentQuestion?.correct === "number"
        ? currentQuestion.correct - 1
        : 0;

  useEffect(() => {
    if (isResolving) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPlayerHealth((hp) => Math.max(0, hp - DAMAGE_TO_PLAYER));
          setQuestionIndex((q) => q + 1);
          return START_SECONDS;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isResolving]);

  const handleAnswer = (optionIndex: number) => {
    if (isResolving) return;

    setIsResolving(true);
    setSelectedIndex(optionIndex);

    const isCorrect = optionIndex === correctAnswerIndex;

    if (isCorrect) {
      setLastResult("correct");

      const nextBossHealth = Math.max(0, bossHealth - DAMAGE_TO_BOSS);
      setBossHealth(nextBossHealth);

      setTimeout(() => {
        if (nextBossHealth <= 0) {
          onComplete();
          return;
        }

        setQuestionIndex((prev) => prev + 1);
        setSelectedIndex(null);
        setLastResult(null);
        setIsResolving(false);
        setSecondsLeft(START_SECONDS);
      }, 750);

      return;
    }

    setLastResult("wrong");

    const nextPlayerHealth = Math.max(0, playerHealth - DAMAGE_TO_PLAYER);
    setPlayerHealth(nextPlayerHealth);

    setTimeout(() => {
      setQuestionIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setLastResult(null);
      setIsResolving(false);
      setSecondsLeft(START_SECONDS);
    }, 750);
  };

  const timerTone =
    secondsLeft <= 10
      ? "text-red-300 border-red-400/40 bg-red-500/10"
      : "text-cyan-200 border-cyan-300/30 bg-cyan-400/10";

  return (
    <section className="relative min-h-[calc(100vh-72px)] w-full overflow-hidden px-4 pb-6 pt-20 text-white">
      <div className="fixed inset-0 -z-20 bg-black" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(239,68,68,.30),transparent_30%),radial-gradient(circle_at_25%_75%,rgba(168,85,247,.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,.12),transparent_28%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />

      <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl items-center">
        <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden rounded-[2rem] border border-red-400/50 bg-gradient-to-br from-red-950/80 via-black/90 to-fuchsia-950/60 p-6 shadow-2xl shadow-red-500/25 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(239,68,68,.18),transparent_58%)]" />

            <div className="relative">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-red-300">
                    Final Boss
                  </p>

                  <h1 className="text-4xl font-black text-red-100 md:text-5xl">
                    {zone?.title || "Final Challenge"}
                  </h1>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">
                    {zone?.description ||
                      "Defeat the boss by landing five correct strikes."}
                  </p>
                </div>

                <div
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-3 font-black",
                    timerTone
                  )}
                >
                  <Timer className="h-5 w-5" />
                  {secondsLeft}s
                </div>
              </div>

              <div className="my-6 flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.06, 1],
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="relative flex h-44 w-44 items-center justify-center rounded-full border border-red-300/40 bg-red-500/10 shadow-[0_0_90px_rgba(239,68,68,.45)]"
                >
                  <div className="absolute h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
                  <ShieldAlert className="relative h-24 w-24 text-red-300" />
                </motion.div>
              </div>

              <div className="space-y-5">
                <HealthBar
                  label="Boss HP"
                  value={bossHealth}
                  icon={<Skull className="h-4 w-4" />}
                  tone="boss"
                />

                <HealthBar
                  label="Your HP"
                  value={playerHealth}
                  icon={<Heart className="h-4 w-4" />}
                  tone="player"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-slate-300">
                <span className="font-bold text-red-200">Rule:</span> 5 correct
                strikes defeat the boss. Timer resets each question.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">
                  Challenge {questionIndex + 1}
                </p>

                <h2 className="mt-2 text-2xl font-black md:text-3xl">
                  Answer to strike
                </h2>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-yellow-300/20 bg-yellow-400/10 px-4 py-3 text-yellow-200">
                <Flame className="h-5 w-5" />
                <span className="text-sm font-black">
                  Hit {Math.floor((100 - bossHealth) / DAMAGE_TO_BOSS) + 1}/5
                </span>
              </div>
            </div>

            <div className="mb-5 rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-lg font-bold leading-8 text-white md:text-xl">
                {currentQuestion?.question || currentQuestion?.prompt}
              </p>
            </div>

            <div className="grid gap-3">
              {options.map((option: string, index: number) => {
                const isSelected = selectedIndex === index;
                const isCorrectOption = index === correctAnswerIndex;

                return (
                  <button
                    key={`${option}-${index}`}
                    disabled={isResolving}
                    onClick={() => handleAnswer(index)}
                    className={cn(
                      "rounded-2xl border border-white/10 bg-white/5 p-4 text-left font-semibold text-slate-200 transition-all",
                      "hover:border-cyan-300/40 hover:bg-cyan-400/10",
                      isResolving && "cursor-not-allowed",
                      isSelected &&
                      lastResult === "correct" &&
                      "border-emerald-400/60 bg-emerald-500/15 text-emerald-100",
                      isSelected &&
                      lastResult === "wrong" &&
                      "border-red-400/60 bg-red-500/15 text-red-100",
                      isResolving && isCorrectOption && "border-emerald-400/40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-black">
                        {index + 1}
                      </span>

                      <span>{option}</span>

                      {isSelected && lastResult === "correct" && (
                        <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {lastResult && (
              <div
                className={cn(
                  "mt-5 rounded-2xl border p-4 text-center font-black",
                  lastResult === "correct"
                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                    : "border-red-400/40 bg-red-500/10 text-red-200"
                )}
              >
                {lastResult === "correct"
                  ? `Critical hit. Boss took ${DAMAGE_TO_BOSS} damage.`
                  : `Wrong answer. You took ${DAMAGE_TO_PLAYER} damage.`}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HealthBar({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: "boss" | "player";
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.22em] text-slate-400">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>

        <span>{value}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            tone === "boss" ? "bg-red-400" : "bg-cyan-400"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}