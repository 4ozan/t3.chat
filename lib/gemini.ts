import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY is not configured');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function generateGeminiResponse(prompt: string) {
  try {
    // Using gemini-1.0-pro instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error("Empty response from Gemini API");
    }
    
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
