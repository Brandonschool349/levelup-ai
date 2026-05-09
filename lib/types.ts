export type ZoneType = "quiz" | "flashcard" | "sequence" | "memory" | "boss";

export interface RecoveryContent {
  simplifiedExplanation: string;
  keyTakeaway: string;
  miniFlashcards: { front: string; back: string }[];
}

export interface BaseZone {
  id: string;
  title: string;
  description: string;
  type: ZoneType;
  difficulty: number;
  xpReward?: number;
  recoveryContent?: RecoveryContent;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizZone extends BaseZone {
  type: "quiz";
  questions: QuizQuestion[];
}

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardZone extends BaseZone {
  type: "flashcard";
  cards: FlashcardItem[];
}

export interface SequenceItem {
  id: string;
  label: string;
  order: number;
}

export interface SequenceZone extends BaseZone {
  type: "sequence";
  items: SequenceItem[];
}

export interface MemoryPair {
  id: string;
  concept: string;
  definition: string;
}

export interface MemoryZone extends BaseZone {
  type: "memory";
  pairs: MemoryPair[];
}

export type BossMechanicType = "timed-quiz" | "sequence-order" | "memory-match";

export interface BossZone extends BaseZone {
  type: "boss";
  bossName: string;
  maxHealth: number;
  timeLimitSeconds: number;
  xpReward: number;
  weakness: string;
  mechanicType: BossMechanicType;
  challenges?: QuizQuestion[];
  sequenceItems?: SequenceItem[];
  memoryPairs?: MemoryPair[];
}

export type GameZone = QuizZone | FlashcardZone | SequenceZone | MemoryZone | BossZone;

export type WorldTheme = "beginner" | "intermediate" | "advanced";

export interface GameIsland {
  id: string;
  title: string;
  description: string;
  theme: WorldTheme;
  zones: GameZone[]; // Strictly 3 zones
}

export type ThemeColor = "purple" | "cyan" | "emerald" | "rose" | "amber";

export interface GameData {
  topic: string;
  themeColor: ThemeColor;
  islands: GameIsland[]; // Exactly 3 islands
  finalBoss: BossZone;   // 1 final boss
}

export interface PlayerStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  health: number;
  maxHealth: number;
  topicsCompleted: string[];
}
