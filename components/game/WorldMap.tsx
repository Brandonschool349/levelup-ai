"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import {
  ShieldAlert,
  Sparkles,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const themeStyles = {
  beginner: {
    title: "text-cyan-400",
    bg: "bg-cyan-950/40",
    border: "border-cyan-500",
  },
  intermediate: {
    title: "text-purple-400",
    bg: "bg-purple-950/40",
    border: "border-purple-500",
  },
  advanced: {
    title: "text-rose-400",
    bg: "bg-rose-950/40",
    border: "border-rose-500",
  },
};

export function WorldMap() {
  const {
    islands,
    activeIslandIndex,
    enterZone,
    enterFinalBoss,
  } = useGameStore();

  if (!islands?.length) return null;

  return (
    <div className="w-screen min-h-screen overflow-x-auto overflow-y-hidden px-12 py-20">
      <div className="flex items-center gap-16 min-w-max mx-auto">

        {islands.map((island, islandIdx) => {
          const styles = themeStyles[island.theme as keyof typeof themeStyles] ?? themeStyles.beginner;

          const isLocked = islandIdx > activeIslandIndex;

          return (
            <motion.div
              key={island.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={cn(
                "relative shrink-0",
                isLocked &&
                "opacity-40 grayscale"
              )}
            >
              <div
                className={cn(
                  "w-[360px] h-[300px] rounded-[40px] border-2 p-8 backdrop-blur-xl shadow-2xl",
                  styles.bg,
                  styles.border
                )}
              >
                <h2
                  className={cn(
                    "text-3xl font-black",
                    styles.title
                  )}
                >
                  {island.title}
                </h2>

                <p className="text-slate-400 mt-2 mb-10">
                  {island.description}
                </p>

                <div className="flex justify-between">
                  {island.zones.map(
                    (zone, idx) => (
                      <button
                        key={zone.id}
                        onClick={() =>
                          enterZone(
                            islandIdx,
                            idx
                          )
                        }
                        disabled={isLocked}
                        className="group flex flex-col items-center"
                      >
                        <div
                          className={cn(
                            "w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110",
                            styles.border,
                            styles.bg
                          )}
                        >
                          {zone.type ===
                            "quiz" ? (
                            <Sparkles className="w-8 h-8 text-white" />
                          ) : (
                            <Layers className="w-8 h-8 text-white" />
                          )}
                        </div>

                        <p className="text-sm mt-3 text-center text-slate-300 w-20">
                          {zone.title}
                        </p>
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={enterFinalBoss}
          className="shrink-0 w-52 h-52 rounded-full border-4 border-red-500 bg-red-950/50 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,0,0,.3)] hover:scale-105 transition"
        >
          <ShieldAlert className="w-14 h-14 text-red-500" />

          <span className="font-black text-red-400 mt-3 text-lg">
            FINAL BOSS
          </span>
        </motion.button>
      </div>
    </div>
  );
}