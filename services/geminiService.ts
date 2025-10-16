
import { GoogleGenAI, Modality, Type, AspectRatio as GenAiAspectRatio } from "@google/genai";
import { AspectRatio } from "../types";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export const generateImage = async (
  prompt: string,
  productImage: string,
  faceImage: string | null,
  backgroundImage: string | null,
  logoImage: string | null
): Promise<string | null> => {
  try {
    const parts = [
        { text: prompt },
        fileToGenerativePart(productImage, "image/jpeg"),
    ];
    if (faceImage) parts.push(fileToGenerativePart(faceImage, "image/jpeg"));
    if (backgroundImage) parts.push(fileToGenerativePart(backgroundImage, "image/jpeg"));
    if (logoImage) parts.push(fileToGenerativePart(logoImage, "image/png"));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: parts },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
    }
    
    console.error("No image data received from API.", response);
    return null;

  } catch (error) {
    console.error("Error calling Gemini Image API:", error);
    return null;
  }
};


export const generateText = async (prompt: string, productImage: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: prompt },
                    fileToGenerativePart(productImage, "image/jpeg"),
                ]
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini Text API:", error);
        return null;
    }
};

export const getAiSuggestions = async (productImage: string, productDescription: string): Promise<any | null> => {
    try {
        const prompt = `Act as a creative director for a top-tier advertising agency. Based on the uploaded product image and its description ("${productDescription}"), provide creative suggestions in JSON format. The output must strictly follow the provided schema.
        - For 'descriptions', generate 3 catchy, alternative product descriptions in Indonesian.
        - For 'concepts', generate 3 creative and specific photoshoot/scene concepts in Indonesian.
        - For 'keywords', generate 5 relevant keywords in Indonesian for style or background inspiration.
        Ensure the JSON is valid.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: prompt },
                    fileToGenerativePart(productImage, "image/jpeg"),
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        descriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                        concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                },
            },
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error calling Gemini for AI suggestions:", error);
        return null;
    }
}

export const generateVideo = async (
  base64Image: string,
  motionPrompt: string,
  aspectRatio: AspectRatio
): Promise<any> => {
  try {
    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-generate-preview',
      prompt: motionPrompt,
      image: {
        imageBytes: base64Image,
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio as GenAiAspectRatio,
      }
    });
    return operation;
  } catch (error) {
    console.error("Error initiating video generation:", error);
    return null;
  }
};

export const pollVideoStatus = async (operation: any): Promise<string | null> => {
    let currentOperation = operation;
    while (!currentOperation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        try {
            currentOperation = await ai.operations.getVideosOperation({ operation: currentOperation });
        } catch (error) {
            console.error("Error polling video status:", error);
            return null;
        }
    }
    return currentOperation.response?.generatedVideos?.[0]?.video?.uri || null;
};


export const generateAudio = async (script: string, voiceName: string): Promise<{ audioData: string, mimeType: string } | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: script }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } },
                },
            },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];

        if (!part?.inlineData?.data) {
            console.error("No audio data received from API.", response);
            throw new Error("No audio data received from API.");
        }
        
        return { audioData: part.inlineData.data, mimeType: part.inlineData.mimeType };

    } catch (error) {
        console.error("Error calling TTS API:", error);
        return null;
    }
};