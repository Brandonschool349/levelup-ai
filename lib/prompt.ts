export function buildPrompt() {
    return `
Return ONLY valid compact JSON. No markdown. No explanation.

Create a game learning roadmap for the user's topic.

Hard rules:
- exactly 3 islands
- exactly 3 zones per island
- zone pattern per island: quiz, flashcard, sequence
- content must be specific to the topic
- short text only
- no long explanations
- no null
- no trailing commas

Quiz:
- exactly 1 question per quiz zone
- exactly 4 answers
- use "answers"
- "correct" is 1 to 4

Flashcard:
- exactly 2 cards

Sequence:
- exactly 3 items

Final boss:
- exactly 2 challenges

JSON shape:
{
  "topic": "string",
  "themeColor": "cyan",
  "islands": [
    {
      "id": "island-1",
      "title": "string",
      "description": "string",
      "theme": "beginner",
      "zones": [
        {
          "id": "zone-1-1",
          "title": "string",
          "description": "string",
          "type": "quiz",
          "difficulty": 1,
          "xpReward": 100,
          "recoveryContent": {
            "simplifiedExplanation": "string",
            "keyTakeaway": "string",
            "miniFlashcards": [
              { "front": "string", "back": "string" }
            ]
          },
          "questions": [
            {
              "id": "q1",
              "question": "string",
              "answers": ["string", "string", "string", "string"],
              "correct": 1,
              "explanation": "string"
            }
          ]
        },
        {
          "id": "zone-1-2",
          "title": "string",
          "description": "string",
          "type": "flashcard",
          "difficulty": 1,
          "xpReward": 100,
          "cards": [
            { "id": "card-1", "front": "string", "back": "string" },
            { "id": "card-2", "front": "string", "back": "string" }
          ]
        },
        {
          "id": "zone-1-3",
          "title": "string",
          "description": "string",
          "type": "sequence",
          "difficulty": 1,
          "xpReward": 100,
          "items": [
            { "id": "item-1", "label": "string", "order": 1 },
            { "id": "item-2", "label": "string", "order": 2 },
            { "id": "item-3", "label": "string", "order": 3 }
          ]
        }
      ]
    }
  ],
  "finalBoss": {
    "id": "final-boss",
    "title": "Final Boss",
    "description": "string",
    "type": "boss",
    "difficulty": 10,
    "bossName": "string",
    "maxHealth": 500,
    "timeLimitSeconds": 90,
    "xpReward": 1000,
    "weakness": "Knowledge",
    "mechanicType": "timed-quiz",
    "challenges": [
      {
        "id": "boss-q1",
        "question": "string",
        "answers": ["string", "string", "string", "string"],
        "correct": 1,
        "explanation": "string"
      }
    ]
  }
}
`;
}