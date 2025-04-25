import express from "express";
import { storeMemory,queryMemory } from "../controllers/memoryController.js";

const router = express.Router();

router.post("/memory", storeMemory);
router.get("/memory", queryMemory);

export default router;
