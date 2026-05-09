import { GameData } from "./types";
import { fallbackGame } from "./fallback-game";

function clampIndex(index: number, max: number) {
    if (max <= 0) return 0;
    return Math.max(0, Math.min(index, max - 1));
}

function normalizeOptions(q: any): string[] {
    const rawOptions = q?.options ?? q?.answers ?? q?.choices ?? [];

    if (!Array.isArray(rawOptions) || rawOptions.length === 0) {
        return ["Correct answer", "Wrong answer A", "Wrong answer B", "Wrong answer C"];
    }

    const options = rawOptions
        .map((option: any) => String(option))
        .filter(Boolean)
        .slice(0, 4);

    while (options.length < 4) {
        options.push(`Option ${options.length + 1}`);
    }

    return options;
}

function normalizeCorrectAnswerIndex(q: any, optionsLength: number): number {
    if (typeof q?.correctAnswerIndex === "number") {
        return clampIndex(q.correctAnswerIndex, optionsLength);
    }

    if (typeof q?.correct === "number") {
        return clampIndex(q.correct - 1, optionsLength);
    }

    return 0;
}

function normalizeQuestions(activity: any) {
    const rawQuestions = Array.isArray(activity?.questions)
        ? activity.questions
        : activity?.question
            ? [activity]
            : [];

    return rawQuestions
        .map((q: any, qIdx: number) => {
            const options = normalizeOptions(q);

            return {
                id: q?.id ?? `q-${qIdx + 1}`,
                question: q?.question ?? "What is the correct answer?",
                options,
                correctAnswerIndex: normalizeCorrectAnswerIndex(q, options.length),
                explanation: q?.explanation ?? "This answer reinforces the core concept.",
            };
        })
        .filter(Boolean);
}

function normalizeCards(activity: any) {
    const rawCards = activity?.cards ?? activity?.flashcards ?? activity?.pairs ?? [];

    if (!Array.isArray(rawCards)) return [];

    return rawCards
        .map((card: any, idx: number) => ({
            id: card?.id ?? `card-${idx + 1}`,
            front: card?.front ?? card?.term ?? card?.question ?? `Concept ${idx + 1}`,
            back: card?.back ?? card?.definition ?? card?.answer ?? "Key explanation",
        }))
        .filter((card: any) => card.front && card.back)
        .slice(0, 6);
}

function buildFallbackQuiz(topic: string, islandIdx: number, zoneIdx: number) {
    return {
        id: `fallback-quiz-${islandIdx}-${zoneIdx}`,
        title: "Core Checkpoint",
        description: "Quick knowledge checkpoint",
        type: "quiz" as const,
        difficulty: islandIdx + 1,
        xpReward: 100,
        questions: [
            {
                id: "q-1",
                question: `What is the best way to improve in ${topic}?`,
                options: ["Practice consistently", "Skip the basics", "Guess randomly", "Avoid feedback"],
                correctAnswerIndex: 0,
                explanation: "Consistent practice builds mastery.",
            },
        ],
    };
}

