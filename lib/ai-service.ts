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

const REACT_GOLDEN_PATH: GameData = {
  topic: "React",
  themeColor: "cyan",
  islands: [
    {
      id: "react-island-1",
      title: "The Render Coast",
      description: "Where components are born.",
      theme: "beginner",
      zones: [
        {
          id: "r-i1-z1",
          title: "JSX Foundations",
          description: "Understand the syntax extension.",
          type: "quiz",
          difficulty: 1,
          xpReward: 100,
          recoveryContent: {
            simplifiedExplanation: "JSX is just HTML inside JavaScript. It lets you write UI elements easily.",
            keyTakeaway: "JSX must always return a single parent element.",
            miniFlashcards: [{ front: "JSX", back: "JavaScript XML" }]
          },
          questions: [
            { id: "q1", question: "What does a React component return?", options: ["A string", "JSX", "A database query", "Nothing"], correctAnswerIndex: 1, explanation: "Components return JSX describing the UI." },
            { id: "q2", question: "How do you render a variable in JSX?", options: ["${var}", "{{var}}", "{var}", "[var]"], correctAnswerIndex: 2, explanation: "Curly braces {} are used to embed JavaScript expressions." }
          ]
        },
        {
          id: "r-i1-z2",
          title: "Props Pipeline",
          description: "Passing data down the tree.",
          type: "flashcard",
          difficulty: 2,
          recoveryContent: {
            simplifiedExplanation: "Props are like arguments to a function. They flow from parent to child.",
            keyTakeaway: "Props are read-only.",
            miniFlashcards: [{ front: "Props", back: "Properties passed to components." }]
          },
          cards: [
            { id: "f1", front: "Are props mutable?", back: "No, they are strictly read-only." },
            { id: "f2", front: "How do children receive props?", back: "As an object argument to the component function." }
          ]
        },
        {
          id: "r-i1-z3",
          title: "Component Tree",
          description: "Order the rendering process.",
          type: "sequence",
          difficulty: 3,
          xpReward: 200,
          recoveryContent: {
            simplifiedExplanation: "React renders from top to bottom.",
            keyTakeaway: "A parent renders before its children.",
            miniFlashcards: [{ front: "Render", back: "React calling your component function." }]
          },
          items: [
            { id: "s1", label: "State Changes", order: 1 },
            { id: "s2", label: "React calls Component", order: 2 },
            { id: "s3", label: "JSX returned", order: 3 },
            { id: "s4", label: "DOM Updated", order: 4 }
          ]
        }
      ]
    },
    {
      id: "react-island-2",
      title: "Hook Sanctum",
      description: "The mysterious state management temples.",
      theme: "intermediate",
      zones: [
        {
          id: "r-i2-z1",
          title: "The State Memory",
          description: "Learn React hooks.",
          type: "flashcard",
          difficulty: 4,
          xpReward: 250,
          recoveryContent: {
            simplifiedExplanation:
              "useState gives you a value and a function to update it.",
            keyTakeaway:
              "Calling the update function triggers a re-render.",
            miniFlashcards: [
              {
                front: "useState",
                back: "Adds state to a functional component.",
              },
            ],
          },
          cards: [
            {
              id: "f-state",
              front: "useState",
              back: "Stores component state.",
            },
            {
              id: "f-effect",
              front: "useEffect",
              back: "Runs side effects after render.",
            },
            {
              id: "f-ref",
              front: "useRef",
              back: "Stores mutable values without rerender.",
            },
          ],
        },
        {
          id: "r-i2-z2",
          title: "Effect Dependencies",
          description: "Master the dependency array.",
          type: "quiz",
          difficulty: 5,
          xpReward: 300,
          recoveryContent: {
            simplifiedExplanation: "The array tells React when to re-run the effect.",
            keyTakeaway: "Empty array [] means run only once on mount.",
            miniFlashcards: [{ front: "[]", back: "Mount only" }]
          },
          questions: [
            { id: "q3", question: "What happens if you omit the dependency array in useEffect?", options: ["It runs once", "It runs after every render", "It crashes", "It never runs"], correctAnswerIndex: 1, explanation: "Without an array, it runs after every single render." }
          ]
        },
        {
          id: "r-i2-z3",
          title: "Custom Hooks",
          description: "Extracting logic.",
          type: "flashcard",
          difficulty: 6,
          cards: [
            { id: "f3", front: "What must a custom hook name start with?", back: "The word 'use' (e.g., useFetch)." },
            { id: "f4", front: "Do custom hooks share state?", back: "No, they share stateful LOGIC, not the state itself." }
          ]
        }
      ]
    },
    {
      id: "react-island-3",
      title: "Performance Peaks",
      description: "Optimization and advanced patterns.",
      theme: "advanced",
      zones: [
        {
          id: "r-i3-z1",
          title: "Memoization",
          description: "Stop unnecessary renders.",
          type: "quiz",
          difficulty: 7,
          xpReward: 400,
          questions: [
            { id: "q4", question: "Which hook memoizes a value?", options: ["useMemo", "useCallback", "useRef", "useState"], correctAnswerIndex: 0, explanation: "useMemo caches a calculated value." },
            { id: "q5", question: "Which hook memoizes a function?", options: ["useMemo", "useCallback", "useRef", "useEffect"], correctAnswerIndex: 1, explanation: "useCallback caches a function definition." }
          ]
        },
        {
          id: "r-i3-z2",
          title: "Context API",
          description: "Global state passing.",
          type: "sequence",
          difficulty: 8,
          xpReward: 450,
          items: [
            { id: "s5", label: "createContext()", order: 1 },
            { id: "s6", label: "Wrap in Provider", order: 2 },
            { id: "s7", label: "Pass value prop", order: 3 },
            { id: "s8", label: "useContext()", order: 4 }
          ]
        },
        {
          id: "r-i3-z3",
          title: "Suspense",
          description: "Loading states.",
          type: "flashcard",
          difficulty: 9,
          cards: [
            { id: "f5", front: "What is Suspense used for?", back: "Displaying a fallback UI while waiting for something to load." }
          ]
        }
      ]
    }
  ],
  finalBoss: {
    id: "react-boss",
    title: "The Ultimate Challenge",
    description: "Defeat the State Corruptor.",
    type: "boss",
    difficulty: 10,
    bossName: "The State Corruptor",
    maxHealth: 500,
    timeLimitSeconds: 120,
    xpReward: 2000,
    weakness: "Immutability",
    mechanicType: "timed-quiz",
    challenges: [
      { id: "bq1", question: "Why should you NOT mutate state directly?", options: ["It's too slow", "React won't know it changed and won't re-render", "It causes memory leaks", "It throws an error"], correctAnswerIndex: 1, explanation: "React relies on object identity to detect changes." },
      { id: "bq2", question: "How do you update an object in state?", options: ["state.obj.val = 1", "setState({...state, val: 1})", "setState(state)", "delete state"], correctAnswerIndex: 1, explanation: "Always create a new object (immutability)." },
      { id: "bq3", question: "What is strict mode?", options: ["A tool for highlighting potential problems", "A linter", "A faster renderer", "A build tool"], correctAnswerIndex: 0, explanation: "Strict mode double-invokes components to find bugs." }
    ]
  }
};

