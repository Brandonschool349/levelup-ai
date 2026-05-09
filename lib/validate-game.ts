import { GameData } from "./types";
import { fallbackGame } from "./fallback-game";

export function validateGameData(
    data: any
): GameData {
    try {
        if (
            !data ||
            !data.topic ||
            !Array.isArray(data.islands)
        ) {
            throw new Error(
                "Invalid structure"
            );
        }

        const themes = [
            "beginner",
            "intermediate",
            "advanced",
        ] as const;

        const islands = data.islands
            .slice(0, 3)
            .map(
                (
                    island: any,
                    islandIdx: number
                ) => ({
                    id:
                        island.id ??
                        `island-${islandIdx + 1}`,

                    title:
                        island.title ??
                        `Island ${islandIdx + 1}`,

                    description:
                        island.description ??
                        "Learn this topic",

                    theme:
                        themes[islandIdx],

                    zones:
                        (
                            island.zones?.flatMap(
                                (
                                    zone: any,
                                    zoneIdx: number
                                ) => {
                                    const activities =
                                        zone.activities ??
                                        [];

                                    return activities.map(
                                        (
                                            activity: any,
                                            activityIdx: number
                                        ) => {
                                            // QUIZ
                                            if (
                                                activity.type ===
                                                "quiz"
                                            ) {
                                                return {
                                                    id:
                                                        activity.id ??
                                                        `quiz-${zoneIdx}-${activityIdx}`,

                                                    title:
                                                        zone.title ??
                                                        "Quiz",

                                                    description:
                                                        activity.description ??
                                                        "",

                                                    type:
                                                        "quiz",

                                                    difficulty:
                                                        islandIdx + 1,

                                                    xpReward:
                                                        activity.xpReward ??
                                                        100,

                                                    questions:
                                                        activity.questions?.map(
                                                            (
                                                                q: any,
                                                                qIdx: number
                                                            ) => ({
                                                                id:
                                                                    `q-${qIdx}`,

                                                                question:
                                                                    q.question ??
                                                                    "Question",

                                                                options:
                                                                    q.answers ??
                                                                    q.options ??
                                                                    [
                                                                        "A",
                                                                        "B",
                                                                        "C",
                                                                        "D",
                                                                    ],

                                                                correctAnswerIndex:
                                                                    q.correct ??
                                                                    q.correctAnswerIndex ??
                                                                    0,

                                                                explanation:
                                                                    q.explanation ??
                                                                    "Good job!",
                                                            })
                                                        ) ?? [],
                                                };
                                            }

                                            // FLASHCARD
                                            if (
                                                activity.type ===
                                                "flashcard"
                                            ) {
                                                return {
                                                    id:
                                                        activity.id ??
                                                        `flash-${zoneIdx}-${activityIdx}`,

                                                    title:
                                                        zone.title ??
                                                        "Flashcards",

                                                    description:
                                                        activity.description ??
                                                        "",

                                                    type:
                                                        "flashcard",

                                                    difficulty:
                                                        islandIdx + 1,

                                                    xpReward:
                                                        activity.xpReward ??
                                                        50,

                                                    cards:
                                                        activity.cards?.map(
                                                            (
                                                                card: any,
                                                                idx: number
                                                            ) => ({
                                                                id:
                                                                    `card-${idx}`,

                                                                front:
                                                                    card.question ??
                                                                    card.front ??
                                                                    "Concept",

                                                                back:
                                                                    card.answer ??
                                                                    card.back ??
                                                                    "Definition",
                                                            })
                                                        ) ?? [],
                                                };
                                            }

                                            // MEMORY
                                            if (
                                                activity.type ===
                                                "memory"
                                            ) {
                                                return {
                                                    id:
                                                        activity.id ??
                                                        `memory-${zoneIdx}`,

                                                    title:
                                                        zone.title,

                                                    description:
                                                        activity.description ??
                                                        "",

                                                    type:
                                                        "flashcard",

                                                    difficulty:
                                                        islandIdx + 1,

                                                    xpReward:
                                                        activity.xpReward ??
                                                        100,

                                                    cards:
                                                        activity.pairs?.map(
                                                            (
                                                                pair: any,
                                                                idx: number
                                                            ) => ({
                                                                id:
                                                                    `pair-${idx}`,

                                                                front:
                                                                    pair.term,

                                                                back:
                                                                    pair.definition,
                                                            })
                                                        ) ?? [],
                                                };
                                            }

                                            // SEQUENCE
                                            if (
                                                activity.type ===
                                                "sequence"
                                            ) {
                                                return {
                                                    id:
                                                        activity.id ??
                                                        `sequence-${zoneIdx}`,

                                                    title:
                                                        zone.title,

                                                    description:
                                                        activity.description ??
                                                        "",

                                                    type:
                                                        "quiz",

                                                    difficulty:
                                                        islandIdx + 1,

                                                    xpReward:
                                                        activity.xpReward ??
                                                        100,

                                                    questions: [
                                                        {
                                                            id:
                                                                "sequence-q",

                                                            question:
                                                                "Which comes first?",

                                                            options:
                                                                activity.steps ??
                                                                [],

                                                            correctAnswerIndex:
                                                                0,

                                                            explanation:
                                                                "Sequence activity",
                                                        },
                                                    ],
                                                };
                                            }

                                            return null;
                                        }
                                    );
                                }
                            ) ?? []
                        ).filter(Boolean),
                })
            );

        return {
            topic:
                data.topic ??
                "Unknown Topic",

            themeColor:
                data.themeColor ??
                "cyan",

            islands,

            finalBoss: {
                id: "final-boss",
                title:
                    "Final Boss",

                description:
                    "Ultimate challenge",

                type: "boss",

                difficulty: 10,

                xpReward: 1000,

                bossName:
                    `${data.topic} Titan`,

                maxHealth: 1000,

                timeLimitSeconds: 120,

                weakness:
                    "Knowledge",

                mechanicType:
                    "timed-quiz",

                challenges: [
                    {
                        id:
                            "boss-1",

                        question:
                            `What is the most important concept in ${data.topic}?`,

                        options: [
                            "Option A",
                            "Option B",
                            "Option C",
                            "Option D",
                        ],

                        correctAnswerIndex: 0,

                        explanation:
                            "Boss defeated!",
                    },
                ],
            },
        };
    } catch (err) {
        console.error(
            "Validation Error:",
            err
        );

        return fallbackGame(
            "Invalid Topic"
        );
    }
}