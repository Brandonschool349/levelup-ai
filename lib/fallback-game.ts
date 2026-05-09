import { GameData } from "./types";

function isCarTopic(topic: string) {
    const t = topic.toLowerCase();

    return (
        t.includes("car") ||
        t.includes("cars") ||
        t.includes("carros") ||
        t.includes("auto") ||
        t.includes("automotive")
    );
}

function carFallbackGame(topic: string): GameData {
    return {
        topic,
        themeColor: "cyan",

        islands: [
            {
                id: "island-1",
                title: "Car Basics",
                description: "Understand the core parts of a car.",
                theme: "beginner",
                zones: [
                    {
                        id: "car-z1",
                        title: "Engine Basics",
                        description: "Learn what makes a car move.",
                        type: "quiz",
                        difficulty: 1,
                        xpReward: 100,
                        recoveryContent: {
                            simplifiedExplanation:
                                "A car engine converts fuel into movement. Other systems like brakes, steering, and tires help control that movement.",
                            keyTakeaway:
                                "The engine creates power, but safe driving depends on multiple systems working together.",
                            miniFlashcards: [
                                {
                                    front: "Engine",
                                    back: "Creates power for the car.",
                                },
                                {
                                    front: "Brakes",
                                    back: "Slow down or stop the car.",
                                },
                            ],
                        },
                        questions: [
                            {
                                id: "car-q1",
                                question:
                                    "What is the main purpose of engine oil in a car?",
                                options: [
                                    "Lubricate moving engine parts",
                                    "Change the paint color",
                                    "Increase speaker volume",
                                    "Clean the windshield",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    "Engine oil reduces friction, protects moving parts, and helps manage heat inside the engine.",
                            },
                            {
                                id: "car-q2",
                                question:
                                    "Which system helps slow down or stop a car?",
                                options: [
                                    "Brake system",
                                    "Audio system",
                                    "Air conditioning system",
                                    "Seat adjustment system",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    "The brake system uses friction and hydraulic pressure to slow or stop the wheels.",
                            },
                        ],
                    },

                    {
                        id: "car-z2",
                        title: "Car Parts",
                        description: "Review essential automotive concepts.",
                        type: "flashcard",
                        difficulty: 1,
                        xpReward: 100,
                        cards: [
                            {
                                id: "car-f1",
                                front: "Transmission",
                                back: "Transfers engine power to the wheels and changes gear ratios.",
                            },
                            {
                                id: "car-f2",
                                front: "Radiator",
                                back: "Helps cool the engine by removing heat from coolant.",
                            },
                            {
                                id: "car-f3",
                                front: "Battery",
                                back: "Provides electrical power to start the car and support electronics.",
                            },
                            {
                                id: "car-f4",
                                front: "Tires",
                                back: "Provide grip, braking traction, and contact with the road.",
                            },
                        ],
                    },

                    {
                        id: "car-z3",
                        title: "Start Sequence",
                        description: "Put the basic starting process in order.",
                        type: "sequence",
                        difficulty: 1,
                        xpReward: 100,
                        items: [
                            {
                                id: "car-s1",
                                label: "Check that the car is in Park or Neutral.",
                                order: 1,
                            },
                            {
                                id: "car-s2",
                                label: "Press the brake pedal.",
                                order: 2,
                            },
                            {
                                id: "car-s3",
                                label: "Start the engine.",
                                order: 3,
                            },
                            {
                                id: "car-s4",
                                label: "Shift into Drive when ready to move.",
                                order: 4,
                            },
                        ],
                    },
                ],
            },

            {
                id: "island-2",
                title: "Car Maintenance",
                description: "Learn how to keep a car healthy.",
                theme: "intermediate",
                zones: [
                    {
                        id: "car-z4",
                        title: "Maintenance Quiz",
                        description: "Test basic maintenance knowledge.",
                        type: "quiz",
                        difficulty: 2,
                        xpReward: 150,
                        recoveryContent: {
                            simplifiedExplanation:
                                "Maintenance prevents breakdowns. Oil, tires, brakes, and coolant are some of the most important things to check.",
                            keyTakeaway:
                                "Small maintenance habits prevent expensive car problems.",
                            miniFlashcards: [
                                {
                                    front: "Oil change",
                                    back: "Replaces old oil to protect the engine.",
                                },
                                {
                                    front: "Tire pressure",
                                    back: "Affects safety, grip, and fuel efficiency.",
                                },
                            ],
                        },
                        questions: [
                            {
                                id: "car-q3",
                                question:
                                    "Why is checking tire pressure important?",
                                options: [
                                    "It improves grip, safety, and fuel efficiency",
                                    "It changes the engine size",
                                    "It makes the radio louder",
                                    "It replaces brake fluid",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    "Proper tire pressure improves handling, tire life, braking, and fuel economy.",
                            },
                            {
                                id: "car-q4",
                                question:
                                    "What can happen if engine coolant is too low?",
                                options: [
                                    "The engine may overheat",
                                    "The headlights become brighter",
                                    "The tires rotate faster",
                                    "The windshield becomes tinted",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    "Coolant helps regulate engine temperature. Low coolant can cause overheating and serious damage.",
                            },
                        ],
                    },

                    {
                        id: "car-z5",
                        title: "Maintenance Terms",
                        description: "Study key maintenance concepts.",
                        type: "flashcard",
                        difficulty: 2,
                        xpReward: 150,
                        cards: [
                            {
                                id: "car-f5",
                                front: "Brake pads",
                                back: "Friction material that presses against rotors to slow the car.",
                            },
                            {
                                id: "car-f6",
                                front: "Air filter",
                                back: "Keeps dust and debris from entering the engine intake.",
                            },
                            {
                                id: "car-f7",
                                front: "Coolant",
                                back: "Fluid that helps prevent the engine from overheating.",
                            },
                            {
                                id: "car-f8",
                                front: "Alignment",
                                back: "Adjusts wheel angles so the car tracks correctly.",
                            },
                        ],
                    },

                    {
                        id: "car-z6",
                        title: "Oil Check Sequence",
                        description: "Order the steps to check engine oil.",
                        type: "sequence",
                        difficulty: 2,
                        xpReward: 150,
                        items: [
                            {
                                id: "car-s5",
                                label: "Park on level ground and turn off the engine.",
                                order: 1,
                            },
                            {
                                id: "car-s6",
                                label: "Pull out the dipstick.",
                                order: 2,
                            },
                            {
                                id: "car-s7",
                                label: "Wipe it clean and reinsert it fully.",
                                order: 3,
                            },
                            {
                                id: "car-s8",
                                label: "Pull it out again and read the oil level.",
                                order: 4,
                            },
                        ],
                    },
                ],
            },

            {
                id: "island-3",
                title: "Car Safety",
                description: "Master safety and advanced systems.",
                theme: "advanced",
                zones: [
                    {
                        id: "car-z7",
                        title: "Safety Systems Quiz",
                        description: "Test knowledge of modern safety systems.",
                        type: "quiz",
                        difficulty: 3,
                        xpReward: 200,
                        recoveryContent: {
                            simplifiedExplanation:
                                "Modern cars use safety systems like ABS, traction control, airbags, and stability control to reduce risk.",
                            keyTakeaway:
                                "Safety systems help the driver maintain control and reduce injury risk.",
                            miniFlashcards: [
                                {
                                    front: "ABS",
                                    back: "Prevents wheel lock during hard braking.",
                                },
                                {
                                    front: "ESC",
                                    back: "Helps reduce skidding and loss of control.",
                                },
                            ],
                        },
                        questions: [
                            {
                                id: "car-q5",
                                question:
                                    "What does ABS help prevent during hard braking?",
                                options: [
                                    "Wheel lock-up",
                                    "Fuel evaporation",
                                    "Engine oil leaks",
                                    "Radio interference",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    "ABS rapidly modulates brake pressure to help prevent wheels from locking up.",
                            },
                            {
                                id: "car-q6",
                                question:
                                    "What is the role of electronic stability control?",
                                options: [
                                    "Help reduce skidding and loss of control",
                                    "Charge the phone faster",
                                    "Increase trunk space",
                                    "Lower the windows automatically",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    "Electronic stability control can brake individual wheels or reduce power to help stabilize the vehicle.",
                            },
                        ],
                    },

                    {
                        id: "car-z8",
                        title: "Advanced Tech",
                        description: "Review advanced automotive concepts.",
                        type: "flashcard",
                        difficulty: 3,
                        xpReward: 200,
                        cards: [
                            {
                                id: "car-f9",
                                front: "Turbocharger",
                                back: "Uses exhaust gases to force more air into the engine for more power.",
                            },
                            {
                                id: "car-f10",
                                front: "Hybrid system",
                                back: "Combines an engine with electric motors to improve efficiency.",
                            },
                            {
                                id: "car-f11",
                                front: "Regenerative braking",
                                back: "Converts braking energy into electrical energy in hybrids or EVs.",
                            },
                            {
                                id: "car-f12",
                                front: "Adaptive cruise control",
                                back: "Adjusts speed to maintain distance from the car ahead.",
                            },
                        ],
                    },

                    {
                        id: "car-z9",
                        title: "Flat Tire Sequence",
                        description: "Order the steps to handle a flat tire.",
                        type: "sequence",
                        difficulty: 3,
                        xpReward: 200,
                        items: [
                            {
                                id: "car-s9",
                                label: "Pull over safely and turn on hazard lights.",
                                order: 1,
                            },
                            {
                                id: "car-s10",
                                label: "Loosen the lug nuts slightly.",
                                order: 2,
                            },
                            {
                                id: "car-s11",
                                label: "Raise the car with the jack.",
                                order: 3,
                            },
                            {
                                id: "car-s12",
                                label: "Replace the tire and tighten the lug nuts.",
                                order: 4,
                            },
                        ],
                    },
                ],
            },
        ],

        finalBoss: {
            id: "car-boss",
            title: "Final Car Challenge",
            description: "Defeat the automotive boss.",
            type: "boss",
            difficulty: 10,
            bossName: "Engine Titan",
            maxHealth: 500,
            timeLimitSeconds: 120,
            xpReward: 2000,
            weakness: "Automotive knowledge",
            mechanicType: "timed-quiz",
            challenges: [
                {
                    id: "car-boss-q1",
                    question:
                        "Which system transfers engine power to the wheels?",
                    options: [
                        "Transmission",
                        "Radiator",
                        "Windshield",
                        "Headlight",
                    ],
                    correctAnswerIndex: 0,
                    explanation:
                        "The transmission manages gear ratios and transfers power to the wheels.",
                },
                {
                    id: "car-boss-q2",
                    question:
                        "Why is coolant important in a car?",
                    options: [
                        "It helps prevent engine overheating",
                        "It paints the engine",
                        "It cleans the seats",
                        "It changes tire pressure",
                    ],
                    correctAnswerIndex: 0,
                    explanation:
                        "Coolant regulates engine temperature and prevents overheating.",
                },
            ],
        },
    };
}

function genericFallbackGame(topic: string): GameData {
    const cleanTopic = topic || "Learning";

    return {
        topic: cleanTopic,
        themeColor: "cyan",

        islands: [
            {
                id: "island-1",
                title: `${cleanTopic} Basics`,
                description: `Learn the foundations of ${cleanTopic}.`,
                theme: "beginner",
                zones: [
                    {
                        id: "generic-z1",
                        title: "Core Concepts",
                        description: `Start with the most important ideas in ${cleanTopic}.`,
                        type: "quiz",
                        difficulty: 1,
                        xpReward: 100,
                        recoveryContent: {
                            simplifiedExplanation:
                                `${cleanTopic} becomes easier when you understand the basic vocabulary and purpose first.`,
                            keyTakeaway:
                                `Start with concrete concepts before advanced ${cleanTopic} practice.`,
                            miniFlashcards: [
                                {
                                    front: "Foundation",
                                    back: `The basic idea behind ${cleanTopic}.`,
                                },
                            ],
                        },
                        questions: [
                            {
                                id: "generic-q1",
                                question:
                                    `Which option is the best first step when learning ${cleanTopic}?`,
                                options: [
                                    `Understand the core concepts of ${cleanTopic}`,
                                    "Skip directly to advanced details",
                                    "Guess without feedback",
                                    "Avoid practicing",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    `Core concepts give you the base needed to understand harder parts of ${cleanTopic}.`,
                            },
                            {
                                id: "generic-q2",
                                question:
                                    `Why should you practice ${cleanTopic} with examples?`,
                                options: [
                                    "Examples turn abstract ideas into usable skills",
                                    "Examples make learning unnecessary",
                                    "Examples remove all difficulty",
                                    "Examples replace understanding",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    `Examples help you apply ${cleanTopic} instead of only memorizing it.`,
                            },
                        ],
                    },

                    {
                        id: "generic-z2",
                        title: "Key Terms",
                        description: `Memorize useful ${cleanTopic} vocabulary.`,
                        type: "flashcard",
                        difficulty: 1,
                        xpReward: 100,
                        cards: [
                            {
                                id: "generic-f1",
                                front: "Core idea",
                                back: `The main concept that explains how ${cleanTopic} works.`,
                            },
                            {
                                id: "generic-f2",
                                front: "Practice",
                                back: `Applying ${cleanTopic} repeatedly to build skill.`,
                            },
                            {
                                id: "generic-f3",
                                front: "Feedback",
                                back: `Using mistakes to improve your ${cleanTopic} understanding.`,
                            },
                            {
                                id: "generic-f4",
                                front: "Mastery",
                                back: `Being able to explain and apply ${cleanTopic}.`,
                            },
                        ],
                    },

                    {
                        id: "generic-z3",
                        title: "Learning Sequence",
                        description: `Build ${cleanTopic} knowledge in order.`,
                        type: "sequence",
                        difficulty: 1,
                        xpReward: 100,
                        items: [
                            {
                                id: "generic-s1",
                                label: `Learn basic ${cleanTopic} terms.`,
                                order: 1,
                            },
                            {
                                id: "generic-s2",
                                label: `Study simple ${cleanTopic} examples.`,
                                order: 2,
                            },
                            {
                                id: "generic-s3",
                                label: `Practice ${cleanTopic} tasks.`,
                                order: 3,
                            },
                            {
                                id: "generic-s4",
                                label: `Review mistakes and improve.`,
                                order: 4,
                            },
                        ],
                    },
                ],
            },

            {
                id: "island-2",
                title: `${cleanTopic} Practice`,
                description: `Apply ${cleanTopic} in realistic situations.`,
                theme: "intermediate",
                zones: [
                    {
                        id: "generic-z4",
                        title: "Application Quiz",
                        description: `Use ${cleanTopic} in context.`,
                        type: "quiz",
                        difficulty: 2,
                        xpReward: 150,
                        recoveryContent: {
                            simplifiedExplanation:
                                `Intermediate ${cleanTopic} learning is about applying concepts, not just naming them.`,
                            keyTakeaway:
                                `Practice connects ${cleanTopic} theory to real usage.`,
                            miniFlashcards: [
                                {
                                    front: "Application",
                                    back: `Using ${cleanTopic} to solve a task.`,
                                },
                            ],
                        },
                        questions: [
                            {
                                id: "generic-q3",
                                question:
                                    `What shows real progress in ${cleanTopic}?`,
                                options: [
                                    `Applying ${cleanTopic} concepts correctly`,
                                    "Only reading definitions",
                                    "Avoiding hard examples",
                                    "Ignoring feedback",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    `Progress comes from applying ${cleanTopic} in increasingly realistic situations.`,
                            },
                        ],
                    },
                    {
                        id: "generic-z5",
                        title: "Skill Cards",
                        description: `Strengthen ${cleanTopic} skills.`,
                        type: "flashcard",
                        difficulty: 2,
                        xpReward: 150,
                        cards: [
                            {
                                id: "generic-f5",
                                front: "Pattern",
                                back: `A repeated structure commonly found in ${cleanTopic}.`,
                            },
                            {
                                id: "generic-f6",
                                front: "Mistake",
                                back: `An error that reveals what to improve in ${cleanTopic}.`,
                            },
                            {
                                id: "generic-f7",
                                front: "Strategy",
                                back: `A planned way to solve ${cleanTopic} problems.`,
                            },
                        ],
                    },
                ],
            },

            {
                id: "island-3",
                title: `${cleanTopic} Mastery`,
                description: `Handle advanced ${cleanTopic} challenges.`,
                theme: "advanced",
                zones: [
                    {
                        id: "generic-z6",
                        title: "Mastery Quiz",
                        description: `Prove advanced ${cleanTopic} understanding.`,
                        type: "quiz",
                        difficulty: 3,
                        xpReward: 200,
                        recoveryContent: {
                            simplifiedExplanation:
                                `Advanced ${cleanTopic} means explaining, applying, and adapting concepts under pressure.`,
                            keyTakeaway:
                                `Mastery is flexible use of ${cleanTopic}.`,
                            miniFlashcards: [
                                {
                                    front: "Mastery",
                                    back: `Flexible, confident use of ${cleanTopic}.`,
                                },
                            ],
                        },
                        questions: [
                            {
                                id: "generic-q4",
                                question:
                                    `What is a sign of mastery in ${cleanTopic}?`,
                                options: [
                                    `Explaining and applying ${cleanTopic} in new situations`,
                                    "Memorizing one sentence",
                                    "Never practicing",
                                    "Avoiding difficult cases",
                                ],
                                correctAnswerIndex: 0,
                                explanation:
                                    `Mastery means you can use ${cleanTopic} even when the situation changes.`,
                            },
                        ],
                    },
                    {
                        id: "generic-z7",
                        title: "Advanced Cards",
                        description: `Review advanced ${cleanTopic} ideas.`,
                        type: "flashcard",
                        difficulty: 3,
                        xpReward: 200,
                        cards: [
                            {
                                id: "generic-f8",
                                front: "Adaptation",
                                back: `Changing your approach when a ${cleanTopic} problem changes.`,
                            },
                            {
                                id: "generic-f9",
                                front: "Optimization",
                                back: `Improving how efficiently you use ${cleanTopic}.`,
                            },
                        ],
                    },
                ],
            },
        ],

        finalBoss: {
            id: "generic-boss",
            title: "Final Challenge",
            description: `Defeat the ${cleanTopic} boss.`,
            type: "boss",
            difficulty: 10,
            bossName: `${cleanTopic} Titan`,
            maxHealth: 500,
            timeLimitSeconds: 120,
            xpReward: 2000,
            weakness: "Knowledge",
            mechanicType: "timed-quiz",
            challenges: [
                {
                    id: "generic-boss-q1",
                    question:
                        `What is the strongest proof that you understand ${cleanTopic}?`,
                    options: [
                        `You can apply ${cleanTopic} in real examples`,
                        "You only know the title",
                        "You avoid practice",
                        "You never review mistakes",
                    ],
                    correctAnswerIndex: 0,
                    explanation:
                        `Real understanding means applying ${cleanTopic}, not only recognizing the name.`,
                },
            ],
        },
    };
}

export function fallbackGame(topic: string): GameData {
    if (isCarTopic(topic)) {
        return carFallbackGame(topic);
    }

    return genericFallbackGame(topic);
}