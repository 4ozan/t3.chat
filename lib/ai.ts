import { createTogetherAI } from "@ai-sdk/togetherai"

export const togetherai = createTogetherAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.TOGETHER_API_KEY ?? ""
})
