import pinecone from "../lib/pineconeClient.js";

const index = pinecone.index("ai-memory");

async function checkVectorExists(vectorId) {
  try {
    const response = await index.query({
      id: vectorId,
      topK: 1,
      includeMetadata: true
    });

    console.log("🔍 Query result:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("❌ Query error:", error?.response?.data || error.message);
  }
}

checkVectorExists("fact-008");
