"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { Lock, Play, ShieldAlert, Sparkles, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const themeStyles = {
  beginner: {
    title: "text-blue-400",
    bg: "bg-blue-950",
    border: "border-blue-500",
  },
  intermediate: {
    title: "text-purple-400",
    bg: "bg-purple-950",
    border: "border-purple-500",
  },
  advanced: {
    title: "text-rose-400",
    bg: "bg-rose-950",
    border: "border-rose-500",
  },
};

export function WorldMap() {
  const {
    islands,
    activeIslandIndex,
    enterZone,
    enterFinalBoss,
    themeColor
  } = useGameStore();
  // Scroll to active island on mount could be added, but for now we render all or just the active one.
  // The user requested: "The map should feel inspired by Candy Crush / Mario world maps... 3 MAIN ISLANDS + 1 FINAL BOSS".
  // We will render all 3 islands vertically, bottom to top.

  if (!islands || islands.length === 0) return null;

  return (
    <div className="w-full relative flex flex-col items-center py-24 gap-32">
      {/* Final Boss Island at the very top */}
      <div className="relative w-full max-w-4xl flex flex-col items-center z-10 mt-12 mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-96 h-96 flex items-center justify-center"
        >
          {/* Evil Boss Terrain Blob */}
          <svg className="absolute inset-0 w-full h-full text-red-950/80 drop-shadow-[0_0_50px_rgba(220,38,38,0.3)]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.9,-18,97.4,-2.2C97.9,13.6,92.8,29.7,83.5,43.2C74.2,56.7,60.7,67.6,45.8,75.1C30.9,82.6,15.5,86.7,0.2,86.4C-15.1,86.1,-30.2,81.4,-44.6,73.6C-59,65.8,-72.7,54.9,-81.8,41.4C-90.9,27.9,-95.4,11.8,-94.1,-3.8C-92.8,-19.4,-85.7,-34.5,-75.4,-46.6C-65.1,-58.7,-51.6,-67.8,-37.5,-74.6C-23.4,-81.4,-8.7,-85.9,6.2,-86.6C21.1,-87.3,42.2,-84.2,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/20 to-transparent rounded-full mix-blend-overlay" />

          <button
            onClick={() => enterFinalBoss()} // Index 3 is treated as final boss in our store logic for now, or handled specially
            className="group relative z-20 flex flex-col items-center"
          >
            <div className="w-28 h-28 rounded-full bg-red-950 border-4 border-red-500 flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-110 transition-transform">
              <ShieldAlert className="w-14 h-14 text-red-500 animate-pulse" />
            </div>
            <div className="absolute top-full mt-4 bg-black/80 p-3 rounded-xl border border-red-500/50 w-64 text-center">
              <h3 className="font-black text-red-500 text-lg uppercase tracking-widest">FINAL BOSS</h3>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Path connecting Final Boss to Island 3 */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 w-20 h-[700px] pointer-events-none z-0"
        style={{ top: '220px' }}
      >
        <path d="M16 0 C 100 200, -80 400, 16 600 C 100 800, -80 1000, 16 1200" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeDasharray="10 10" />
      </svg>

      {/* Render Islands in reverse so Beginner is at bottom */}
      {[...(islands || [])].reverse().map((island, reverseIdx) => {
        const islandIdx = (islands || []).length - 1 - reverseIdx;
        const isActiveIsland = activeIslandIndex === islandIdx;
        const isLockedIsland = activeIslandIndex < islandIdx;

        // Theme properties
        const styles = themeStyles[island.theme];
        const tBlobColor = island.theme === "beginner" ? "text-blue-950/60" : island.theme === "intermediate" ? "text-purple-950/60" : "text-rose-950/60";

        return (
          <motion.div
            key={island.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={cn("relative w-full max-w-4xl flex flex-col items-center z-10", isLockedIsland && "opacity-50 grayscale")}
          >
            {/* Island Title */}
            <div className="absolute -top-16 text-center w-full z-20">
              <h2
                className={cn(
                  "text-3xl font-black drop-shadow-[0_0_10px_currentColor] uppercase tracking-widest",
                  styles.title
                )}
              >{island.title}</h2>
              <p className="text-slate-400 font-medium">{island.description}</p>
            </div>

            {/* Island Terrain Blob */}
            <div className="relative w-[90vw] max-w-[450px] h-[280px] flex items-center justify-center">
              <svg className={cn("absolute inset-0 w-full h-full", tBlobColor, "drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]")} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M37.5,-63.9C49.9,-54.8,62.2,-46.3,71.2,-34.5C80.2,-22.8,85.9,-7.7,84.1,6.8C82.4,21.3,73.1,35.2,61.9,45.8C50.7,56.5,37.6,63.9,23.5,69.5C9.4,75.1,-5.7,78.9,-19.7,76.5C-33.8,74.1,-46.8,65.5,-57.4,54.5C-68.1,43.4,-76.3,29.9,-81.1,14.9C-85.9,-0.1,-87.3,-16.5,-80.7,-30.2C-74.1,-44,-59.5,-55.1,-45.3,-63.6C-31.1,-72.1,-15.5,-78.1,-0.6,-77.2C14.3,-76.3,28.7,-68.5,37.5,-63.9Z" transform="translate(100 100) scale(1.2)" />
              </svg>

              {/* Nodes within the island */}
              <div className="absolute inset-0 z-20">
                {(island.zones || []).map((zone, zIdx) => {
                  const isBoss = zone.type === "boss";
                  const nodePositions = [
                    { left: '20%', top: '60%' },
                    { left: '50%', top: '40%' },
                    { left: '80%', top: '20%' },
                  ];
                  const pos = nodePositions[zIdx] || nodePositions[0];

                  return (
                    <div key={zone.id} className="absolute" style={pos}>
                      <button
                        onClick={() => enterZone(zIdx)}
                        disabled={isLockedIsland}
                        className="group relative flex flex-col items-center"
                      >
                        <div className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                          styles.bg,
                          styles.border,
                          isActiveIsland &&
                          "shadow-[0_0_20px_currentColor] hover:scale-110",
                          isBoss && "w-20 h-20 border-red-500 bg-red-950"
                        )}  >
                          {isBoss ? <ShieldAlert className="w-8 h-8 text-red-500" /> :
                            zone.type === "quiz" ? <Sparkles className="w-6 h-6 text-white" /> :
                              <Layers className="w-6 h-6 text-white" />}
                        </div>

                        <div className="absolute top-full mt-2 bg-black/80 px-3 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          <span className="text-sm font-bold text-white">{zone.title}</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
