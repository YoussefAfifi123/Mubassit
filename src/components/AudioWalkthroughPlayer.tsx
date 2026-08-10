import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, SkipForward, SkipBack, Volume2, Languages } from "lucide-react";
import { DiagnosticResult } from "../types";

interface AudioWalkthroughPlayerProps {
  diagnosisResult: DiagnosticResult;
  triedAlternative: boolean;
  language: "en" | "ar";
  onLanguageChange: (lang: "en" | "ar") => void;
  onActiveSpokenIndexChange: (index: number | null) => void;
}

const ARABIC_ORDINAL_STEPS = [
  "الأولى",
  "الثانية",
  "الثالثة",
  "الرابعة",
  "الخامسة",
  "السادسة",
  "السابعة",
  "الثامنة",
  "التاسعة",
  "العاشرة"
];

// Helper to convert digits to words in Arabic so speech engines never skip words or read just "1, 2, 3"
function prepareArabicSpeechText(text: string, stepIndex?: number): string {
  let cleaned = text.trim();

  if (stepIndex !== undefined && stepIndex >= 0) {
    const ordinal = ARABIC_ORDINAL_STEPS[stepIndex] || `رقم ${stepIndex + 1}`;
    cleaned = `الخطوة ${ordinal}: ${cleaned}`;
  }

  // Replace standalone numbers with spoken Arabic words
  cleaned = cleaned
    .replace(/\b10\b/g, 'عشرة')
    .replace(/\b1\b/g, 'واحد')
    .replace(/\b2\b/g, 'اتنين')
    .replace(/\b3\b/g, 'تلاتة')
    .replace(/\b4\b/g, 'أربعة')
    .replace(/\b5\b/g, 'خمسة')
    .replace(/\b6\b/g, 'ستة')
    .replace(/\b7\b/g, 'سبعة')
    .replace(/\b8\b/g, 'تمانية')
    .replace(/\b9\b/g, 'تسعة');

  return cleaned;
}

// Find best matching voice for a given language
function findBestVoice(voices: SpeechSynthesisVoice[], lang: "en" | "ar"): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  if (lang === "ar") {
    // 1. Egyptian Arabic dialect
    const egVoice = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l.includes('ar-eg') || l.includes('ar_eg');
    });
    if (egVoice) return egVoice;

    // 2. Any Arabic locale (ar-SA, ar-AE, etc.)
    const arVoice = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l.startsWith('ar') || l.startsWith('ara') || l === 'ar';
    });
    if (arVoice) return arVoice;

    // 3. Name contains Arabic or known Arabic voice names
    const arNameVoice = voices.find(v => {
      const n = v.name.toLowerCase();
      return n.includes('arabic') || n.includes('عرب') || n.includes('maged') || n.includes('tarik') || n.includes('laila') || n.includes('salma') || n.includes('hoda') || n.includes('naayf') || n.includes('zeina');
    });
    if (arNameVoice) return arNameVoice;

    return null;
  } else {
    return voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith('en')) || null;
  }
}

