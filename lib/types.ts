

export const GOLDEN_PATH: GameData = {
  topic: "React",
  themeColor: "cyan",

  islands: [
    {
      id: "island-1",
      title: "React Foundations",
      description: "Learn JSX and Components",
      theme: "beginner",
      zones: [
        {
          id: "zone-1",
          title: "JSX Basics",
          description: "Learn JSX",
          type: "quiz",
          difficulty: 1,
          xpReward: 100,
          questions: [
            {
              id: "q1",
              question: "What does JSX stand for?",
              options: [
                "Java Syntax XML",
                "JavaScript XML",
                "JSON XML",
                "Java Extended"
              ],
              correctAnswerIndex: 1,
              explanation: "JSX means JavaScript XML."
            }
          ]
        },
        {
          id: "zone-2",
          title: "Props",
          description: "Passing data",
          type: "flashcard",
          difficulty: 2,
          cards: [
            {
              id: "f1",
              front: "What are props?",
              back: "Arguments passed to components."
            }
          ]
        },
        {
          id: "zone-3",
          title: "State",
          description: "Dynamic values",
          type: "quiz",
          difficulty: 3,
          xpReward: 150,
          questions: [
            {
              id: "q2",
              question: "Which hook stores state?",
              options: [
                "useEffect",
                "useRef",
                "useState",
                "useMemo"
              ],
              correctAnswerIndex: 2,
              explanation: "useState stores component state."
            }
          ]
        }
      ]
    },

    {
      id: "island-2",
      title: "Hooks Temple",
      description: "Master hooks",
      theme: "intermediate",
      zones: [
        {
          id: "zone-4",
          title: "useEffect",
          description: "Effects",
          type: "quiz",
          difficulty: 4,
          xpReward: 200,
          questions: [
            {
              id: "q3",
              question: "What does [] mean in useEffect?",
              options: [
                "Run always",
                "Run once",
                "Never runs",
                "Error"
              ],
              correctAnswerIndex: 1,
              explanation: "[] runs once on mount."
            }
          ]
        },
        {
          id: "zone-5",
          title: "Custom Hooks",
          description: "Reusable logic",
          type: "flashcard",
          difficulty: 5,
          cards: [
            {
              id: "f2",
              front: "Custom hooks start with?",
              back: "'use'"
            }
          ]
        },
        {
          id: "zone-6",
          title: "Dependencies",
          description: "Hook control",
          type: "sequence",
          difficulty: 6,
          xpReward: 250,
          items: [
            {
              id: "s1",
              label: "Render",
              order: 1
            },
            {
              id: "s2",
              label: "Effect Runs",
              order: 2
            }
          ]
        }
      ]
    },

    {
      id: "island-3",
      title: "React Mastery",
      description: "Advanced concepts",
      theme: "advanced",
      zones: [
        {
          id: "zone-7",
          title: "Performance",
          description: "Optimization",
          type: "quiz",
          difficulty: 7,
          xpReward: 300,
          questions: [
            {
              id: "q4",
              question: "Which hook memoizes values?",
              options: [
                "useCallback",
                "useMemo",
                "useState",
                "useEffect"
              ],
              correctAnswerIndex: 1,
              explanation: "useMemo memoizes values."
            }
          ]
        },
        {
          id: "zone-8",
          title: "Context API",
          description: "Global state",
          type: "flashcard",
          difficulty: 8,
          cards: [
            {
              id: "f3",
              front: "Context API purpose?",
              back: "Avoid prop drilling."
            }
          ]
        },
        {
          id: "zone-9",
          title: "Suspense",
          description: "Loading UI",
          type: "quiz",
          difficulty: 9,
          xpReward: 350,
          questions: [
            {
              id: "q5",
              question: "Suspense is used for?",
              options: [
                "Animations",
                "Loading fallback",
                "CSS",
                "Routing"
              ],
              correctAnswerIndex: 1,
              explanation: "Suspense handles loading fallback UI."
            }
          ]
        }
      ]
    }
  ],

  finalBoss: {
    id: "boss-1",
    title: "The React Overlord",
    description: "Final Challenge",
    type: "boss",
    difficulty: 10,
    bossName: "State Corruptor",
    maxHealth: 1000,
    timeLimitSeconds: 120,
    xpReward: 1000,
    weakness: "Immutability",
    mechanicType: "timed-quiz",

    challenges: [
      {
        id: "b1",
        question: "Why avoid mutating state?",
        options: [
          "Too slow",
          "React won't rerender",
          "Syntax error",
          "Memory leak"
        ],
        correctAnswerIndex: 1,
        explanation: "React tracks object changes."
      }
    ]
  }
};

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
