import { validateGameData } from "@/lib/validate-game";
import { fallbackGame } from "@/lib/fallback-game";
import { buildPrompt } from "@/lib/prompt";
import { REACT_GOLDEN_PATH } from "@/lib/golden-path";
import { GoogleGenAI } from "@google/genai";

function normalizeGeminiGameData(data: any, topic: string) {
    const safeTopic = topic || "Learning";

    const game = {
        ...data,
        topic: data?.topic || safeTopic,
        themeColor: data?.themeColor || "cyan",
        islands: Array.isArray(data?.islands) ? data.islands : [],
    };

    game.islands = game.islands.map((island: any, islandIndex: number) => ({
        id: island?.id || `island-${islandIndex + 1}`,
        title: island?.title || `${safeTopic} Island ${islandIndex + 1}`,
        description:
            island?.description ||
            `Explore important concepts about ${safeTopic}.`,
        theme: island?.theme || "beginner",
        zones: Array.isArray(island?.zones)
            ? island.zones.map((zone: any, zoneIndex: number) => {
                const rawType = String(zone?.type || "quiz").toLowerCase();

                const safeType =
                    rawType === "flashcard" || rawType === "boss"
                        ? rawType
                        : "quiz";

                const baseZone = {
                    ...zone,
                    id:
                        zone?.id ||
                        `zone-${islandIndex + 1}-${zoneIndex + 1}`,
                    title:
                        zone?.title ||
                        `${safeTopic} Challenge ${zoneIndex + 1}`,
                    description:
                        zone?.description ||
                        `Practice your knowledge about ${safeTopic}.`,
                    type: safeType,
                    difficulty: Number(zone?.difficulty || 1),
                    xpReward: Number(zone?.xpReward || 100),
                };

                if (safeType === "flashcard") {
                    return {
                        ...baseZone,
                        cards: Array.isArray(zone?.cards)
                            ? zone.cards
                            : [
                                {
                                    id: `card-${islandIndex + 1}-${zoneIndex + 1}`,
                                    front: `What is ${safeTopic}?`,
                                    back: `${safeTopic} is the topic you are learning in this generated path.`,
                                },
                            ],
                    };
                }

                return {
                    ...baseZone,
                    questions: Array.isArray(zone?.questions)
                        ? zone.questions.map((question: any, qIndex: number) => {
                            const answers = Array.isArray(question?.answers)
                                ? question.answers
                                : Array.isArray(question?.options)
                                    ? question.options
                                    : [
                                        `A key concept about ${safeTopic}`,
                                        `An unrelated idea`,
                                        `A random fact`,
                                        `None of the above`,
                                    ];

                            return {
                                id:
                                    question?.id ||
                                    `q-${islandIndex + 1}-${zoneIndex + 1}-${qIndex + 1}`,
                                question:
                                    question?.question ||
                                    `Which option best relates to ${safeTopic}?`,
                                answers,
                                correct:
                                    typeof question?.correct === "number"
                                        ? question.correct
                                        : typeof question?.correctAnswerIndex ===
                                            "number"
                                            ? question.correctAnswerIndex + 1
                                            : 1,
                                explanation:
                                    question?.explanation ||
                                    `This answer connects directly to ${safeTopic}.`,
                            };
                        })
                        : [
                            {
                                id: `q-${islandIndex + 1}-${zoneIndex + 1}-1`,
                                question: `What is one important idea about ${safeTopic}?`,
                                answers: [
                                    `A key concept about ${safeTopic}`,
                                    `Something unrelated to ${safeTopic}`,
                                    `A random option`,
                                    `None of the above`,
                                ],
                                correct: 1,
                                explanation: `The correct answer is related to ${safeTopic}.`,
                            },
                        ],
                };
            })
            : [],
    }));

    return game;
}

export async function POST(req: Request) {
    let prompt = "Learning";

    try {
        const body = await req.json();

        prompt = String(body.prompt || "").trim();

        const normalizedPrompt = prompt.toLowerCase();

        if (!prompt) {
            return Response.json(validateGameData(fallbackGame("Learning")));
        }

        if (normalizedPrompt.includes("react")) {
            console.log("Using React Golden Path");
            return Response.json(validateGameData(REACT_GOLDEN_PATH));
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("Missing GEMINI_API_KEY");
            return Response.json(validateGameData(fallbackGame(prompt)));
        }

        console.log("GEMINI KEY PREFIX:", apiKey.slice(0, 8));

        const ai = new GoogleGenAI({ apiKey });

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `
${buildPrompt()}

Generate a learning game for this topic:
${prompt}

STRICT RULES:
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap the response in code fences.
- Allowed zone types are ONLY: "quiz", "flashcard", "boss".
- Never use "sequence", "lesson", "text", "challenge", "activity", or any other type.
- Use short strings.
- Generate exactly 3 islands.
- Each island must have 2 or 3 zones.
- Every quiz or boss zone must include questions.
- Every flashcard zone must include cards.
`,
                config: {
                    responseMimeType: "application/json",
                    temperature: 0.1,
                    maxOutputTokens: 8192,
                },
            });

            const raw = response.text?.trim();

            if (!raw) {
                console.log("EMPTY GEMINI RESPONSE");
                return Response.json(validateGameData(fallbackGame(prompt)));
            }

            try {
                const cleaned = raw
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                const parsed = JSON.parse(cleaned);
                const normalized = normalizeGeminiGameData(parsed, prompt);
                const validated = validateGameData(normalized);

                console.log(
                    "VALIDATED ISLANDS:",
                    validated.islands.map((i) => ({
                        title: i.title,
                        zones: i.zones.length,
                    }))
                );

                return Response.json(validated);
            } catch (parseOrValidationError) {
                console.log("BROKEN GEMINI JSON LENGTH:", raw.length);
                console.log("BROKEN GEMINI JSON PREVIEW:", raw.slice(0, 1500));
                console.error(
                    "PARSE OR VALIDATION FAILED:",
                    parseOrValidationError
                );

                return Response.json(validateGameData(fallbackGame(prompt)));
            }
        } catch (geminiError) {
            console.error("GEMINI FAILED -> USING FALLBACK:", geminiError);

            return Response.json(validateGameData(fallbackGame(prompt)));
        }
    } catch (err) {
        console.error("generate-learning-path error:", err);

        return Response.json(validateGameData(fallbackGame(prompt)));
    }
}