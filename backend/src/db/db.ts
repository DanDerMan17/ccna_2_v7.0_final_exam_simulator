import mongoose from "mongoose";
import { QuestionModel } from "./question.model";
import questions from "../data/questions.json";

export async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB verbunden!");
}

export async function initDB() {
    const count = await QuestionModel.countDocuments();

    if (count === 0) {
        await QuestionModel.insertMany(questions);
        console.log("Questions aus JSON importiert!");
    } else {
        console.log("DB bereits initialisiert 👍");
    }
}
