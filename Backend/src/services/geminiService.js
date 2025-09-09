import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config(); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateSearchQuery(teamDescription, recentLinks) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const linksText = recentLinks.map(link => `${link.title}`).join('\n');

    const prompt = `
        Analyze the following team description and recently shared article titles to generate a concise, effective search query (under 10 words) for finding new, relevant web articles.

        **Team Description:** "${teamDescription}"

        **Recent Article Titles:**
        ${linksText}

        **Output Format:**
        Respond ONLY with a valid JSON object like this:
        { "search_query": "The generated search query string" }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const jsonString = text.replace(/```json|```/g, '').trim();
        const parsedJson = JSON.parse(jsonString);
        return parsedJson.search_query;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return null;
    }
}