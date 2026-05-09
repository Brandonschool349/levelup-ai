import { GameData } from "./types";

export function fallbackGame(topic: string): GameData {
    return {
        topic,
        themeColor: "cyan",

        islands: [
            {
                id: "island-1",
                title: `${topic} Basics`,
                description: "Learn the foundations",
                theme: "beginner",
                zones: [
                    {
                        id: "z1",
                        title: "Introduction",
                        description: "Learn basics",
                        type: "quiz",
                        difficulty: 1,
                        xpReward: 100,

                        recoveryContent: {
                            simplifiedExplanation:
                                `${topic} starts with fundamentals.`,
                            keyTakeaway:
                                "Learn step by step.",
                            miniFlashcards: [
                                {
                                    front: "Foundation",
                                    back: "Core concept"
                                }
                            ]
                        },

                        questions: [
                            {
                                id: "q1",
                                question:
                                    `What is important in ${topic}?`,
                                options: [
                                    "Practice",
                                    "Nothing",
                                    "Luck",
                                    "Skipping"
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    "Practice matters."
                            }
                        ]
                    },

                    {
                        id: "z2",
                        title: "Concepts",
                        description: "Key terms",
                        type: "flashcard",
                        difficulty: 2,
                        cards: [
                            {
                                id: "f1",
                                front: "Core",
                                back: `${topic} basics`
                            }
                        ]
                    },

                    {
                        id: "z3",
                        title: "Sequence",
                        description: "Learning order",
                        type: "sequence",
                        difficulty: 3,
                        xpReward: 200,
                        items: [
                            {
                                id: "s1",
                                label: "Learn",
                                order: 1
                            },
                            {
                                id: "s2",
                                label: "Practice",
                                order: 2
                            }
                        ]
                    }
                ]
            },

            {
                id: "island-2",
                title: `${topic} Intermediate`,
                description: "Go deeper",
                theme: "intermediate",
                zones: []
            },

            {
                id: "island-3",
                title: `${topic} Mastery`,
                description: "Advanced concepts",
                theme: "advanced",
                zones: []
            }
        ],

        finalBoss: {
            id: "boss",
            title: "Final Challenge",
            description: "Beat the topic boss",
            type: "boss",
            difficulty: 10,
            bossName: `${topic} Titan`,
            maxHealth: 500,
            timeLimitSeconds: 120,
            xpReward: 2000,
            weakness: "Knowledge",
            mechanicType: "timed-quiz",
            challenges: []
        }
    };
}