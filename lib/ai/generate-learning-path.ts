import { fallbackGame } from "@/lib/fallback-game";

export async function generateLearningPath(prompt: string) {
    try {
        const res = await fetch("/api/generate-learning-path", {
            method: "POST",
            body: JSON.stringify({ prompt }),
        });

        if (!res.ok) throw new Error("API failed");

        return await res.json();
    } catch {
        return fallbackGame(prompt);
    }
}