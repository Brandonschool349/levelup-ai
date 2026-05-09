import { GameData } from "./types";

export const REACT_GOLDEN_PATH: GameData = {
    topic: "React",
    themeColor: "cyan",

    islands: [
        {
            id: "island-1",
            title: "React Basics",
            description: "Learn JSX and Components",
            theme: "beginner",

            zones: [
                {
                    id: "jsx-zone",
                    title: "JSX Basics",
                    description: "Learn JSX syntax",
                    type: "flashcard",
                    difficulty: 1,
                    xpReward: 100,

                    cards: [
                        {
                            id: "card-1",
                            front: "What is JSX?",
                            back:
                                "JSX lets you write HTML-like syntax inside JavaScript.",
                        },
                    ],
                },

                {
                    id: "components-zone",
                    title: "Components",
                    description: "Reusable UI blocks",
                    type: "quiz",
                    difficulty: 2,
                    xpReward: 150,

                    questions: [
                        {
                            id: "q1",
                            question:
                                "What are React components?",
                            options: [
                                "Reusable UI blocks",
                                "CSS files",
                                "Databases",
                                "Functions only",
                            ],
                            correctAnswerIndex: 0,
                            explanation:
                                "Components are reusable UI pieces in React.",
                        },
                    ],
                },

                {
                    id: "hooks-zone",
                    title: "Hooks",
                    description: "Managing state",
                    type: "boss",
                    difficulty: 3,
                    xpReward: 250,

                    bossName: "Hook Guardian",
                    maxHealth: 300,
                    timeLimitSeconds: 60,
                    weakness: "State",

                    mechanicType: "timed-quiz",

                    challenges: [
                        {
                            id: "bq1",
                            question:
                                "Which hook manages state?",
                            options: [
                                "useRef",
                                "useState",
                                "useFetch",
                                "useHTML",
                            ],
                            correctAnswerIndex: 1,
                            explanation:
                                "useState is React's state hook.",
                        },
                    ],
                },
            ],
        },

        {
            id: "island-2",
            title: "State Management",
            description: "Props and State",
            theme: "intermediate",

            zones: [
                {
                    id: "props-zone",
                    title: "Props",
                    description: "Passing data",
                    type: "flashcard",
                    difficulty: 4,
                    xpReward: 200,

                    cards: [
                        {
                            id: "card-2",
                            front: "What are Props?",
                            back:
                                "Props pass data between components.",
                        },
                    ],
                },

                {
                    id: "state-zone",
                    title: "State",
                    description: "Dynamic UI",
                    type: "quiz",
                    difficulty: 5,
                    xpReward: 250,

                    questions: [
                        {
                            id: "q2",
                            question:
                                "What hook changes UI dynamically?",
                            options: [
                                "useState",
                                "useMap",
                                "useRoute",
                                "useNode",
                            ],
                            correctAnswerIndex: 0,
                            explanation:
                                "useState updates component state.",
                        },
                    ],
                },

                {
                    id: "effects-zone",
                    title: "Effects",
                    description: "Side effects",
                    type: "boss",
                    difficulty: 6,
                    xpReward: 350,

                    bossName: "Effect Beast",
                    maxHealth: 450,
                    timeLimitSeconds: 80,
                    weakness: "Dependencies",

                    mechanicType: "timed-quiz",

                    challenges: [
                        {
                            id: "bq2",
                            question:
                                "Which hook handles side effects?",
                            options: [
                                "useCSS",
                                "useState",
                                "useEffect",
                                "useAPI",
                            ],
                            correctAnswerIndex: 2,
                            explanation:
                                "useEffect handles side effects.",
                        },
                    ],
                },
            ],
        },

        {
            id: "island-3",
            title: "Advanced React",
            description: "Optimization",
            theme: "advanced",

            zones: [
                {
                    id: "memo-zone",
                    title: "Memo",
                    description: "Prevent rerenders",
                    type: "flashcard",
                    difficulty: 7,
                    xpReward: 300,

                    cards: [
                        {
                            id: "card-3",
                            front: "What does React.memo do?",
                            back:
                                "Prevents unnecessary rerenders.",
                        },
                    ],
                },

                {
                    id: "context-zone",
                    title: "Context API",
                    description: "Global State",
                    type: "quiz",
                    difficulty: 8,
                    xpReward: 350,

                    questions: [
                        {
                            id: "q3",
                            question:
                                "What problem does Context API solve?",
                            options: [
                                "Global State",
                                "Routing",
                                "Database",
                                "CSS",
                            ],
                            correctAnswerIndex: 0,
                            explanation:
                                "Context avoids prop drilling.",
                        },
                    ],
                },

                {
                    id: "optimization-zone",
                    title: "Optimization",
                    description: "Performance",
                    type: "boss",
                    difficulty: 9,
                    xpReward: 500,

                    bossName: "Optimization Dragon",
                    maxHealth: 600,
                    timeLimitSeconds: 100,
                    weakness: "Memoization",

                    mechanicType: "timed-quiz",

                    challenges: [
                        {
                            id: "bq3",
                            question:
                                "Which hook memoizes values?",
                            options: [
                                "useState",
                                "useMemo",
                                "useHTML",
                                "useStorage",
                            ],
                            correctAnswerIndex: 1,
                            explanation:
                                "useMemo memoizes values.",
                        },
                    ],
                },
            ],
        },
    ],

    finalBoss: {
        id: "final-react-boss",
        title: "React Master Boss",
        description: "Final React Challenge",
        type: "boss",
        difficulty: 10,
        xpReward: 1000,

        bossName: "React Overlord",
        maxHealth: 1000,
        timeLimitSeconds: 120,
        weakness: "Components",

        mechanicType: "timed-quiz",

        challenges: [
            {
                id: "final-q",
                question:
                    "What is React mainly used for?",
                options: [
                    "Backend APIs",
                    "Building User Interfaces",
                    "Databases",
                    "Operating Systems",
                ],
                correctAnswerIndex: 1,
                explanation:
                    "React is mainly for UI.",
            },
        ],
    },
};