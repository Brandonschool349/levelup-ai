export function buildPrompt() {
    return `
You are an expert adaptive learning game engine.

Your task is to generate ONLY valid JSON.

Generate a learning roadmap as a JSON object.

RULES:

- EXACTLY 3 islands
- EACH island must have EXACTLY 3 zones
- difficulty must increase
- include quizzes, flashcards, sequence or memory
- include xpReward
- include recoveryContent
- include a finalBoss

The response MUST be valid JSON.
DO NOT wrap in markdown.
DO NOT explain anything.

Use this TypeScript shape:

{
  "topic": "React",
  "themeColor": "cyan",
  "islands": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "theme": "beginner",
      "zones": []
    }
  ],
  "finalBoss": {}
}
`;
}