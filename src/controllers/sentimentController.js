import { insertLog } from "../models/logModel.js";
import { analyzeSentiment } from "../services/huggingFaceService.js";

async function sentimentHandler(req, res) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const result = await analyzeSentiment(text);
    await insertLog({
      endpoint: "/api/sentiment",
      prompt: text,
      ai_response: result,
    });
    res.json({ sentiment: result.sort((a, b) => b.score - a.score)[0] });
  } catch (err) {
    res.status(500).json({ error: err.message || "Sentiment analysis failed" });
  }
}

export default sentimentHandler;
