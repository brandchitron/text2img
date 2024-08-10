const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual API key
const apiKey = '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';

app.use(bodyParser.json());

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            }
        });

        const imageUrl = response.data.data[0].url;
        res.json({ imageUrl: imageUrl });
    } catch (error) {
        res.status(500).send('Error generating image');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
