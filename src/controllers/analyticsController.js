import db from "../db/knex.js";

async function getAnalyticsSummary(req, res) {
    try {
      // Total logs
      const totalLogs = await db("logs").count("id").first();
  
      // Logs today
      const logsToday = await db("logs")
        .whereRaw("DATE(created_at) = CURRENT_DATE")
        .count("id")
        .first();
  
      // Top endpoints
      const topEndpoints = await db("logs")
        .select("endpoint")
        .count("endpoint as count")
        .groupBy("endpoint")
        .orderBy("count", "desc")
        .limit(5);
  
      res.json({
        totalLogs: parseInt(totalLogs.count),
        logsToday: parseInt(logsToday.count),
        topEndpoints,
      });
    } catch (err) {
      console.error("Analytics Error:", err.message);
      res.status(500).json({ error: "Failed to fetch analytics summary" });
    }
  }

export { getAnalyticsSummary };
