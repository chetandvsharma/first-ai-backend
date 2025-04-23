import  generateEmbedding  from "../services/generateEmbedding.js";
import { upsertToPinecone } from "../services/upsertToPinecone.js";

const test = async () => {
  const text = "Russia is largest country in the world";
  const embedding = await generateEmbedding(text);
  
  await upsertToPinecone("fact-005", embedding, {
    text,
    source: "test-script",
  });
};

test();
