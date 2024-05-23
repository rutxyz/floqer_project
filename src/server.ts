import express, { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import jsonServer from 'json-server';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// JSON Server setup
const jsonServerRouter = jsonServer.router(path.join(__dirname, '../db.json'));
const jsonServerMiddlewares = jsonServer.defaults();

app.use(jsonServerMiddlewares);
app.use('/api/data', jsonServerRouter); // Serve JSON data under /api/data

// Middleware to parse JSON
app.use(express.json());

// Existing API fetch functionality
app.get('/api/data/salaries', async (req: Request, res: Response) => {
  res.send('Your existing API response');
});

// New endpoint to handle chat requests
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { userQuery }: { userQuery: string } = req.body;
    const context: string = await fetchKaggleData(); // Function to fetch Kaggle dataset context
    const response: string = await generateResponse(userQuery, context);
    const questions: string[] = await generateQuestions(context);
    res.send({ response, questions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to fetch Kaggle dataset context
const fetchKaggleData = async (): Promise<string> => {
  const filePath = path.resolve(__dirname, '../db.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(rawData);

  let context = '';
  data.forEach((item: any) => {
    context += `Year: ${item.work_year}, Job Title: ${item.job_title}, Salary: ${item.salary_in_usd}\n`;
  });

  return context;
};

// Function to generate response using OpenAI API
const generateResponse = async (userQuery: string, context: string): Promise<string> => {
  const response = await axios.post<any>('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    prompt: `${userQuery}\nContext:\n${context}`,
    max_tokens: 150,
    temperature: 0.7,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    }
  });
  return response.data.choices[0].text.trim();
};

// Function to generate questions using OpenAI API
const generateQuestions = async (context: string): Promise<string[]> => {
  const response = await axios.post<any>('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    prompt: `Based on the following dataset, generate three questions for further insights:\n${context}`,
    max_tokens: 150,
    temperature: 0.7,
    n: 3,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    }
  });

  return response.data.choices.map((choice: any) => choice.text.trim());
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
