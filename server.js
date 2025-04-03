require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

console.log("Hugging Face API Key:", process.env.HUGGINGFACE_API_KEY ? "Loaded" : "Not Found");


app.post('/generate-text', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
            { inputs: prompt },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ aiResponse: response.data.generated_text || response.data });
    } catch (error) {
        console.error("Error calling Hugging Face API:", error.message);
        res.status(500).json({ error: "Failed to generate text" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