function normalizeActivity(activity: any, zone: any, topic: string, islandIdx: number, zoneIdx: number, activityIdx: number) {
    const type = activity?.type ?? zone?.type ?? "quiz";

    if (type === "quiz") {
        const questions = normalizeQuestions(activity);

        if (questions.length === 0) {
            return buildFallbackQuiz(topic, islandIdx, zoneIdx);
        }

        return {
            id: activity?.id ?? zone?.id ?? `quiz-${islandIdx}-${zoneIdx}-${activityIdx}`,
            title: activity?.title ?? zone?.title ?? "Quiz Challenge",
            description: activity?.description ?? zone?.description ?? "Answer the questions",
            type: "quiz" as const,
            difficulty: activity?.difficulty ?? zone?.difficulty ?? islandIdx + 1,
            xpReward: activity?.xpReward ?? zone?.xpReward ?? 100,
            recoveryContent: activity?.recoveryContent ?? zone?.recoveryContent,
            questions,
        };
    }

    if (type === "flashcard" || type === "memory") {
        const cards = normalizeCards(activity);

        if (cards.length === 0) {
            return {
                id: activity?.id ?? zone?.id ?? `flashcard-${islandIdx}-${zoneIdx}-${activityIdx}`,
                title: activity?.title ?? zone?.title ?? "Memory Chamber",
                description: activity?.description ?? zone?.description ?? "Review key concepts",
                type: "flashcard" as const,
                difficulty: activity?.difficulty ?? zone?.difficulty ?? islandIdx + 1,
                xpReward: activity?.xpReward ?? zone?.xpReward ?? 100,
                cards: [
                    {
                        id: "card-1",
                        front: "Core concept",
                        back: `${topic} improves through step-by-step practice.`,
                    },
                    {
                        id: "card-2",
                        front: "Practice",
                        back: "Applying concepts is better than only reading them.",
                    },
                    {
                        id: "card-3",
                        front: "Progression",
                        back: "Start simple, then move into harder challenges.",
                    },
                    {
                        id: "card-4",
                        front: "Mastery",
                        back: "Mastery means explaining and applying the concept.",
                    },
                ],
            };
        }

        return {
            id: activity?.id ?? zone?.id ?? `flashcard-${islandIdx}-${zoneIdx}-${activityIdx}`,
            title: activity?.title ?? zone?.title ?? "Memory Chamber",
            description: activity?.description ?? zone?.description ?? "Review key concepts",
            type: "flashcard" as const,
            difficulty: activity?.difficulty ?? zone?.difficulty ?? islandIdx + 1,
            xpReward: activity?.xpReward ?? zone?.xpReward ?? 100,
            cards,
        };
    }

    if (type === "sequence") {
        const rawItems = activity?.items ?? activity?.steps ?? [];

        const options = Array.isArray(rawItems)
            ? rawItems
                .map((item: any) => item?.label ?? item?.title ?? item)
                .map(String)
                .filter(Boolean)
                .slice(0, 4)
            : [];

        if (options.length === 0) {
            return buildFallbackQuiz(topic, islandIdx, zoneIdx);
        }

        while (options.length < 4) {
            options.push(`Step ${options.length + 1}`);
        }

        return {
            id: activity?.id ?? zone?.id ?? `sequence-${islandIdx}-${zoneIdx}-${activityIdx}`,
            title: activity?.title ?? zone?.title ?? "Sequence Challenge",
            description: activity?.description ?? zone?.description ?? "Choose the correct learning order",
            type: "quiz" as const,
            difficulty: activity?.difficulty ?? zone?.difficulty ?? islandIdx + 1,
            xpReward: activity?.xpReward ?? zone?.xpReward ?? 100,
            questions: [
                {
                    id: "sequence-q-1",
                    question: "Which step should come first?",
                    options,
                    correctAnswerIndex: 0,
                    explanation: "This checks the correct progression order.",
                },
            ],
        };
    }

    return buildFallbackQuiz(topic, islandIdx, zoneIdx);
}

