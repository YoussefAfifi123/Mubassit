import type { Request, Response } from "express";

function splitTextIntoChunks(text: string, maxLen = 170): string[] {
  if (text.length <= maxLen) return [text];
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length > maxLen) {
      if (current.trim()) chunks.push(current.trim());
      current = word;
    } else {
      current += (current ? " " : "") + word;
    }
  }
  if (current.trim()) {
    chunks.push(current.trim());
  }
  return chunks;
}

export default async function handler(req: any, res: any) {
  try {
    const text = ((req.query?.text || req.body?.text) as string || "").trim();
    const lang = ((req.query?.lang || req.body?.lang) as string || "ar").trim();

    if (!text) {
      return res.status(400).send("Text parameter is required");
    }

    const chunks = splitTextIntoChunks(text, 170);
    const buffers: Buffer[] = [];

    for (const chunk of chunks) {
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=${lang}&client=tw-ob`;
      const response = await fetch(ttsUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
      });

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        buffers.push(Buffer.from(arrayBuffer));
      }
    }

    if (buffers.length === 0) {
      return res.status(500).send("TTS generation failed");
    }

    const combinedBuffer = Buffer.concat(buffers);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(combinedBuffer);
  } catch (err) {
    console.error("TTS error:", err);
    return res.status(500).send("TTS server error");
  }
}
