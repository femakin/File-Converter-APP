const OpenAI = require("openai-api");
const OPENAI_API_KEY = process.env.OpenAIKEY;
// export const openai = new OpenAI(OPENAI_API_KEY);

export const openai = new OpenAI({
  apiKey: process.env.OpenAIKEY,
});
