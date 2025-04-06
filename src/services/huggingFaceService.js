const axios = require("axios");

async function generateText(prompt) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data[0]?.generated_text || "No response";
  } catch (error) {
    console.error("Hugging Face API Error:", error.message);
    throw new Error("Failed to generate text from AI");
  }
}

module.exports = { generateText };