export async function generateLearningPath(rawPrompt: string): Promise<GameData> {
  const delay = Math.floor(Math.random() * 2000) + 2500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const topic = cleanTopic(rawPrompt);

  if (topic.toLowerCase().includes("react")) {
    return REACT_GOLDEN_PATH;
  }

  const themeColor = getThemeColorForTopic(topic);

  // Dynamic Generator for non-React topics
  return {
    topic,
    themeColor,
    islands: [
      {
        id: "w1",
        title: `${topic} Origins`,
        description: `Your first steps into the world of ${topic}.`,
        theme: "beginner",
        zones: [
          {
            id: "z1", title: "Basics", description: "Learn the foundation.", type: "quiz", difficulty: 1, xpReward: 100,
            recoveryContent: { simplifiedExplanation: `The basics of ${topic} are simple.`, keyTakeaway: "Start small.", miniFlashcards: [] },
            questions: [{ id: "q1", question: `What is the core of ${topic}?`, options: ["Foundation", "Nothing", "Complexity", "Chaos"], correctAnswerIndex: 0, explanation: "It all starts with the foundation." }]
          },
          { id: "z2", title: "Terms", description: "Vocabulary check.", type: "flashcard", difficulty: 2, cards: [{ id: "f1", front: "Core Term", back: `A word used in ${topic}` }] },
          { id: "z3", title: "Concepts", description: "Match concepts.", type: "memory", difficulty: 3, xpReward: 200, pairs: [{ id: "m1", concept: "Concept 1", definition: "Definition 1" }, { id: "m2", concept: "Concept 2", definition: "Definition 2" }] }
        ]
      },
      {
        id: "w2",
        title: `The Depths of ${topic}`,
        description: `Darker, more complex challenges await.`,
        theme: "intermediate",
        zones: [
          { id: "z4", title: "Application", description: "Apply knowledge.", type: "quiz", difficulty: 4, xpReward: 250, questions: [{ id: "q2", question: `How to apply ${topic}?`, options: ["Carefully", "Don't", "Fast", "Blindly"], correctAnswerIndex: 0, explanation: "Always apply carefully." }] },
          { id: "z5", title: "Process", description: "Order steps.", type: "sequence", difficulty: 5, xpReward: 300, items: [{ id: "s1", label: "Start", order: 1 }, { id: "s2", label: "End", order: 2 }] },
          { id: "z6", title: "Review", description: "Mid-point review.", type: "flashcard", difficulty: 6, cards: [{ id: "f2", front: "Key Pattern", back: "Advanced concept" }] }
        ]
      },
      {
        id: "w3",
        title: `${topic} Ascension`,
        description: `The final frontier.`,
        theme: "advanced",
        zones: [
          { id: "z7", title: "Optimization", description: "Make it better.", type: "quiz", difficulty: 7, xpReward: 400, questions: [{ id: "q3", question: "Best optimization?", options: ["Simplicity", "More code", "Ignore it", "Rewrite"], correctAnswerIndex: 0, explanation: "Simplicity scales." }] },
          { id: "z8", title: "Architecture", description: "Build structures.", type: "memory", difficulty: 8, xpReward: 450, pairs: [{ id: "m3", concept: "Pattern", definition: "Solution" }] },
          { id: "z9", title: "Mastery", description: "Final test before the boss.", type: "sequence", difficulty: 9, xpReward: 500, items: [{ id: "s3", label: "Analyze", order: 1 }, { id: "s4", label: "Solve", order: 2 }] }
        ]
      }
    ],
    finalBoss: {
      id: "final-boss",
      title: "The Ultimate Challenge",
      description: "Defeat the Titan.",
      type: "boss",
      difficulty: 10,
      bossName: `The ${topic} Titan`,
      maxHealth: 1000,
      timeLimitSeconds: 180,
      xpReward: 3000,
      weakness: "Perseverance",
      mechanicType: "timed-quiz",
      challenges: [
        { id: "bq1", question: `How do you conquer ${topic}?`, options: ["With mastery", "With luck", "You can't", "Cheat"], correctAnswerIndex: 0, explanation: "Mastery is the only way." },
        { id: "bq2", question: "What is the final secret?", options: ["There is no secret", "Magic", "Money", "Time"], correctAnswerIndex: 0, explanation: "It's all hard work." }
      ]
    }
  };
}