export function AudioWalkthroughPlayer({
  diagnosisResult,
  triedAlternative,
  language,
  onLanguageChange,
  onActiveSpokenIndexChange,
}: AudioWalkthroughPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // -2: Problem Name, -1: Explanation, 0..N: Steps
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioFallbackRef = useRef<HTMLAudioElement | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Get active texts based on current options
  const problemName = !triedAlternative 
    ? (language === "ar" ? diagnosisResult.problemNameAr || diagnosisResult.problemName : diagnosisResult.problemName)
    : (language === "ar" ? diagnosisResult.alternativeProblemNameAr || diagnosisResult.alternativeProblemName : diagnosisResult.alternativeProblemName);

  const explanation = language === "ar" 
    ? diagnosisResult.explanationAr || diagnosisResult.explanation 
    : diagnosisResult.explanation;

  const steps = !triedAlternative
    ? (language === "ar" ? diagnosisResult.stepsAr || diagnosisResult.steps : diagnosisResult.steps)
    : (language === "ar" ? diagnosisResult.alternativeStepsAr || diagnosisResult.alternativeSteps : diagnosisResult.alternativeSteps);

  // Total readable parts:
  // -2: Title / Problem Name
  // -1: Explanation
  // 0 to steps.length - 1: Each step
  const minIndex = -2;
  const maxIndex = steps.length - 1;

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      // Clean up speech when component unmounts
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (audioFallbackRef.current) {
        audioFallbackRef.current.pause();
        audioFallbackRef.current = null;
      }
    };
  }, []);

  // Sync back spoken index to parent for step highlighting
  useEffect(() => {
    onActiveSpokenIndexChange(currentIndex);
  }, [currentIndex, onActiveSpokenIndexChange]);

  const stopAllAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioFallbackRef.current) {
      audioFallbackRef.current.pause();
      audioFallbackRef.current.currentTime = 0;
      audioFallbackRef.current = null;
    }
  };

  // Read a specific item
  const speakCurrentItem = () => {
    if (currentIndex === null) return;

    stopAllAudio();

    let textToSpeak = "";
    
    if (currentIndex === -2) {
      textToSpeak = language === "ar" 
        ? `الحل المقترح هو: ${prepareArabicSpeechText(problemName)}` 
        : `Suggested Solution: ${problemName}`;
    } else if (currentIndex === -1) {
      textToSpeak = language === "ar"
        ? `التفسير البسيط: ${prepareArabicSpeechText(explanation)}`
        : `Explanation: ${explanation}`;
    } else if (currentIndex >= 0 && currentIndex < steps.length) {
      textToSpeak = language === "ar"
        ? prepareArabicSpeechText(steps[currentIndex], currentIndex)
        : `Step ${currentIndex + 1}: ${steps[currentIndex]}`;
    }

    if (!textToSpeak) return;

    // Fetch fresh voice list from browser
    const freshVoices = synthRef.current ? synthRef.current.getVoices() : availableVoices;
    const arabicVoice = language === "ar" ? findBestVoice(freshVoices, "ar") : null;
    const englishVoice = language === "en" ? findBestVoice(freshVoices, "en") : null;
    const chosenVoice = language === "ar" ? arabicVoice : englishVoice;

    // IF in Arabic mode AND the browser/OS has NO Arabic voice installed:
    // Fall back to server audio proxy `/api/tts` for 100% natural Arabic pronunciation
    if (language === "ar" && !arabicVoice) {
      const audioUrl = `/api/tts?text=${encodeURIComponent(textToSpeak)}&lang=ar`;
      const audio = new Audio(audioUrl);
      audioFallbackRef.current = audio;

      audio.onended = () => {
        if (currentIndex < maxIndex) {
          setCurrentIndex(prev => (prev !== null ? prev + 1 : null));
        } else {
          handleStop();
        }
      };

      audio.onerror = () => {
        console.warn("Audio fallback error, trying browser speech synthesis");
        // Fallback to synthesis if audio fails
        fallbackToWebSpeech(textToSpeak, null);
      };

      audio.play().then(() => {
        setIsPlaying(true);
        setIsPaused(false);
      }).catch(err => {
        console.warn("Audio play blocked/failed:", err);
        fallbackToWebSpeech(textToSpeak, null);
      });
      return;
    }

    // Otherwise use Web Speech API
    fallbackToWebSpeech(textToSpeak, chosenVoice);
  };

  const fallbackToWebSpeech = (textToSpeak: string, voice: SpeechSynthesisVoice | null) => {
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    utterance.lang = language === "ar" ? "ar-EG" : "en-US";
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = language === "ar" ? 0.85 : 0.82;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      if (currentIndex < maxIndex) {
        setCurrentIndex(prev => (prev !== null ? prev + 1 : null));
      } else {
        handleStop();
      }
    };

    utterance.onerror = (e) => {
      console.warn("Speech Synthesis utterance error:", e);
      if (isPlaying) {
        handleStop();
      }
    };

    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  // Re-run speech whenever index or language changes while playing
  useEffect(() => {
    if (currentIndex !== null && isPlaying && !isPaused) {
      speakCurrentItem();
    }
  }, [currentIndex, language]);

  const handlePlay = () => {
    if (isPaused) {
      if (audioFallbackRef.current) {
        audioFallbackRef.current.play();
      } else if (synthRef.current) {
        synthRef.current.resume();
      }
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
      if (currentIndex === null) {
        setCurrentIndex(-2);
      } else {
        speakCurrentItem();
      }
    }
  };

  const handlePause = () => {
    if (audioFallbackRef.current) {
      audioFallbackRef.current.pause();
    } else if (synthRef.current) {
      synthRef.current.pause();
    }
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    stopAllAudio();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(null);
  };

  const handleNext = () => {
    if (currentIndex === null) {
      setCurrentIndex(-2);
    } else if (currentIndex < maxIndex) {
      setCurrentIndex(prev => (prev !== null ? prev + 1 : null));
    }
  };

  const handlePrevious = () => {
    if (currentIndex === null) {
      setCurrentIndex(-2);
    } else if (currentIndex > minIndex) {
      setCurrentIndex(prev => (prev !== null ? prev - 1 : null));
    }
  };

  const handleLanguageToggle = () => {
    const nextLang = language === "en" ? "ar" : "en";
    onLanguageChange(nextLang);
  };

  const getStatusText = () => {
    if (currentIndex === null) {
      return language === "ar" ? "اضغط استماع لقراءة الخطوات بصوت واضح" : "Click Read to Me to listen aloud";
    }
    if (currentIndex === -2) {
      return language === "ar" ? "نقرأ الآن: اسم المشكلة" : "Now reading: Problem Name";
    }
    if (currentIndex === -1) {
      return language === "ar" ? "نقرأ الآن: الشرح البسيط" : "Now reading: Short Explanation";
    }
    return language === "ar" 
      ? `نقرأ الآن: الخطوة ${ARABIC_ORDINAL_STEPS[currentIndex] || currentIndex + 1}` 
      : `Now reading: Step ${currentIndex + 1} of ${steps.length}`;
  };

  return (
    <div className="bg-gradient-to-r from-[#ECF4F3] to-white border-2 border-[#4F7E7A]/20 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4" id="audio-walkthrough-panel">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#4F7E7A] text-white p-2 rounded-xl">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B2927] flex items-center gap-1.5">
              {language === "ar" ? "مساعد القراءة الصوتي البسيط" : "Grandchild's Audio Walkthrough"}
            </h3>
            <p className="text-xs text-[#7A746E]">
              {language === "ar" 
                ? "اسمع الخطوات مشروحة بصوت واضع وبسرعة مريحة." 
                : "Listen to the guide read aloud slowly and clearly."}
            </p>
          </div>
        </div>

        {/* LANGUAGE TOGGLE */}
        <button
          id="btn-toggle-speech-language"
          onClick={handleLanguageToggle}
          className="flex items-center gap-1.5 bg-white border border-[#EAE4DC] hover:border-[#4F7E7A] px-3 py-1.5 rounded-xl text-xs font-bold text-[#4F7E7A] transition-colors"
        >
          <Languages className="w-4 h-4" />
          {language === "en" ? "تبديل للعربية (مصر)" : "Switch to English"}
        </button>
      </div>

      {/* AUDIO STATE NOTIFICATION BAR */}
      <div className="bg-white/80 border border-[#EAE4DC] px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold text-[#5C5651]">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-green-500 animate-ping" : isPaused ? "bg-yellow-400" : "bg-gray-300"}`} />
          <span>{getStatusText()}</span>
        </div>
        {currentIndex !== null && (
          <span className="font-mono text-[10px] text-[#A59F99]">
            [{currentIndex === -2 ? "T" : currentIndex === -1 ? "E" : `S${currentIndex + 1}`}]
          </span>
        )}
      </div>

      {/* COMPACT PLAYER CONTROLS */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          id="btn-speech-prev"
          onClick={handlePrevious}
          disabled={currentIndex === null || currentIndex === minIndex}
          className="bg-white hover:bg-gray-50 border border-[#EAE4DC] text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed p-3 rounded-xl transition-all"
          title={language === "ar" ? "الخطوة السابقة" : "Previous segment"}
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {isPlaying ? (
          <button
            id="btn-speech-pause"
            onClick={handlePause}
            className="bg-[#4F7E7A] hover:bg-[#3B5F5C] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Pause className="w-4 h-4" /> {language === "ar" ? "إيقاف مؤقت" : "Pause"}
          </button>
        ) : (
          <button
            id="btn-speech-play"
            onClick={handlePlay}
            className="bg-[#D96B43] hover:bg-[#C45E39] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4" /> {language === "ar" ? "استماع للخطوات" : "Read to Me"}
          </button>
        )}

        <button
          id="btn-speech-stop"
          onClick={handleStop}
          disabled={currentIndex === null}
          className="bg-white hover:bg-gray-50 border border-[#EAE4DC] text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed p-3 rounded-xl transition-all"
          title={language === "ar" ? "إيقاف بالكامل" : "Stop walkthrough"}
        >
          <Square className="w-4 h-4" />
        </button>

        <button
          id="btn-speech-next"
          onClick={handleNext}
          disabled={currentIndex === null || currentIndex === maxIndex}
          className="bg-white hover:bg-gray-50 border border-[#EAE4DC] text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed p-3 rounded-xl transition-all"
          title={language === "ar" ? "الخطوة التالية" : "Next segment"}
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* QUICK TIP FOR ACCESSIBILITY */}
      <p className="text-[10px] text-center text-[#A59F99] leading-relaxed">
        {language === "ar" 
          ? "💡 تلميح: يتوفر الصوت باللغة العربية بوضوح ممتاز عبر تقنية تحويل النص إلى صوت."
          : "💡 Tip: You can jump back or forward anytime using the left and right arrows."}
      </p>
    </div>
  );
}

