import { create } from "zustand";
import { GameIsland, BossZone, PlayerStats, ThemeColor } from "@/lib/types";

interface GameState {
  playerStats: PlayerStats;
  currentTopic: string | null;
  themeColor: ThemeColor;
  activeIslandIndex: number;
  activeZoneIndex: number;
  isInBossFight: boolean;
  islands: GameIsland[];
  finalBoss: BossZone | null;

  isGenerating: boolean;
  isMuted: boolean;
  isInWorldMap: boolean;

  // Adaptive Learning & Defeat State
  zoneFails: Record<string, number>;
  isInRecoveryMode: boolean;
  isDefeated: boolean;
  causeOfDefeat: string | null;

  // Actions
  setGenerating: (generating: boolean) => void;
  setGameData: (topic: string, themeColor: ThemeColor, islands: GameIsland[], finalBoss: BossZone) => void;
  enterZone: (zoneIndex: number) => void;
  completeZone: () => void;
  addXP: (amount: number) => void;
  takeDamage: (amount: number, cause?: string) => void;
  heal: (amount: number) => void;
  enterFinalBoss: () => void;

  registerFail: (zoneId: string) => void;
  triggerRecovery: () => void;
  finishRecovery: () => void;

  triggerDefeat: (cause: string) => void;
  retryFromDefeat: () => void;

  resetGame: () => void;
  toggleMute: () => void;
  completeTopic: () => void;
}

const initialPlayerStats: PlayerStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  health: 100,
  maxHealth: 100,
  topicsCompleted: [],
};

export const useGameStore = create<GameState>((set, get) => ({
  playerStats: { ...initialPlayerStats },
  currentTopic: null,
  themeColor: "purple",
  activeIslandIndex: 0,
  activeZoneIndex: -1,
  islands: [],
  finalBoss: null,
  isGenerating: false,
  isInBossFight: false,
  isMuted: false,
  isInWorldMap: true,

  zoneFails: {},
  isInRecoveryMode: false,
  isDefeated: false,
  causeOfDefeat: null,

  setGenerating: (generating) => set({ isGenerating: generating }),

  setGameData: (topic, themeColor, islands, finalBoss) => set({
    currentTopic: topic,
    themeColor,
    islands,
    finalBoss,
    activeIslandIndex: 0,
    activeZoneIndex: -1,
    isInWorldMap: true,
    zoneFails: {},
    isInRecoveryMode: false,
    isDefeated: false,
    causeOfDefeat: null,
    playerStats: {
      ...get().playerStats,
      health: get().playerStats.maxHealth
    },
  }),

  enterZone: (zoneIndex) => set({
    activeZoneIndex: zoneIndex,
    isInWorldMap: false,
    isInBossFight: false,
  }),

  enterFinalBoss: () => set({
    isInBossFight: true,
    isInWorldMap: false,
  }),

  completeZone: () => set((state) => {
    // FINAL BOSS COMPLETED
    if (state.isInBossFight) {
      return {
        isInWorldMap: true,
        isInBossFight: false,
        activeZoneIndex: -1,
      };
    }

    let nextIslandIndex = state.activeIslandIndex;

    // completed last zone of island
    if (
      state.activeZoneIndex === 2 &&
      state.activeIslandIndex < state.islands.length - 1
    ) {
      nextIslandIndex++;
    }

    return {
      activeZoneIndex: -1,
      activeIslandIndex: nextIslandIndex,
      isInWorldMap: true,
    };
  }),



  addXP: (amount) => set((state) => {
    let { xp, level, xpToNextLevel } = state.playerStats;
    xp += amount;
    while (xp >= xpToNextLevel) {
      xp -= xpToNextLevel;
      level += 1;
      xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
    }
    return { playerStats: { ...state.playerStats, xp, level, xpToNextLevel } };
  }),

  takeDamage: (amount, cause = "Unknown Attack") => {
    const state = get();
    const newHealth = Math.max(0, state.playerStats.health - amount);

    if (newHealth <= 0 && !state.isDefeated) {
      set({
        playerStats: { ...state.playerStats, health: 0 },
        isDefeated: true,
        causeOfDefeat: cause
      });
    } else {
      set({ playerStats: { ...state.playerStats, health: newHealth } });
    }
  },

  heal: (amount) => set((state) => ({
    playerStats: {
      ...state.playerStats,
      health: Math.min(state.playerStats.maxHealth, state.playerStats.health + amount),
    }
  })),

  registerFail: (zoneId) => {
    const state = get();
    const currentFails = (state.zoneFails[zoneId] || 0) + 1;

    if (currentFails >= 3) {
      set({
        zoneFails: { ...state.zoneFails, [zoneId]: currentFails },
        isInRecoveryMode: true
      });
    } else {
      set({
        zoneFails: { ...state.zoneFails, [zoneId]: currentFails }
      });
    }
  },

  triggerRecovery: () => set({ isInRecoveryMode: true }),

  finishRecovery: () => set({ isInRecoveryMode: false }),

  triggerDefeat: (cause) => set({ isDefeated: true, causeOfDefeat: cause }),

  retryFromDefeat: () => set((state) => ({
    isDefeated: false,
    causeOfDefeat: null,
    playerStats: {
      ...state.playerStats,
      health: state.playerStats.maxHealth // Fully heal on retry
    }
  })),

  completeTopic: () => set((state) => {
    if (!state.currentTopic || state.playerStats.topicsCompleted.includes(state.currentTopic)) return state;
    return {
      playerStats: {
        ...state.playerStats,
        topicsCompleted: [...state.playerStats.topicsCompleted, state.currentTopic]
      }
    };
  }),

  resetGame: () => set({
    currentTopic: null,
    activeIslandIndex: 0,
    activeZoneIndex: -1,
    islands: [],
    finalBoss: null,
    isGenerating: false,
    isInWorldMap: true,
    isDefeated: false,
    isInRecoveryMode: false
  }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
