export type MatchPair = {
    left: string;
    right: string;
};

export type Question = {
    number: number;
    type: "single" | "multiple" | "match";
    question: string;
    image: string | null;
    answers: string[];
    correctAnswers: string[];
    matchPairs: MatchPair[];
};
