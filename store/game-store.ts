import { create } from "zustand";
import { GameData, BossZone, ThemeColor } from "@/lib/types";


type PlayerStats = {
  xp: number;
  level: number;
  health: number;
  maxHealth: number;
  damage: number;
  xpToNextLevel: number;
  topicsCompleted: number;
};

interface GameState {
  topic: string;
  currentTopic: string;
  themeColor: ThemeColor;
  islands: GameData["islands"];

  finalBoss: BossZone | null;

  activeIslandIndex: number;
  activeZoneIndex: number;

  isGenerating: boolean;
  isInWorldMap: boolean;
  isInBossFight: boolean;
  isDefeated: boolean;
  isInRecoveryMode: boolean;
  isMuted: boolean;

  xp: number;
  level: number;
  health: number;
  maxHealth: number;
  damage: number;
  topicsCompleted: number;
  playerStats: PlayerStats;

  completedZoneIds: string[];
  causeOfDefeat: string | null;

  startGame: (game: GameData) => void;
  setGameData: (
    game: GameData,
    topic?: string,
    themeColor?: string,
    resetStats?: boolean
  ) => void;
  setGenerating: (value: boolean) => void;

  enterZone: (islandIndex: number, zoneIndex: number) => void;
  enterFinalBoss: () => void;
  completeZone: () => void;

  addXP: (amount: number) => void;
  takeDamage: (amount: number, cause?: string) => void;
  healPlayer: (amount: number) => void;
  registerFail: (cause?: string) => void;

  triggerDefeat: (cause?: string) => void;
  retryFromDefeat: () => void;

  enterRecoveryMode: () => void;
  exitRecoveryMode: () => void;
  finishRecovery: () => void;

  toggleMute: () => void;
  resetGame: () => void;
}

const INITIAL_HEALTH = 100;
const INITIAL_DAMAGE = 25;

function calculateLevel(xp: number) {
  return Math.floor(xp / 500) + 1;
}

function getXpToNextLevel(xp: number) {
  const currentLevel = calculateLevel(xp);
  const nextLevelXp = currentLevel * 500;
  return Math.max(0, nextLevelXp - xp);
}

