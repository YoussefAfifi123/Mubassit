import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.status(200).json({
      success: false,
      error: "NO_API_KEY",
      message: "Gemini API key is not configured. Running in local diagnostics mode."
    });
  }

  try {
    const { deviceType, os, symptoms, customSymptom, negativeSymptoms, failedAttempts } = req.body || {};

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

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
      model: "gemini-2.5-flash",
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

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      success: false,
      error: "GEMINI_ERROR",
      message: error?.message || "An error occurred while generating AI response."
    });
  }
}
