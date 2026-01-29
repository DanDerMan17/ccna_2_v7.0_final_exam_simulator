import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, initDB } from "./db/db";
import questionsRouter from "./routes/questions.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionsRouter);

async function startServer() {
  try {
    await connectDB();
    await initDB();

    app.listen(port, () => {
      console.log(`Server laeuft auf PORT ${port}`);
    });
  } catch (error) {
    console.error("Server Start fehlgeschlagen:", error);
    process.exit(1);
  }
}

startServer();
