import pinecone from "../lib/pineconeClient.js";

const index = pinecone.index("ai-memory");

export async function queryPinecone(embedding, source = false, topK = 5) {
  try {
    const result = await index.query({
      vector: embedding,
      topK: 100, // response limit  (same as mongodb limit )
      includeMetadata: true,
      // filter: {
      //   source: source ? source : "user-input",
      //   // source: "tip", 
      //   // source: "chat"
      // },
      // ⏳ filter by timestamp range
      // timestamp: {
      //   $gte: "2025-04-23T00:00:00.000Z",
      //   $lte: "2025-04-25T00:00:00.000Z",
      // },
    });

    console.log("🔍 Query result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("❌ Query error:", error.message);
    throw new Error("Failed to query memory");
  }
}
