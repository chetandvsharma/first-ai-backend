import pinecone from "./pineconeClient.js";

async function setupPineconeIndex() {
  const indexName = "ai-memory";

  const existingIndexesObj = await pinecone.listIndexes();
  const existingIndexNames = existingIndexesObj.indexes.map(index => index.name);

  if (!existingIndexNames.includes(indexName)) {
    await pinecone.createIndex({
      name: indexName,
      dimension: 384,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1"
        }
      }
    });
    console.log("✅ Pinecone index created:", indexName);
  } else {
    console.log("✅ Pinecone index already exists:", indexName);
  }
}

setupPineconeIndex();
