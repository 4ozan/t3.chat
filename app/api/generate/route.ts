import { generateResponse } from "@/lib/together-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.TOGETHER_API_KEY) {
      throw new Error("TOGETHER_API_KEY is not configured");
    }

    const { prompt } = await req.json();
    
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const result = await generateResponse(prompt);

    if (!result) {
      throw new Error("No response from API");
    }

    return NextResponse.json({ response: result });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong on the API" },
      { status: 500 }
    );
  }
}