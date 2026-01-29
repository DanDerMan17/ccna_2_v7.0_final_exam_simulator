import mongoose from "mongoose";

const matchPairSchema = new mongoose.Schema({
    left: String,
    right: String
}, { _id: false });

const questionSchema = new mongoose.Schema({
    number: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    question: { type: String, required: true },
    image: { type: String, default: null },
    answers: { type: [String], default: [] },
    correctAnswers: { type: [String], default: [] },
    matchPairs: { type: [matchPairSchema], default: [] }
});

export const QuestionModel = mongoose.model("Question", questionSchema);
