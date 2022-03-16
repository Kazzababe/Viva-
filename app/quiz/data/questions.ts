import murmurhash from "murmurhash";

export type Question = {
    id: string;
    question: string;
    pack: unknown; // todo pack type
};

const premapped: Omit<Question, "id">[] = [
    {
        question: "Do you receive enough sun?",
        pack: "SUNSHINE_PACK", // todo
    },
    {
        question: "Do you have a history of heart problems?",
        pack: "HEART_PACK", // todo
    },
];

// contains all questions with a random id tied to it based off of the pack
const questions = premapped.map((question, index) => ({
    id: murmurhash(`${question.pack}`).toString(16).substring(0, 6),
    ...question,
}));

if (new Set(questions.map((q) => q.id)).size !== questions.length) {
    throw new Error("Duplicate question ids"); // unlikely to happen, but this should throw in tests too
}

export function getAllQuestions(): Question[] {
    return questions;
}

export function getQuestionById(id: string): Question | undefined {
    return questions.find((question) => question.id === id);
}
