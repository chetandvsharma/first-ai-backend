import db from "../db/knex.js";

async function createLogsTable() {
  const exists = await db.schema.hasTable("logs");
  if (!exists) {
    await db.schema.createTable("logs", (table) => {
      table.increments("id").primary();
      table.string("endpoint");
      table.text("prompt");
      table.text("ai_response");
      table.timestamp("created_at").defaultTo(db.fn.now());
    });
    console.log("✅ logs table created");
  }
}

async function insertLog({ endpoint, prompt, ai_response }) {
  return db("logs").insert({ endpoint, prompt, ai_response });
}

async function getLogs(filters = {}) {
  const { endpoint, prompt, limit = 50 } = filters;

  let query = db("logs").select("*").limit(limit);

  if (endpoint) {
    query = query.where("endpoint", endpoint);
  }

  if (prompt) {
    query = query.where("prompt", prompt);
  }

  const result = await query;
  return result;
}

export { createLogsTable, insertLog, getLogs };
