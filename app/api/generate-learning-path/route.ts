import { validateGameData } from "@/lib/validate-game";
import { fallbackGame } from "@/lib/fallback-game";
import { buildPrompt } from "@/lib/prompt";
import Groq from "groq-sdk";
import { REACT_GOLDEN_PATH } from "@/lib/golden-path";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const prompt =
            body.prompt?.toLowerCase().trim() || "";

        // GOLDEN PATH
        if (prompt.includes("react")) {
            console.log("Using React Golden Path");

            return Response.json(
                validateGameData(
                    REACT_GOLDEN_PATH
                )
            );
        }
        const completion =
            await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.4,
                max_tokens: 4000,

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
                        content: prompt,
                    },
                ],
            });

        const raw =
            completion.choices[0]
                .message.content || "{}";

        let parsed;

        try {
            parsed = JSON.parse(raw);
        } catch {
            console.log("BROKEN JSON");
            console.log(raw);

            return Response.json(
                fallbackGame(prompt)
            );
        }

        const validated =
            validateGameData(parsed);

        return Response.json(validated);

    } catch (err) {
        console.error(err);

        return Response.json(
            fallbackGame("Unknown Topic")
        );
    }
}