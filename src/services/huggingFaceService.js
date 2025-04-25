import axios from "axios";

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

async function analyzeSentiment(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    return response.data[0]; // label + score
  } catch (error) {
    console.error("Hugging Face API Error:", error.message);
    throw new Error("Failed to analyze sentiment");
  }
}

async function generateEmbedding(text) {
  const response = await axios.post(
    "https://api-inference.huggingface.co/embeddings/sentence-transformers/all-MiniLM-L6-v2",
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.embedding; // Check actual key based on API response
}

export { generateText, analyzeSentiment, generateEmbedding };
