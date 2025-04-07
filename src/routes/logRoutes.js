const express = require("express");
const router = express.Router();
const { getLogs } = require("../models/logModel");

router.get("/logs", async (req, res) => {
  try {
    const { endpoint, topic, limit } = req.query;

    const filters = {
      endpoint,
      topic,
      limit: parseInt(limit) || 50, // default to 50
    };

    const logs = await getLogs(filters);
    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

module.exports = router;
