require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createLogsTable } = require("./src/models/logModel");

const chatRoutes = require("./src/routes/chatRoutes");
const tipRoutes = require("./src/routes/tipRoutes");
const logRoutes = require("./src/routes/logRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use("/api", chatRoutes);
app.use("/api", tipRoutes);
app.use("/api", logRoutes);

app.listen(PORT, () => {
  createLogsTable();
  console.log(`Server running on http://localhost:${PORT}`);
});
