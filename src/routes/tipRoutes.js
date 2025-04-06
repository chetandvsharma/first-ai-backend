const express = require("express");
const router = express.Router();
const { generateTip } = require("../controllers/tipController");

router.post("/generate-tip", generateTip);

module.exports = router;
