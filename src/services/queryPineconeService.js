import pinecone from "../lib/pineconeClient.js";

const index = pinecone.index("ai-memory");

export async function queryPinecone(embedding, topK = 5) {
  try {
    const queryRequest = {
      vector: embedding,
      topK,
      includeMetadata: true,
    };

    const response = await index.query(queryRequest);

    console.log("🔍 Pinecone query result:", JSON.stringify(response, null, 2));

    return response;
  } catch (error) {
    console.error("❌ Pinecone query error:", error?.response?.data || error.message);
    throw new Error("Failed to query Pinecone");
  }
}
