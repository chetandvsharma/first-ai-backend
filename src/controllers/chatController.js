const { generateText } = require("../services/huggingFaceService");

async function chatHandler(req, res) {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const aiReply = await generateText(message);
    res.json({ reply: aiReply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { chatHandler };
