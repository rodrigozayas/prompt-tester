import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ENDPOINT = process.env.AZURE_ENDPOINT;
const API_KEY = process.env.AZURE_API_KEY;
const DEPLOYMENT = process.env.AZURE_DEPLOYMENT;

export async function sendPrompt(prompt) {
  const response = await axios.post(
    `${ENDPOINT}/openai/deployments/${DEPLOYMENT}/chat/completions?api-version=2024-04-01-preview`,
    {
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
    }
  );
  return response.data.choices[0].message.content;
}
