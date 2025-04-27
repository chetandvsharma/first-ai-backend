import generateEmbedding from "../services/generateEmbedding.js";
import { upsertToPinecone } from "../services/upsertToPinecone.js";
import { queryPinecone } from "../services/queryFromPinecone.js";
import { z } from "zod";

const querySchema = z.object({
  query: z.string().min(1),
});

export async function storeMemory(req, res) {
  try {
    const { text, source } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const embedding = await generateEmbedding(text);

    const id = `memory-${Date.now()}`;
    const metadata = {
      text,
      source: source || "user-input",
      timestamp: new Date().toISOString(),
    };

    await upsertToPinecone(id, embedding, metadata);

    res.json({ message: "Memory stored successfully", id });
  } catch (error) {
    console.error("storeMemory error:", error.message);
    res.status(500).json({ error: "Failed to store memory" });
  }
}

export async function queryMemory(req, res) {
  try {
    const parse = querySchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: "Query text is required" });
    }

    const { query, source } = parse.data;

    const embedding = await generateEmbedding(query);
    const results = await queryPinecone(embedding, source);

    res.json({
      matches: results?.matches || [],
    });
  } catch (error) {
    console.error("❌ Error in queryMemoryController:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}
