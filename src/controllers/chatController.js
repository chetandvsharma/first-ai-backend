import { insertLog } from "../models/logModel.js";
import { generateText } from "../services/huggingFaceService.js";

async function chatHandler(req, res) {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const aiReply = await generateText(message);
    await insertLog({ endpoint: "/chat", prompt: message, ai_response: aiReply });
    res.json({ reply: aiReply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { chatHandler };
