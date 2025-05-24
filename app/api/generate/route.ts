import { togetherai } from "@/lib/ai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await generateText({
      model: togetherai("mistralai/Mixtral-8x7B-Instruct-v0.1"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    });

    if (!result.text) {
      throw new Error("No response from API");
    }

    return NextResponse.json({ response: result.text });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong on the API" },
      { status: 500 }
    );
  }
}