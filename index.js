const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-image', async (req, res) => {
  const prompt = req.body.prompt;

  // Example: Using Replicate API (Stable Diffusion)
  // You must replace 'YOUR_REPLICATE_API_TOKEN' with your actual Replicate API token
  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "a9758cbfdfb6e5d4e3b6d4e3b6d4e3b6d4e3b6d4e3b6d4e3b6d4e3b6d4e3b6", // Stable Diffusion model version id
        input: { prompt }
      },
      {
        headers: {
          'Authorization': `Token YOUR_REPLICATE_API_TOKEN`,
          'Content-Type': 'application/json'
        }
      }
    );
    // For demo: just send the prediction object (you may need to poll for the result in a real app)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});