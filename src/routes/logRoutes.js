import express from "express"
import { z } from "zod";
import { insertLog, getLogs } from "../models/logModel.js";

const router = express.Router();

const logSchema = z.object({
  endpoint: z.string().min(1),
  prompt: z.string().min(1),
  ai_response: z.string().min(1),
});

const querySchema = z.object({
  endpoint: z.string().optional(),
  prompt: z.string().optional(),
  limit: z.string().optional(),
});

router.post("/log", async (req, res) => {
  const parse = logSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.errors });
  }

  try {
    const newLog = await insertLog(parse.data);
    res.status(201).json(newLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create log" });
  }
});

router.get("/logs", async (req, res) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  try {
    const logs = await getLogs(parsed.data);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