export function validateGameData(data: any): GameData {
    try {
        const topic = data?.topic ?? "Unknown Topic";

        if (!data || !Array.isArray(data.islands)) {
            throw new Error("Invalid game data structure");
        }

        const themes = ["beginner", "intermediate", "advanced"] as const;

        const islands = data.islands
            .slice(0, 3)
            .map((island: any, islandIdx: number) => {
                const rawZones = Array.isArray(island?.zones)
                    ? island.zones
                    : Array.isArray(island?.activities)
                        ? island.activities
                        : [];

                const normalizedZones = rawZones
                    .flatMap((zone: any, zoneIdx: number) => {
                        const activities = Array.isArray(zone?.activities)
                            ? zone.activities
                            : [zone];

                        return activities
                            .map((activity: any, activityIdx: number) =>
                                normalizeActivity(activity, zone, topic, islandIdx, zoneIdx, activityIdx)
                            )
                            .filter(Boolean);
                    })
                    .filter(Boolean);

                return {
                    id: island?.id ?? `island-${islandIdx + 1}`,
                    title: island?.title ?? `Island ${islandIdx + 1}`,
                    description: island?.description ?? "Complete these learning challenges.",
                    theme: island?.theme ?? themes[islandIdx] ?? "beginner",
                    zones:
                        normalizedZones.length > 0
                            ? normalizedZones
                            : [
                                buildFallbackQuiz(topic, islandIdx, 0),
                                {
                                    id: `fallback-flash-${islandIdx}`,
                                    title: "Memory Chamber",
                                    description: "Review key ideas",
                                    type: "flashcard" as const,
                                    difficulty: islandIdx + 1,
                                    xpReward: 100,
                                    cards: [
                                        {
                                            id: "card-1",
                                            front: "Foundation",
                                            back: `${topic} starts with understanding the basics.`,
                                        },
                                        {
                                            id: "card-2",
                                            front: "Practice",
                                            back: "Skills improve through repeated application.",
                                        },
                                        {
                                            id: "card-3",
                                            front: "Feedback",
                                            back: "Feedback helps you correct mistakes faster.",
                                        },
                                        {
                                            id: "card-4",
                                            front: "Mastery",
                                            back: "Mastery means applying knowledge under pressure.",
                                        },
                                    ],
                                },
                            ],
                };
            })
            .filter(Boolean);

        const bossChallenges =
            Array.isArray(data?.finalBoss?.challenges) && data.finalBoss.challenges.length > 0
                ? data.finalBoss.challenges.map((q: any, idx: number) => {
                    const options = normalizeOptions(q);

                    return {
                        id: q?.id ?? `boss-q-${idx + 1}`,
                        question: q?.question ?? `Final question about ${topic}`,
                        options,
                        correctAnswerIndex: normalizeCorrectAnswerIndex(q, options.length),
                        explanation: q?.explanation ?? "Correct. This proves mastery.",
                    };
                })
                : [
                    {
                        id: "boss-q-1",
                        question: `What is the best way to master ${topic}?`,
                        options: ["Practice consistently", "Skip fundamentals", "Guess randomly", "Avoid challenges"],
                        correctAnswerIndex: 0,
                        explanation: "Consistent practice is the foundation of mastery.",
                    },
                    {
                        id: "boss-q-2",
                        question: `Why are fundamentals important in ${topic}?`,
                        options: ["They support advanced learning", "They are optional", "They slow progress", "They replace practice"],
                        correctAnswerIndex: 0,
                        explanation: "Advanced concepts depend on strong fundamentals.",
                    },
                ];

        const validatedGame: GameData = {
            topic,
            themeColor: data?.themeColor ?? "cyan",
            islands,
            finalBoss: {
                id: data?.finalBoss?.id ?? "final-boss",
                title: data?.finalBoss?.title ?? "Final Boss",
                description: data?.finalBoss?.description ?? "Defeat the final challenge.",
                type: "boss",
                difficulty: data?.finalBoss?.difficulty ?? 10,
                xpReward: data?.finalBoss?.xpReward ?? 1000,
                bossName: data?.finalBoss?.bossName ?? `${topic} Titan`,
                maxHealth: data?.finalBoss?.maxHealth ?? 500,
                timeLimitSeconds: data?.finalBoss?.timeLimitSeconds ?? 120,
                weakness: data?.finalBoss?.weakness ?? "Knowledge",
                mechanicType: data?.finalBoss?.mechanicType ?? "timed-quiz",
                challenges: bossChallenges,
            },
        };

        console.log(
            "VALIDATED ISLANDS:",
            validatedGame.islands.map((island) => ({
                title: island.title,
                zones: island.zones.length,
            }))
        );

        return validatedGame;
    } catch (err) {
        console.error("Validation Error:", err);
        return fallbackGame("Invalid Topic");
    }
}