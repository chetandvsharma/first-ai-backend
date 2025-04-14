import express from "express";
import sentimentHandler from "../controllers/sentimentController.js";

const router = express.Router();

router.post("/sentiment", sentimentHandler);

export default router;
