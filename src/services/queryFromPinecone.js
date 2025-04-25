import pinecone from "../lib/pineconeClient.js";

const index = pinecone.index("ai-memory");

export async function queryPinecone(embedding, topK = 5) {
  try {
    const result = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true,
    });

    console.log("🔍 Query result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("❌ Query error:", error.message);
    throw new Error("Failed to query memory");
  }
}
