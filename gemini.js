let apiKey = "AIzaSyDSG_Ms4g0i1kVOTfrAT9fDLUotowkkY3s";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 30,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [], // If you have context or history, provide it here.
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    return result.response.candidates[0].content.parts[0].text; // Ensure `.text` is accessed properly.
  } catch (error) {
    console.error("Error in run function:", error);
    throw error;
  }
}

export default run;
