import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createLogsTable } from "./src/models/logModel.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import logRoutes from "./src/routes/logRoutes.js";
import sentimentRoutes from "./src/routes/sentimentRoutes.js";
import tipRoutes from "./src/routes/tipRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", chatRoutes);
app.use("/api", logRoutes);
app.use("/api", sentimentRoutes);
app.use("/api", tipRoutes);

app.listen(PORT, () => {
  createLogsTable();
  console.log(`Server running on http://localhost:${PORT}`);
});
