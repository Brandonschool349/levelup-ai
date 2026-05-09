"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Lock,
  ShieldAlert,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game-store";

const islandThemes = {
  beginner: {
    border: "border-cyan-400/60",
    glow: "shadow-cyan-500/25",
    title: "text-cyan-300",
    gradient: "from-cyan-950/70 via-slate-950/90 to-blue-950/60",
    node: "from-cyan-400 to-blue-500",
    progress: "bg-cyan-400",
    accent: "text-cyan-300",
  },
  intermediate: {
    border: "border-violet-400/60",
    glow: "shadow-violet-500/25",
    title: "text-violet-300",
    gradient: "from-violet-950/70 via-slate-950/90 to-fuchsia-950/60",
    node: "from-violet-400 to-fuchsia-500",
    progress: "bg-violet-400",
    accent: "text-violet-300",
  },
  advanced: {
    border: "border-orange-400/60",
    glow: "shadow-orange-500/25",
    title: "text-orange-300",
    gradient: "from-orange-950/70 via-slate-950/90 to-red-950/60",
    node: "from-orange-400 to-red-500",
    progress: "bg-orange-400",
    accent: "text-orange-300",
  },
};

export default function WorldMap() {
  const {
    islands,
    activeIslandIndex,
    enterZone,
    enterFinalBoss,
    completedZoneIds,
  } = useGameStore();

  if (!islands?.length) return null;

  const canEnterBoss = islands.every((island) =>
    island.zones.every((zone) => completedZoneIds.includes(zone.id))
  );

  return (
    <section className="relative min-h-full w-full overflow-hidden bg-black px-4 py-6 text-white md:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,.16),transparent_30%),radial-gradient(circle_at_50%_95%,rgba(244,63,94,.13),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.028)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40" />

      <div className="relative mx-auto max-w-[1600px]">
        <header className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-cyan-300">
              <Zap className="h-3.5 w-3.5" />
              Generated World
            </p>

            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              Learning Quest Map
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Your AI-generated RPG learning path.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-right backdrop-blur-xl md:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Progress
            </p>
            <p className="text-xl font-black text-cyan-300">
              {completedZoneIds.length} XP
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {islands.slice(0, 3).map((island, islandIndex) => {
            const theme =
              islandThemes[island.theme as keyof typeof islandThemes] ??
              islandThemes.beginner;

            const zones = island.zones.filter(Boolean).slice(0, 4);
            const isIslandLocked = islandIndex > activeIslandIndex;

            const completedCount = zones.filter((zone) =>
              completedZoneIds.includes(zone.id)
            ).length;

            const progress =
              zones.length > 0 ? (completedCount / zones.length) * 100 : 0;

            return (
              <motion.article
                key={island.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: islandIndex * 0.08 }}
                className={cn(
                  "relative min-h-[500px] overflow-hidden rounded-[1.75rem] border bg-gradient-to-br p-5 shadow-2xl backdrop-blur-xl",
                  theme.gradient,
                  theme.border,
                  theme.glow,
                  isIslandLocked && "opacity-45 grayscale"
                )}
              >
                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.28em] text-white/45">
                        Island {islandIndex + 1}
                      </p>

                      <h2
                        className={cn(
                          "truncate text-2xl font-black leading-tight",
                          theme.title
                        )}
                        title={island.title}
                      >
                        {island.title}
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl">
                      {isIslandLocked ? (
                        <Lock className="h-5 w-5 text-white/70" />
                      ) : (
                        <Crown className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>

                  <p
                    className="mb-4 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-300"
                    title={island.description}
                  >
                    {island.description}
                  </p>

                  <div className="mb-5">
                    <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      <span>Progress</span>
                      <span>
                        {completedCount}/{zones.length}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          theme.progress
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex h-28 items-center justify-center rounded-3xl border border-white/10 bg-black/20">
                    <div
                      className={cn(
                        "flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl",
                        theme.node
                      )}
                    >
                      <Crown className="h-9 w-9 text-white" />
                    </div>
                  </div>

                  <div className="relative grid grid-cols-2 gap-3">
                    {zones.map((zone, zoneIndex) => {
                      const previousZone = zones[zoneIndex - 1];
                      const completed = completedZoneIds.includes(zone.id);

                      const locked =
                        isIslandLocked ||
                        (zoneIndex > 0 &&
                          previousZone &&
                          !completedZoneIds.includes(previousZone.id));

                      return (
                        <motion.button
                          key={zone.id}
                          whileHover={!locked ? { scale: 1.03 } : undefined}
                          whileTap={!locked ? { scale: 0.97 } : undefined}
                          disabled={locked}
                          onClick={() => {
                            if (locked) return;
                            enterZone(islandIndex, zoneIndex);
                          }}
                          className={cn(
                            "group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-3 text-left backdrop-blur-xl transition-all",
                            "hover:border-white/30 hover:bg-white/10",
                            locked && "cursor-not-allowed opacity-40",
                            completed &&
                            "border-emerald-400/40 bg-emerald-500/10"
                          )}
                        >
                          <div
                            className={cn(
                              "mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                              theme.node
                            )}
                          >
                            {locked ? (
                              <Lock className="h-4 w-4 text-white" />
                            ) : completed ? (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            ) : zone.type === "quiz" ? (
                              <Sparkles className="h-4 w-4 text-white" />
                            ) : (
                              <Layers className="h-4 w-4 text-white" />
                            )}
                          </div>

                          <h3
                            className="line-clamp-2 min-h-[36px] text-xs font-black leading-4 text-white"
                            title={zone.title}
                          >
                            {zone.title}
                          </h3>

                          <p className="mt-2 truncate text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                            {locked
                              ? "Locked"
                              : completed
                                ? "Cleared"
                                : zone.type || "Quest"}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.article>
            );
          })}

          <motion.button
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={canEnterBoss ? { scale: 1.02 } : undefined}
            whileTap={canEnterBoss ? { scale: 0.98 } : undefined}
            disabled={!canEnterBoss}
            onClick={() => {
              if (!canEnterBoss) return;
              enterFinalBoss();
            }}
            className={cn(
              "relative min-h-[500px] overflow-hidden rounded-[1.75rem] border border-red-400/60 bg-gradient-to-br from-red-950/75 via-black to-fuchsia-950/60 p-5 text-center shadow-2xl shadow-red-500/25 backdrop-blur-xl",
              !canEnterBoss && "cursor-not-allowed opacity-50 grayscale"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(239,68,68,.18),transparent_58%)]" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-red-300">
                  Final Gate
                </p>

                <h2 className="text-3xl font-black text-red-200">
                  Boss Fight
                </h2>

                <p className="mt-3 line-clamp-2 text-sm text-slate-300">
                  Defeat the final challenge and prove mastery.
                </p>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-red-300/40 bg-red-500/10 shadow-[0_0_80px_rgba(239,68,68,.4)]">
                  <ShieldAlert className="h-16 w-16 text-red-300" />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-center gap-2">
                  {!canEnterBoss && <Lock className="h-5 w-5 text-white/70" />}

                  <span className="text-xl font-black">
                    {canEnterBoss ? "UNLOCKED" : "LOCKED"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-400">
                  Complete all islands to unlock.
                </p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}