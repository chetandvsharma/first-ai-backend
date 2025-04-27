import { retrieveAnswer } from "../services/aiRetrievalService.js";

async function test() {
  const userQuery = "What causes ocean tides?";
  const answer = await retrieveAnswer(userQuery);

  console.log("🤖 AI Answer:", answer);
}

test();
