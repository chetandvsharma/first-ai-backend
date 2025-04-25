import axios from "axios";

async function generateEmbedding(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
   
    const embedding = response.data;
    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("Invalid embedding response");
    }

    return embedding;
  } catch (error) {
    console.error("❌ Failed to generate embedding:", error.message);
    throw new Error("Embedding generation failed");
  }
}

export default generateEmbedding;
