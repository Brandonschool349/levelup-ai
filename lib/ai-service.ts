import { GameData, GameIsland, ThemeColor, BossZone } from "./types";

function cleanTopic(prompt: string): string {
  const lowercase = prompt.toLowerCase();
  const fillerPhrases = [
    "i want to learn about", "teach me about", "teach me", "tell me about",
    "how to learn", "what is", "can you teach me", "i need to know", "i want to master"
  ];
  let cleaned = lowercase;
  for (const phrase of fillerPhrases) {
    if (cleaned.startsWith(phrase)) {
      cleaned = cleaned.replace(phrase, "").trim();
    }
  }
  return cleaned.replace(/\b\w/g, l => l.toUpperCase()) || "Mystery Topic";
}

function getThemeColorForTopic(topic: string): ThemeColor {
  const hash = topic.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors: ThemeColor[] = ["cyan", "purple", "emerald", "rose", "amber"];
  return colors[hash % colors.length];
}

import { fallbackGame } from "./fallback-game";

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