function buildPlayerStats(
  xp: number,
  health: number,
  maxHealth = INITIAL_HEALTH,
  damage = INITIAL_DAMAGE,
  topicsCompleted = 0
): PlayerStats {
  return {
    xp,
    level: calculateLevel(xp),
    health,
    maxHealth,
    damage,
    xpToNextLevel: getXpToNextLevel(xp),
    topicsCompleted,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  topic: "",
  currentTopic: "",
  themeColor: "cyan",

  islands: [],
  finalBoss: null,

  activeIslandIndex: 0,
  activeZoneIndex: 0,

  isGenerating: false,
  isInWorldMap: true,
  isInBossFight: false,
  isDefeated: false,
  isInRecoveryMode: false,
  isMuted: false,

  xp: 0,
  level: 1,
  health: INITIAL_HEALTH,
  maxHealth: INITIAL_HEALTH,
  damage: INITIAL_DAMAGE,
  topicsCompleted: 0,
  playerStats: buildPlayerStats(0, INITIAL_HEALTH),

  completedZoneIds: [],
  causeOfDefeat: null,

  startGame: (game) => {
    set({
      topic: game.topic,
      currentTopic: game.topic,
      themeColor: (game.themeColor ?? "cyan") as ThemeColor,

      islands: game.islands,
      finalBoss: game.finalBoss,

      activeIslandIndex: 0,
      activeZoneIndex: 0,

      isGenerating: false,
      isInWorldMap: true,
      isInBossFight: false,
      isDefeated: false,
      isInRecoveryMode: false,

      xp: 0,
      level: 1,
      health: INITIAL_HEALTH,
      maxHealth: INITIAL_HEALTH,
      damage: INITIAL_DAMAGE,
      topicsCompleted: 0,
      playerStats: buildPlayerStats(0, INITIAL_HEALTH),

      completedZoneIds: [],
      causeOfDefeat: null,
    });
  },

  setGameData: (game, topic, themeColor, resetStats = true) => {
    const resolvedGame: GameData = {
      ...game,
      topic: topic ?? game.topic,
      themeColor: (themeColor ?? game.themeColor ?? "cyan") as ThemeColor,
    };

    if (resetStats) {
      get().startGame(resolvedGame);
      return;
    }

    set({
      topic: resolvedGame.topic,
      currentTopic: resolvedGame.topic,
      themeColor: resolvedGame.themeColor,
      islands: resolvedGame.islands,
      finalBoss: resolvedGame.finalBoss,
      isGenerating: false,
      isInWorldMap: true,
      isInBossFight: false,
      isInRecoveryMode: false,
    });
  },

  setGenerating: (value) => {
    set({ isGenerating: value });
  },

  enterZone: (islandIndex, zoneIndex) => {
    const { islands, activeIslandIndex, completedZoneIds } = get();

    const island = islands[islandIndex];
    if (!island) return;

    const zone = island.zones[zoneIndex];
    if (!zone) return;

    const isIslandLocked = islandIndex > activeIslandIndex;

    const previousZone = island.zones[zoneIndex - 1];
    const isFirstZone = zoneIndex === 0;
    const isPreviousZoneCompleted =
      !previousZone || completedZoneIds.includes(previousZone.id);

    const isZoneLocked =
      isIslandLocked || (!isFirstZone && !isPreviousZoneCompleted);

    if (isZoneLocked) return;

    set({
      activeIslandIndex: islandIndex,
      activeZoneIndex: zoneIndex,
      isInWorldMap: false,
      isInBossFight: false,
      isInRecoveryMode: false,
    });
  },

  enterFinalBoss: () => {
    const { islands, completedZoneIds } = get();

    const canEnterFinalBoss = islands.every((island) =>
      island.zones.every((zone) => completedZoneIds.includes(zone.id))
    );

    if (!canEnterFinalBoss) return;

    set({
      isInWorldMap: false,
      isInBossFight: true,
      isInRecoveryMode: false,
    });
  },

  completeZone: () => {
    const {
      islands,
      activeIslandIndex,
      activeZoneIndex,
      completedZoneIds,
      xp,
      health,
      maxHealth,
      damage,
      topicsCompleted,
    } = get();

    const currentIsland = islands[activeIslandIndex];
    const currentZone = currentIsland?.zones[activeZoneIndex];

    if (!currentIsland || !currentZone) {
      set({
        isInWorldMap: true,
        isInBossFight: false,
      });
      return;
    }

    const nextCompletedZoneIds = Array.from(
      new Set([...completedZoneIds, currentZone.id])
    );

    const nextXp = xp + (currentZone.xpReward ?? 100);
    const nextLevel = calculateLevel(nextXp);

    const isLastZone = activeZoneIndex >= currentIsland.zones.length - 1;
    const isLastIsland = activeIslandIndex >= islands.length - 1;

    const nextTopicsCompleted =
      isLastZone && isLastIsland ? topicsCompleted + 1 : topicsCompleted;

    let nextIslandIndex = activeIslandIndex;
    let nextZoneIndex = activeZoneIndex;

    if (isLastZone && !isLastIsland) {
      nextIslandIndex = activeIslandIndex + 1;
      nextZoneIndex = 0;
    } else if (!isLastZone) {
      nextZoneIndex = activeZoneIndex + 1;
    }

    set({
      completedZoneIds: nextCompletedZoneIds,

      xp: nextXp,
      level: nextLevel,
      topicsCompleted: nextTopicsCompleted,
      playerStats: buildPlayerStats(
        nextXp,
        health,
        maxHealth,
        damage,
        nextTopicsCompleted
      ),

      activeIslandIndex: nextIslandIndex,
      activeZoneIndex: nextZoneIndex,

      isInWorldMap: true,
      isInBossFight: false,
      isInRecoveryMode: false,
    });
  },

  addXP: (amount) => {
    const { xp, health, maxHealth, damage, topicsCompleted } = get();

    const nextXp = xp + amount;
    const nextLevel = calculateLevel(nextXp);

    set({
      xp: nextXp,
      level: nextLevel,
      playerStats: buildPlayerStats(
        nextXp,
        health,
        maxHealth,
        damage,
        topicsCompleted
      ),
    });
  },

  takeDamage: (amount, cause = "Overwhelming Concepts") => {
    const { xp, health, maxHealth, damage, topicsCompleted } = get();

    const nextHealth = Math.max(0, health - amount);
    const defeated = nextHealth <= 0;

    set({
      health: nextHealth,
      isDefeated: defeated,
      causeOfDefeat: defeated ? cause : null,
      playerStats: buildPlayerStats(
        xp,
        nextHealth,
        maxHealth,
        damage,
        topicsCompleted
      ),
    });
  },

  registerFail: (cause = "Wrong Answer") => {
    get().takeDamage(15, cause);
  },

  healPlayer: (amount) => {
    const { xp, health, maxHealth, damage, topicsCompleted } = get();

    const nextHealth = Math.min(maxHealth, health + amount);

    set({
      health: nextHealth,
      playerStats: buildPlayerStats(
        xp,
        nextHealth,
        maxHealth,
        damage,
        topicsCompleted
      ),
    });
  },

  triggerDefeat: (cause = "Overwhelming Concepts") => {
    const { xp, maxHealth, damage, topicsCompleted } = get();

    set({
      health: 0,
      isDefeated: true,
      causeOfDefeat: cause,
      playerStats: buildPlayerStats(
        xp,
        0,
        maxHealth,
        damage,
        topicsCompleted
      ),
    });
  },

  retryFromDefeat: () => {
    const { xp, maxHealth, damage, topicsCompleted } = get();

    set({
      health: maxHealth,
      isDefeated: false,
      isInRecoveryMode: true,
      isInWorldMap: false,
      isInBossFight: false,
      causeOfDefeat: null,
      playerStats: buildPlayerStats(
        xp,
        maxHealth,
        maxHealth,
        damage,
        topicsCompleted
      ),
    });
  },

  enterRecoveryMode: () => {
    set({
      isInRecoveryMode: true,
      isInWorldMap: false,
      isInBossFight: false,
    });
  },

  exitRecoveryMode: () => {
    const { xp, maxHealth, damage, topicsCompleted } = get();

    set({
      isInRecoveryMode: false,
      isInWorldMap: true,
      health: maxHealth,
      isDefeated: false,
      causeOfDefeat: null,
      playerStats: buildPlayerStats(
        xp,
        maxHealth,
        maxHealth,
        damage,
        topicsCompleted
      ),
    });
  },

  finishRecovery: () => {
    get().exitRecoveryMode();
  },

  toggleMute: () => {
    set((state) => ({
      isMuted: !state.isMuted,
    }));
  },

  resetGame: () => {
    set({
      topic: "",
      currentTopic: "",
      themeColor: "cyan",

      islands: [],
      finalBoss: null,

      activeIslandIndex: 0,
      activeZoneIndex: 0,

      isGenerating: false,
      isInWorldMap: true,
      isInBossFight: false,
      isDefeated: false,
      isInRecoveryMode: false,
      isMuted: false,

      xp: 0,
      level: 1,
      health: INITIAL_HEALTH,
      maxHealth: INITIAL_HEALTH,
      damage: INITIAL_DAMAGE,
      topicsCompleted: 0,
      playerStats: buildPlayerStats(0, INITIAL_HEALTH),

      completedZoneIds: [],
      causeOfDefeat: null,
    });
  },
}));