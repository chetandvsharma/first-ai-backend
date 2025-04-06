require("dotenv").config();
const express = require("express");
const cors = require("cors");

const chatRoutes = require("./src/routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends: true}));

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
