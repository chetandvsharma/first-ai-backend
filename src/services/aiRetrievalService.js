import generateEmbedding from "./generateEmbedding.js";
import { queryPinecone } from "./queryPineconeService.js";
import { queryAIModel } from "./huggingFaceService.js";

export async function retrieveAnswer(userQuery) {
    try {
      // 1. Get embedding of userQuery
      const queryEmbedding = await generateEmbedding(userQuery);
  
      // 2. Query Pinecone for matches
      const queryResponse = await queryPinecone(queryEmbedding);
  
      const topMatches = queryResponse.matches.slice(0, 3);
      const memoriesText = topMatches
        .map((match, index) => `Memory ${index + 1}: ${match.metadata.text}`)
        .join("\n");
  
      // 3. Construct a smarter prompt
      const prompt = `
  You are an intelligent AI assistant. Use the following memories to answer the user's question.
  If the answer is not found in memories, say "I don't know."
  
  Memories:
  ${memoriesText}
  
  User Question: ${userQuery}
  
  Answer:
  `.trim();
  
      // console.log("🤖 Built Prompt:\n", prompt);
  
      // 4. Query Hugging Face AI Model
      const answer = await queryAIModel(prompt);
  
      return answer;
    } catch (error) {
      console.error("❌ AI Retrieval error:", error.message);
      throw new Error("Failed to retrieve AI answer");
    }
  };  
