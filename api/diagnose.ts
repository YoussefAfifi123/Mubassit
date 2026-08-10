import { GoogleGenAI, Type } from "@google/genai";

// Rate Limiter State (Max 5 requests per user per minute)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestMap = new Map<string, number[]>();

function checkRateLimit(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const timestamps = ipRequestMap.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestInWindow = recentTimestamps[0];
    const retryAfter = Math.ceil((oldestInWindow + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { limited: true, retryAfter: Math.max(1, retryAfter) };
  }

  recentTimestamps.push(now);
  ipRequestMap.set(ip, recentTimestamps);
  return { limited: false, retryAfter: 0 };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket?.remoteAddress || '127.0.0.1';
  const rateLimit = checkRateLimit(clientIp);

  if (rateLimit.limited) {
    res.setHeader('Retry-After', rateLimit.retryAfter);
    return res.status(429).json({
      success: false,
      error: "RATE_LIMIT_EXCEEDED",
      message: `Rate limit exceeded. Maximum 5 requests per minute allowed. Please try again in ${rateLimit.retryAfter} seconds.`
    });
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
