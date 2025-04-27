import express from "express";
import {
  storeMemory,
  queryMemory,
  aiRetrival,
} from "../controllers/memoryController.js";

const router = express.Router();

router.post("/memory", storeMemory);
router.get("/memory", queryMemory);

router.get("/chets-gpt", aiRetrival);

export default router;
