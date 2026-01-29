import { Router } from "express";
import { QuestionModel } from "../db/question.model";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const questions = await QuestionModel.find().sort({ number: 1 });

        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: "Serverfehler" });
    }
});

export default router;
