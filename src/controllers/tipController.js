const { generateText } = require("../services/huggingFaceService");

async function generateTip(req, res) {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const prompt = `Give a short, helpful tip for the following topic: ${topic}`;

  try {
    const tip = await generateText(prompt);
    res.json({ tip });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate tip" });
  }
}

module.exports = { generateTip };
