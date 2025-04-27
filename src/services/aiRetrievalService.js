import generateEmbedding from "./generateEmbedding.js";
import { queryPinecone } from "./queryPineconeService.js";
import { queryAIModel } from "./huggingFaceService.js";

export async function retrieveAnswer(userQuery) {
  try {
    // Step 1: Embed the user query
    const embedding = await generateEmbedding(userQuery);

    // Step 2: Query Pinecone
    const pineconeResult = await queryPinecone(embedding);

    const matches = pineconeResult.matches || [];

    if (matches.length === 0) {
      return "Sorry, I couldn't find any related information.";
    }

    // Step 3: Build context from matches
    const contextText = matches.map((match) => match.metadata.text).join("\n");

    // Step 4: Construct prompt
    const prompt = `
You are an intelligent assistant.
Use the following information to answer the user's question.

Memories:
${contextText}

User's Question:
${userQuery}
`;

    // Step 5: Get AI response
    const aiResponse = await queryAIModel(prompt);

    return aiResponse;
  } catch (error) {
    console.error(
      "❌ AI Retrieval error:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to retrieve AI answer");
  }
}
