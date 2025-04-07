const { generateText } = require("../services/huggingFaceService");
const { insertLog } = require("../models/logModel");

async function generateTip(req, res) {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const prompt = `Give a short, helpful tip for the following topic: ${topic}`;

  try {
    const tip = await generateText(prompt);
    await insertLog({ endpoint: "/generate-tip", topic, ai_response: tip });
    res.json({ tip });
  } catch (error) {
    console.log('error ', error)
    res.status(500).json({ error: "Failed to generate tip" });
  }
}

module.exports = { generateTip };
