const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

app.use(express.json());

app.post('/ask', async (req, res) => {
  const question = req.body.question;
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
      { inputs: question },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`
        }
      }
    );
    res.json({ reply: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || 'Erreur serveur' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend chatbot PSE en ligne 🚀');
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
changement du modèle vers zephyr-7b-beta
