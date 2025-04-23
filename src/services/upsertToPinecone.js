import pinecone  from "../lib/pineconeClient.js";

const index = pinecone.index("ai-memory");

export async function upsertToPinecone(id, embedding, metadata = {}) {
  try {
    const upsertRequest = [
      {
        id,
        values: embedding,
        metadata,
      },
    ];

    // console.log("📦 Upserting to Pinecone with payload:", JSON.stringify(upsertRequest, null, 2));

    const response = await index.upsert(upsertRequest);
    console.log("✅ Pinecone response:", response);
  } catch (error) {
    console.error("❌ Pinecone upsert error:", error?.response?.data || error.message);
    throw new Error("Failed to store in Pinecone");
  }
}
