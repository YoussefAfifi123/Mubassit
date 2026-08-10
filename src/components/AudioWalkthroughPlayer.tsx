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
    };
  }, []);

  // Sync back spoken index to parent for step highlighting
  useEffect(() => {
    onActiveSpokenIndexChange(currentIndex);
  }, [currentIndex, onActiveSpokenIndexChange]);

  // Read a specific item
  const speakCurrentItem = () => {
    if (!synthRef.current || currentIndex === null) return;

    // Cancel anything currently playing
    synthRef.current.cancel();

    let textToSpeak = "";
    
    if (currentIndex === -2) {
      textToSpeak = language === "ar" 
        ? `الحل المقترح هو: ${problemName}` 
        : `Suggested Solution: ${problemName}`;
    } else if (currentIndex === -1) {
      textToSpeak = language === "ar"
        ? `التفسير: ${explanation}`
        : `Explanation: ${explanation}`;
    } else if (currentIndex >= 0 && currentIndex < steps.length) {
      const stepNum = currentIndex + 1;
      textToSpeak = language === "ar"
        ? `الخطوة ${stepNum}: ${steps[currentIndex]}`
        : `Step ${stepNum}: ${steps[currentIndex]}`;
    }

    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Configure language
    utterance.lang = language === "ar" ? "ar-EG" : "en-US";

    // Attempt to bind a specific voice if available
    const targetLang = language === "ar" ? "ar" : "en";
    const foundVoice = availableVoices.find(v => v.lang.toLowerCase().startsWith(targetLang));
    if (foundVoice) {
      utterance.voice = foundVoice;
    }

    // Set voice properties for clear reading (a bit slower for seniors)
    utterance.rate = language === "ar" ? 0.85 : 0.82;
    utterance.pitch = 1.05; // Slightly warmer/friendlier tone

    utterance.onend = () => {
      // Automatically advance to the next item
      if (currentIndex < maxIndex) {
        setCurrentIndex(prev => (prev !== null ? prev + 1 : null));
      } else {
        // Finished everything!
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
    if (!synthRef.current) {
      alert("Text-to-speech is not supported in this browser. Try on Chrome, Safari, or Edge!");
      return;
    }

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
      // Start from the beginning if no index is active
      if (currentIndex === null) {
        setCurrentIndex(-2);
      } else {
        speakCurrentItem();
      }
    }
  };

  const handlePause = () => {
    if (synthRef.current) {
      synthRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
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
    // If we were playing, the language change triggers the speech refresh automatically
  };

  const getStatusText = () => {
    if (currentIndex === null) {
      return language === "ar" ? "اضغط تشغيل للبدء في الاستماع" : "Click Play to listen aloud";
    }
    if (currentIndex === -2) {
      return language === "ar" ? "نقرأ الآن: اسم المشكلة" : "Now reading: Problem Name";
    }
    if (currentIndex === -1) {
      return language === "ar" ? "نقرأ الآن: الشرح البسيط" : "Now reading: Short Explanation";
    }
    return language === "ar" 
      ? `نقرأ الآن: الخطوة رقم ${currentIndex + 1}` 
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
                ? "اسمع الخطوات مشروحة ببطء وبلهجة مصرية واضحة." 
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
          ? "💡 تلميح: لو حابب تسمع خطوة معينة تاني، اضغط عليها في القايمة تحت وهيتم تحديدها وقراءتها!"
          : "💡 Tip: You can jump back or forward anytime using the left and right arrows."}
      </p>
    </div>
  );
}
