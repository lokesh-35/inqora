import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

// Candidate models in preference order from gemini-api skill
export const CANDIDATE_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
];

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

interface GenerateParams {
  contents: string;
  config?: Record<string, any>;
  preferredModels?: string[];
}

/**
 * Execute Gemini inference with automatic model fallback on 503 / 429 / high-demand errors
 */
export async function generateGeminiContent(params: GenerateParams): Promise<{ text: string; modelUsed: string }> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const modelsToTry = params.preferredModels && params.preferredModels.length > 0
    ? params.preferredModels
    : CANDIDATE_MODELS;

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });

      const text = response.text || '';
      return { text, modelUsed: model };
    } catch (err: any) {
      lastError = err;
      const isCapacityError =
        err?.message?.includes('503') ||
        err?.message?.includes('high demand') ||
        err?.message?.includes('UNAVAILABLE') ||
        err?.message?.includes('429') ||
        err?.status === 'UNAVAILABLE';

      console.warn(`Model ${model} returned ${isCapacityError ? '503/high-demand' : 'error'}, attempting fallback: ${err.message?.slice(0, 100)}`);
      
      // Brief jitter before next attempt
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  throw lastError || new Error('All candidate Gemini models failed.');
}
