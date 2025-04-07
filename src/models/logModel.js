const db = require("../db/knex");

async function createLogsTable() {
  const exists = await db.schema.hasTable("logs");
  if (!exists) {
    await db.schema.createTable("logs", (table) => {
      table.increments("id").primary();
      table.string("endpoint");
      table.text("topic");
      table.text("ai_response");
      table.timestamp("created_at").defaultTo(db.fn.now());
    });
    console.log("✅ logs table created");
  }
}

async function insertLog({ endpoint, topic, ai_response }) {
  return db("logs").insert({ endpoint, topic, ai_response });
}

async function getLogs(filters = {}) {
  let query = db("logs").select("*");

  if (filters.endpoint) {
    query = query.where("endpoint", filters.endpoint);
  }

  if (filters.topic) {
    query = query.where("topic", filters.topic);
  }

  // Apply limit (default 50 if not passed)
  query = query.limit(filters.limit || 50);

  return await query;
}

module.exports = { createLogsTable, insertLog, getLogs };