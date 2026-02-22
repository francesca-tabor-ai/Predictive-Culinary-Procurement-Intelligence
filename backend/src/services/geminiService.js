/**
 * Gemini AI service for ingredient intelligence and menu optimization.
 * Extracted from PCPIP reference; runs server-side to keep API key secure.
 */
import { GoogleGenAI, Type } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' })

/**
 * Get predictive intelligence for an ingredient (alternatives, risks, market summary).
 * @param {Object} ingredient - Ingredient object (id, name, category, unit, etc.)
 * @returns {Promise<Object|null>} IntelligenceReport or null on error
 */
export async function getIngredientIntelligence(ingredient) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not set; skipping AI intelligence')
    return null
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Analyze this ingredient for a meal kit / culinary procurement company: ${JSON.stringify(ingredient)}. 
      Provide a summary of its current market status, suggest 2-3 better alternatives if it has high risk or cost, 
      and list any potential food safety or supply chain risk alerts.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ingredient_id: { type: Type.STRING },
            summary: { type: Type.STRING },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  impact: {
                    type: Type.OBJECT,
                    properties: {
                      cost: { type: Type.STRING },
                      sustainability: { type: Type.STRING },
                      safety: { type: Type.STRING },
                    },
                  },
                },
              },
            },
            risk_alerts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    })

    const text = response.text
    if (!text) return null
    return JSON.parse(text)
  } catch (error) {
    console.error('Gemini API Error:', error)
    return null
  }
}

/**
 * Get menu optimization recommendations based on ingredients.
 * @param {Object[]} ingredients - Array of ingredient objects
 * @returns {Promise<string>} Optimization summary or error message
 */
export async function getMenuOptimization(ingredients) {
  if (!process.env.GEMINI_API_KEY) {
    return 'GEMINI_API_KEY not configured; enable AI for optimization.'
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Optimize this menu based on these ingredients: ${JSON.stringify(ingredients)}. 
      Focus on reducing carbon footprint and procurement cost while maintaining quality. 
      Provide a concise summary of recommendations.`,
    })
    return response.text || 'No recommendations available.'
  } catch (error) {
    console.error('Gemini API Error:', error)
    return 'Error generating optimization.'
  }
}
