import express from "express"
const router = express.Router();
import { generateTip } from "../controllers/tipController.js";

router.post("/generate-tip", generateTip);

export default router;
