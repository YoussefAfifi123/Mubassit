import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = (): GoogleGenAI | null => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not set or is using the placeholder. AI features will fall back to local diagnostics.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// API Endpoint for troubleshooting diagnostics
app.post("/api/diagnose", async (req: Request, res: Response) => {
  try {
    const { deviceType, os, symptoms, customSymptom, negativeSymptoms, failedAttempts } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        error: "NO_API_KEY",
        message: "Gemini API key is not configured. Running in local diagnostics mode."
      });
    }

    const prompt = `
You are an extremely patient, warm, and comforting tech helper assisting an older adult who feels intimidated by technology.
Your tone should be like a loving, supportive grandchild who is very patient and explains everything clearly. Do not use technical jargon (like "DNS cache", "drivers", "terminal command", "IP configuration", "reinstall OS", "partition").

Please diagnose the following situation:
- Device type: ${deviceType}
- Operating System / Brand details: ${os || "Not specified / Not sure"}
- Selected symptoms: ${symptoms && symptoms.length > 0 ? symptoms.join(", ") : "None"}
- In their own words (custom symptom description): "${customSymptom || "None provided"}"
- They are 100% sure these are NOT happening (Negative symptoms): ${negativeSymptoms && negativeSymptoms.length > 0 ? negativeSymptoms.join(", ") : "None"}
- Things they already tried that DID NOT solve the problem: ${failedAttempts && failedAttempts.length > 0 ? failedAttempts.join(", ") : "None"}

Please return a comforting explanation and step-by-step DIY solution in BOTH English and a beautiful, warm, comforting Egyptian Arabic translation (العربية العامية المصرية) written in a friendly, oral-like comforting manner as if a grandchild is speaking directly to their grandparent in Egypt (e.g., using words like 'يا جدي / يا جدتي / يا غالي', 'اطمن خالص', 'متقلقش أنت معملتش حاجة غلط', 'زرار الباور', 'سلك الكهربا').
Since they are easily confused, describe physical actions (where buttons are, what they look like, e.g., "Look for the button with a circle and a line through it on the side"). Keep steps very short, clear, and reassuring.

Generate the response in JSON format.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            problemName: {
              type: Type.STRING,
              description: "A very simple, non-scary, layperson-friendly name for the problem (e.g., 'Unresponsive Router' or 'Silent Speaker')"
            },
            problemNameAr: {
              type: Type.STRING,
              description: "The Arabic translation of problemName, translated into warm, comforting Egyptian Arabic (e.g., 'الشاشة معلقة' or 'سماعة التلفزيون ساكتة')"
            },
            explanation: {
              type: Type.STRING,
              description: "A warm, reassuring explanation of why this is happening (using a friendly, reassuring tone, in 2-3 simple sentences). Reassure them that this is a very common issue and they did nothing wrong."
            },
            explanationAr: {
              type: Type.STRING,
              description: "The Arabic translation of the explanation in highly comforting, loving, and conversational Egyptian Arabic (using phrases like 'متقلقش خالص، ده موضوع بسيط وبيحصل كتير')."
            },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 5 extremely simple, numbered steps. Each step must be a single, easy action. Focus on physical things they can see and touch (e.g., cables, buttons, icons). Mention what to look for and count seconds if waiting."
            },
            stepsAr: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Arabic translations of each item in the steps array, matching the exact order, written in very clear, physical, conversational Egyptian Arabic directions."
            },
            youtubeSearchQuery: {
              type: Type.STRING,
              description: "An optimized YouTube search query designed for beginners/seniors to find a video helper (e.g., 'how to turn on silent iphone simple tutorial step by step')"
            },
            googleSearchQuery: {
              type: Type.STRING,
              description: "An optimized Google search query for simple fixes"
            },
            alternativeProblemName: {
              type: Type.STRING,
              description: "A friendly name for a backup/alternative problem if the first diagnosis turns out to be wrong."
            },
            alternativeProblemNameAr: {
              type: Type.STRING,
              description: "The Arabic translation of the alternativeProblemName in warm Egyptian Arabic."
            },
            alternativeSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Backup troubleshooting steps if the first set of steps didn't change anything."
            },
            alternativeStepsAr: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Arabic translations of each item in the alternativeSteps array, in conversational Egyptian Arabic directions."
            }
          },
          required: [
            "problemName", "problemNameAr", 
            "explanation", "explanationAr", 
            "steps", "stepsAr", 
            "youtubeSearchQuery", "googleSearchQuery", 
            "alternativeProblemName", "alternativeProblemNameAr", 
            "alternativeSteps", "alternativeStepsAr"
          ]
        }
      }
    });

    const resultText = response.text?.trim() || "{}";
    const data = JSON.parse(resultText);

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error("Diagnosis error:", error);
    res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: error.message || "An error occurred during diagnostics."
    });
  }
});

// Vite Server Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
