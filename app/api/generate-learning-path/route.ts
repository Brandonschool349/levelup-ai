import { validateGameData } from "@/lib/validate-game";
import { fallbackGame } from "@/lib/fallback-game";
import { buildPrompt } from "@/lib/prompt";
import { REACT_GOLDEN_PATH } from "@/lib/golden-path";
import Groq from "groq-sdk";

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

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            console.error("Missing GROQ_API_KEY");
            return Response.json(validateGameData(fallbackGame(prompt)));
        }

        console.log("GROQ KEY PREFIX:", apiKey.slice(0, 8));

        const groq = new Groq({
            apiKey,
        });

        try {
            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.1,
                max_tokens: 2500,
                response_format: {
                    type: "json_object",
                },
                messages: [
                    {
                        role: "system",
                        content: buildPrompt(),
                    },
                    {
                        role: "user",
                        content: `Generate a learning game for this topic: ${prompt}`,
                    },
                ],
            });

            const raw = completion.choices?.[0]?.message?.content?.trim();

            if (!raw) {
                console.log("EMPTY GROQ RESPONSE");
                return Response.json(validateGameData(fallbackGame(prompt)));
            }

            try {
                const parsed = JSON.parse(raw);
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
                console.log("BROKEN JSON LENGTH:", raw.length);
                console.log("BROKEN JSON PREVIEW:", raw.slice(0, 1500));

                return Response.json(validateGameData(fallbackGame(prompt)));
            }
        } catch (groqError) {
            console.error("GROQ FAILED -> USING FALLBACK:", groqError);

            return Response.json(validateGameData(fallbackGame(prompt)));
        }
    } catch (err) {
        console.error("generate-learning-path error:", err);

        return Response.json(validateGameData(fallbackGame(prompt)));
    }
}