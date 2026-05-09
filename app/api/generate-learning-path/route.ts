import { validateGameData } from "@/lib/validate-game";
import { fallbackGame } from "@/lib/fallback-game";
import { buildPrompt } from "@/lib/prompt";
import { REACT_GOLDEN_PATH } from "@/lib/golden-path";
import { GoogleGenAI } from "@google/genai";

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

Return ONLY valid JSON.
`,
                config: {
                    responseMimeType: "application/json",
                    temperature: 0.1,
                    maxOutputTokens: 1200,
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
                const validated = validateGameData(parsed);

                console.log(
                    "VALIDATED ISLANDS:",
                    validated.islands.map((i) => ({
                        title: i.title,
                        zones: i.zones.length,
                    }))
                );

                return Response.json(validated);
            } catch {
                console.log("BROKEN GEMINI JSON LENGTH:", raw.length);
                console.log("BROKEN GEMINI JSON PREVIEW:", raw.slice(0, 1500));

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