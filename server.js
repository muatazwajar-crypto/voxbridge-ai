import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.post("/api/translate-audio", upload.single("audio"), async (req, res) => {
  try {
    const { sourceLanguage, targetLanguage } = req.body;

    if (!req.file) return res.status(400).json({ error: "No audio file received." });
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "OPENAI_API_KEY is missing." });

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1"
    });

    const originalText = transcription.text || "";

    const translation = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are VoxBridge AI. Translate meaning naturally and clearly. Preserve intent and tone, not word-for-word."
        },
        {
          role: "user",
          content: `Translate this from ${sourceLanguage} to ${targetLanguage}:\n\n${originalText}`
        }
      ]
    });

    fs.unlinkSync(req.file.path);

    res.json({
      originalText,
      translatedText: translation.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Translation failed.",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`VoxBridge AI running at http://localhost:${port}`);
});
