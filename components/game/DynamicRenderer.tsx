"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { WorldMap } from "./WorldMap";
import { QuizCard } from "./QuizCard";
import { BossFight } from "./BossFight";
import { Flashcard } from "./Flashcard";
import { GameOverScreen } from "./GameOverScreen";
import { RecoveryMode } from "./RecoveryMode";

export function DynamicRenderer() {
  const {
    islands,
    activeIslandIndex,
    activeZoneIndex,
    isInWorldMap,
    isInBossFight,
    completeZone,
    isDefeated,
    isInRecoveryMode,
    finalBoss
  } = useGameStore();

  if (!islands || islands.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <p className="text-slate-500">No active journey. Return to home to generate one.</p>
      </div>
    );
  }

  // --- OVERLAYS ---
  if (isDefeated) {
    return <GameOverScreen />;
  }

  if (isInRecoveryMode) {
    return (
      <div className="flex-1 w-full relative flex items-center justify-center p-4 lg:p-12 z-50">
        <RecoveryMode />
      </div>
    );
  }

  const renderComponent = () => {
    if (isInWorldMap) {
      return <WorldMap key="world-map" />;
    }

    // Check if it's the final boss
    if (isInBossFight && finalBoss) {
      return <BossFight key={`zone-${finalBoss.id}`} zone={finalBoss} onComplete={completeZone} />;
    }

    const currentIsland = islands[activeIslandIndex];
    if (!currentIsland) return <div>Island not found</div>;

    const currentZone = currentIsland.zones[activeZoneIndex];
    if (!currentZone) return <div>Zone not found</div>;

    switch (currentZone.type) {
      case "quiz":
        return <QuizCard key={`zone-${currentZone.id}`} zone={currentZone} onComplete={completeZone} />;
      case "boss":
        // Type casting required since TS discriminates unions, and we grouped them all in GameZone
        return <BossFight key={`zone-${currentZone.id}`} zone={currentZone as any} onComplete={completeZone} />;
      case "flashcard":
        return <Flashcard key={`zone-${currentZone.id}`} zone={currentZone as any} onComplete={completeZone} />;
      // Sequence and Memory fallbacks (using Quiz or Flashcard UI for the hackathon since I haven't implemented full minigames for them outside boss mechanics yet)
      case "sequence":
      case "memory":
        return <QuizCard key={`zone-fallback-${currentZone.id}`} zone={currentZone as any} onComplete={completeZone} />;
      default:
        return <div>Unknown zone type</div>;
    }
  };

  return (
    <div className="flex-1 w-full relative flex items-center justify-center p-4 lg:p-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={isInWorldMap ? "map" : `zone-${activeZoneIndex}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center"
        >
          {renderComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
