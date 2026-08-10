import React, { useState, useEffect } from 'react';
import {
  Laptop,
  Smartphone,
  Wifi,
  Printer,
  Tv,
  HelpCircle,
  Apple,
  Chrome,
  Monitor,
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Search,
  BookOpen,
  Info,
  Copy,
  Plus,
  Minus,
  Sparkles,
  Phone,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Lightbulb,
  CornerDownRight,
  Heart,
  ExternalLink,
  Save,
  MessageSquare,
  Home,
  CheckCircle2,
  XCircle,
  FileText,
  Facebook,
  Eye,
  List,
  MapPin,
  MessageCircle,
  Share2
} from 'lucide-react';
import { DEVICES, OS_OPTIONS, SYMPTOMS, NEGATIVE_SYMPTOMS, getLocalDiagnostic, LOCAL_DIAGNOSTICS } from './data';
import { LOCAL_ARABIC_TRANSLATIONS } from './data_arabic';
import { DeviceType, DiagnosticResult, HistoryItem } from './types';
import { AudioWalkthroughPlayer } from './components/AudioWalkthroughPlayer';
import { VisualStepGuide } from './components/VisualStepGuide';
import { DeviceHardwareDiagram } from './components/DeviceHardwareDiagram';
import {
  TRANSLATIONS,
  TRANSLATED_DEVICES,
  TRANSLATED_SYMPTOMS,
  TRANSLATED_NEGATIVES,
  TRANSLATED_OS_OPTIONS,
  TRANSLATED_DEVICE_SELECTIONS
} from './translations';

// Simple helper to render Lucide Icons by name dynamically
const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Laptop': return <Laptop className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'Printer': return <Printer className={className} />;
    case 'Tv': return <Tv className={className} />;
    case 'Monitor': return <Monitor className={className} />;
    case 'Apple': return <Apple className={className} />;
    case 'Chrome': return <Chrome className={className} />;
    case 'Facebook': return <Facebook className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

export default function App() {
  // --- UI Preferences ---
  const [largeText, setLargeText] = useState<boolean>(() => {
    return localStorage.getItem('tts_large_text') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('tts_large_text', largeText.toString());
  }, [largeText]);

  // --- Step Tracking ---
  // Steps: 'intro' | 'device' | 'os' | 'symptoms' | 'negatives' | 'tried' | 'results'
  const [currentStep, setCurrentStep] = useState<string>('intro');
  const [showOsGuide, setShowOsGuide] = useState<boolean>(false);

  // --- Diagnostic State ---
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);
  const [selectedOs, setSelectedOs] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState<string>('');
  const [selectedNegatives, setSelectedNegatives] = useState<string[]>([]);
  const [failedAttempts, setFailedAttempts] = useState<string[]>([]);
  const [newFailedAttempt, setNewFailedAttempt] = useState<string>('');

  // --- Results & AI Diagnostics State ---
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosticResult | null>(null);
  const [isUsingAi, setIsUsingAi] = useState<boolean>(true);
  const [triedAlternative, setTriedAlternative] = useState<boolean>(false);
  const [walkthroughLang, setWalkthroughLang] = useState<"en" | "ar">("en");
  const [activeSpokenIndex, setActiveSpokenIndex] = useState<number | null>(null);
  const [guideViewMode, setGuideViewMode] = useState<'visual' | 'simple' | 'hardware_map'>('visual');
  const [completedStepIndices, setCompletedStepIndices] = useState<number[]>([]);

  // Active translation dictionary
  const t = TRANSLATIONS[walkthroughLang];

  // --- Saved Chest & Relative Helper Note ---
  const [savedFixes, setSavedFixes] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('tts_saved_fixes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [relativeName, setRelativeName] = useState<string>('Youssef');
  const [generatedNote, setGeneratedNote] = useState<string>('');
  const [showNoteGenerator, setShowNoteGenerator] = useState<boolean>(false);
  const [copiedNote, setCopiedNote] = useState<boolean>(false);
  const [helperPhone, setHelperPhone] = useState<string>('');
  const [showWhatsappModal, setShowWhatsappModal] = useState<boolean>(false);

  // Send to WhatsApp helper
  const sendToWhatsApp = (phoneNum?: string, customText?: string) => {
    let messageText = customText || generatedNote;
    if (!messageText) {
      if (diagnosisResult && selectedDevice) {
        const transDevice = walkthroughLang === "ar"
          ? (TRANSLATED_DEVICES.ar[selectedDevice] || 'الجهاز')
          : (TRANSLATED_DEVICES.en[selectedDevice] || 'device');
        const probName = triedAlternative
          ? (walkthroughLang === 'ar' ? (diagnosisResult.alternativeProblemNameAr || diagnosisResult.alternativeProblemName) : diagnosisResult.alternativeProblemName)
          : (walkthroughLang === 'ar' ? (diagnosisResult.problemNameAr || diagnosisResult.problemName) : diagnosisResult.problemName);

        if (walkthroughLang === 'ar') {
          messageText = `أهلاً يا غالي! أنا بستخدم موقع مُبَسِّط وبحاول أحل مشكلة في الـ ${transDevice} بتاعي ("${probName}").\nممكن تساعدني نبص عليه سوا لما تكون فاضي؟ ❤️`;
        } else {
          messageText = `Hi! I am using Mubassitt to troubleshoot an issue with my ${transDevice} ("${probName}").\nCould you help me take a look when you have a moment? ❤️`;
        }
      } else {
        messageText = walkthroughLang === 'ar'
          ? `أهلاً! أنا بستخدم موقع مُبَسِّط للتعامل مع مشكلة في جهازي، ومحتاج مساعدتك شوية لو فاضي ❤️`
          : `Hi! I am using Mubassitt to troubleshoot a tech issue and could use your help when you have a moment ❤️`;
      }
    }

    const cleanPhone = (phoneNum || helperPhone || '').replace(/[^0-9]/g, '');
    const url = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  // Save history helper
  const handleSaveFix = () => {
    if (!diagnosisResult || !selectedDevice) return;
    const resolvedProblemName = triedAlternative
      ? (walkthroughLang === "ar" ? diagnosisResult.alternativeProblemNameAr || diagnosisResult.alternativeProblemName : diagnosisResult.alternativeProblemName)
      : (walkthroughLang === "ar" ? diagnosisResult.problemNameAr || diagnosisResult.problemName : diagnosisResult.problemName);

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString(walkthroughLang === "ar" ? "ar-EG" : "en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
      deviceType: selectedDevice,
      problemName: resolvedProblemName,
      resolved: true
    };
    const updated = [newItem, ...savedFixes];
    setSavedFixes(updated);
    localStorage.setItem('tts_saved_fixes', JSON.stringify(updated));
    
    alert(t.favouriteSavedAlert);
  };

  const handleRemoveSaved = (id: string) => {
    const updated = savedFixes.filter(item => item.id !== id);
    setSavedFixes(updated);
    localStorage.setItem('tts_saved_fixes', JSON.stringify(updated));
  };

  // Run Diagnosis
  const handleRunDiagnosis = async () => {
    if (!selectedDevice) return;
    setIsDiagnosing(true);
    setCurrentStep('results');
    setTriedAlternative(false);
    setCompletedStepIndices([]);

    try {
      // 1. Attempt server-side Gemini AI
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceType: selectedDevice,
          os: selectedOs,
          symptoms: selectedSymptoms,
          customSymptom: customSymptom,
          negativeSymptoms: selectedNegatives,
          failedAttempts: failedAttempts
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setDiagnosisResult(resData.data);
        setIsUsingAi(true);
      } else {
        // Fall back to robust local database if server or API has an issue
        const localData = getLocalDiagnostic(selectedDevice, selectedSymptoms);
        setDiagnosisResult(localData);
        setIsUsingAi(false);
      }
    } catch (err) {
      console.warn("Diagnostics error, falling back to local database:", err);
      const localData = getLocalDiagnostic(selectedDevice, selectedSymptoms);
      setDiagnosisResult(localData);
      setIsUsingAi(false);
    } finally {
      setIsDiagnosing(false);
    }
  };

  // Generate a note to relatives/helpers
  const handleGenerateNote = () => {
    if (!selectedDevice || !diagnosisResult) return;
    if (walkthroughLang === 'ar') {
      const transDevice = TRANSLATED_DEVICES.ar[selectedDevice] || TRANSLATED_DEVICES.ar.other;
      const transProblemName = triedAlternative
        ? (diagnosisResult.alternativeProblemNameAr || diagnosisResult.alternativeProblemName)
        : (diagnosisResult.problemNameAr || diagnosisResult.problemName);
      
      const transSymptoms = selectedSymptoms.map(id => TRANSLATED_SYMPTOMS.ar[id] || id);
      const transNegatives = selectedNegatives.map(id => TRANSLATED_NEGATIVES.ar[id] || id);
      
      const noteAr = `أهلاً يا ${relativeName || 'غالي'}! أنا بحاول أحل مشكلة في الـ ${transDevice} بتاعي.

وشكله فيه مشكلة اسمها "${transProblemName}".

دي التفاصيل اللي بتظهرلي:
• الأعراض: ${transSymptoms.join("، ") || "تصرف غريب ومحير"}${customSymptom ? ` (${customSymptom})` : ''}
• أنا متأكد إن الحاجات دي سليمة: ${transNegatives.join("، ") || "كل حاجة تانية تمام"}
• أنا جربت أعمل: ${failedAttempts.join("، ") || "إعادة تشغيل بسيطة بس لسه محلش المشكلة"}

لو فاضي شوية النهاردة أو في الويك إند، ممكن تساعدني نبص عليه سوا؟ مفيش أي استعجال خالص يا حبيبي! كل الحب والتقدير. ❤️`;
      setGeneratedNote(noteAr);
    } else {
      const deviceLabel = TRANSLATED_DEVICES.en[selectedDevice] || "device";
      const transProblemName = triedAlternative ? diagnosisResult.alternativeProblemName : diagnosisResult.problemName;
      const transSymptoms = selectedSymptoms.map(id => TRANSLATED_SYMPTOMS.en[id] || id);
      const transNegatives = selectedNegatives.map(id => TRANSLATED_NEGATIVES.en[id] || id);

      const note = `Hi ${relativeName || 'there'}! I am trying to troubleshoot an issue with my ${deviceLabel}. 

It seems to be having a problem called "${transProblemName}". 

Here is what is happening:
• Symptoms: ${transSymptoms.join(", ") || "Unusual behavior"}${customSymptom ? ` (${customSymptom})` : ''}
• I am sure that: ${transNegatives.join(", ") || "Nothing abnormal elsewhere"}
• I tried: ${failedAttempts.join(", ") || "doing a reset, but it didn't solve it yet"}

If you have a moment later or on the weekend, could you help me take a look? No rush at all! Sending love. ❤️`;
      setGeneratedNote(note);
    }
    setShowNoteGenerator(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  // Custom failed attempt adder
  const addFailedAttempt = () => {
    if (!newFailedAttempt.trim()) return;
    setFailedAttempts([...failedAttempts, newFailedAttempt.trim()]);
    setNewFailedAttempt('');
  };

  const removeFailedAttempt = (index: number) => {
    setFailedAttempts(failedAttempts.filter((_, i) => i !== index));
  };

  // Reset entire flow
  const resetFlow = () => {
    setSelectedDevice(null);
    setSelectedOs('');
    setSelectedSymptoms([]);
    setCustomSymptom('');
    setSelectedNegatives([]);
    setFailedAttempts([]);
    setDiagnosisResult(null);
    setCurrentStep('intro');
    setShowOsGuide(false);
    setShowNoteGenerator(false);
    // Keep active language so toggle state is persistent across restarts!
    setActiveSpokenIndex(null);
  };

  // Text size styles helper
  const textClass = (normal: string, large: string) => {
    return largeText ? large : normal;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B2927] font-sans selection:bg-[#EAE4DC]" dir={walkthroughLang === "ar" ? "rtl" : "ltr"}>
      {/* HEADER BAR */}
      <header className="border-b border-[#EAE4DC] bg-white sticky top-0 z-50 shadow-sm" id="main-header">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetFlow} id="logo-container">
            <div className="bg-[#D96B43] text-white p-2.5 rounded-2xl shadow-sm hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl tracking-wide text-[#2B2927] flex items-center gap-2">
                {t.brandTitle}
              </h1>
              <p className="text-xs text-[#7A746E]">{t.brandSubtitle}</p>
            </div>
          </div>

          {/* ADJUSTABLE ACCESSIBILITY TOOLBAR */}
          <div className="flex flex-wrap items-center gap-3" id="accessibility-toolbar">
            {/* LANGUAGE TOGGLE SWITCH */}
            <div className="bg-[#FAF8F5] rounded-xl p-1 flex items-center border border-[#EAE4DC]" id="language-switcher">
              <button
                id="btn-lang-en"
                onClick={() => setWalkthroughLang("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  walkthroughLang === "en"
                    ? 'bg-white text-[#2B2927] shadow-sm'
                    : 'text-[#7A746E] hover:text-[#2B2927]'
                }`}
              >
                English
              </button>
              <button
                id="btn-lang-ar"
                onClick={() => setWalkthroughLang("ar")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  walkthroughLang === "ar"
                    ? 'bg-white text-[#D96B43] shadow-sm'
                    : 'text-[#7A746E] hover:text-[#2B2927]'
                }`}
              >
                العربية
              </button>
            </div>

            {/* TEXT SIZE BAR */}
            <div className="bg-[#FAF8F5] rounded-xl p-1 flex items-center border border-[#EAE4DC]">
              <span className="text-xs text-[#7A746E] px-2.5 font-medium">{t.textSizeLabel}</span>
              <button
                id="btn-font-normal"
                onClick={() => setLargeText(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !largeText
                    ? 'bg-white text-[#2B2927] shadow-sm'
                    : 'text-[#7A746E] hover:text-[#2B2927]'
                }`}
              >
                {t.normalTextBtn}
              </button>
              <button
                id="btn-font-large"
                onClick={() => setLargeText(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  largeText
                    ? 'bg-white text-[#D96B43] shadow-sm border border-[#F5D8CE]'
                    : 'text-[#7A746E] hover:text-[#2B2927]'
                }`}
              >
                <Plus className="w-3 h-3" /> {t.extraClearTextBtn}
              </button>
            </div>

            {/* WHATSAPP HELP BUTTON */}
            <button
              id="btn-whatsapp-header"
              onClick={() => {
                if (diagnosisResult && !generatedNote) {
                  handleGenerateNote();
                }
                setShowWhatsappModal(true);
              }}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>{t.whatsappHelpBtn}</span>
            </button>

            {currentStep !== 'intro' && (
              <button
                id="btn-header-home"
                onClick={resetFlow}
                className="flex items-center gap-1 text-sm font-semibold text-[#4F7E7A] hover:text-[#3B5F5C] bg-[#ECF4F3] px-3.5 py-1.5 rounded-xl transition-colors"
              >
                <Home className="w-4 h-4" /> {t.homeBtn}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-20">
        
        {/* --- INTRO SCREEN --- */}
        {currentStep === 'intro' && (
          <div className="space-y-8 animate-fade-in" id="intro-view">
            {/* WARM HERO SECTION */}
            <div className="bg-white border border-[#EAE4DC] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF8F5] rounded-bl-full opacity-60 pointer-events-none" />
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-[#ECF4F3] text-[#4F7E7A] font-semibold text-xs px-3 py-1.5 rounded-full">
                  <Heart className="w-3.5 h-3.5 fill-[#4F7E7A]" /> {t.designedWithCare}
                </span>
                <h2 className={`font-serif font-bold text-2xl sm:text-3xl text-[#2B2927] leading-tight ${textClass('', 'text-3xl sm:text-4xl')}`}>
                  {t.introTitle}
                </h2>
                <p className={`text-[#5C5651] leading-relaxed ${textClass('text-base', 'text-lg')}`}>
                  {t.introDesc}
                </p>
                <div className="pt-4">
                  <button
                    id="btn-start-troubleshooting"
                    onClick={() => {
                      setSelectedDevice(null);
                      setCurrentStep('device');
                    }}
                    className="bg-[#D96B43] hover:bg-[#C45E39] text-white font-bold px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-lg cursor-pointer"
                  >
                    {t.startBtn} {walkthroughLang === "ar" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* THREE STEPS EXPLANATION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="three-steps-info">
              <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-[#FAF8F5] rounded-xl flex items-center justify-center font-bold text-lg text-[#D96B43] border border-[#EAE4DC]">
                  1
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2B2927]">{t.step1Title}</h3>
                <p className="text-sm text-[#7A746E]">{t.step1Desc}</p>
              </div>

              <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-[#FAF8F5] rounded-xl flex items-center justify-center font-bold text-lg text-[#4F7E7A] border border-[#EAE4DC]">
                  2
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2B2927]">{t.step2Title}</h3>
                <p className="text-sm text-[#7A746E]">{t.step2Desc}</p>
              </div>

              <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-[#FAF8F5] rounded-xl flex items-center justify-center font-bold text-lg text-[#D96B43] border border-[#EAE4DC]">
                  3
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2B2927]">{t.step3Title}</h3>
                <p className="text-sm text-[#7A746E]">{t.step3Desc}</p>
              </div>
            </div>

            {/* SAVED SOLUTIONS CHEST */}
            {savedFixes.length > 0 && (
              <div className="bg-[#FAF8F5] border-2 border-dashed border-[#EAE4DC] rounded-3xl p-6 space-y-4" id="saved-solutions-chest">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                  <h3 className="font-serif font-bold text-lg text-[#2B2927]">{t.favouritesHeader}</h3>
                </div>
                <p className="text-xs text-[#7A746E] -mt-2">{t.favouritesSub}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedFixes.map((item) => {
                    const devMeta = DEVICES.find(d => d.id === item.deviceType);
                    const localizedDevLabel = TRANSLATED_DEVICE_SELECTIONS[walkthroughLang][item.deviceType]?.label || devMeta?.label;
                    return (
                      <div key={item.id} className="bg-white border border-[#EAE4DC] p-4 rounded-xl flex items-start justify-between gap-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {devMeta && <IconRenderer name={devMeta.iconName} className="w-4 h-4 text-[#7A746E]" />}
                            <span className="text-xs font-semibold text-[#7A746E]">{localizedDevLabel}</span>
                          </div>
                          <h4 className="font-bold text-sm text-[#2B2927]">{item.problemName}</h4>
                          <p className="text-[10px] text-[#A59F99]">{t.savedOn} {item.timestamp}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setSelectedDevice(item.deviceType);
                              
                              // Find matching diagnostic from LOCAL_DIAGNOSTICS
                              let foundDiag = null;
                              const cat = LOCAL_DIAGNOSTICS[item.deviceType];
                              if (cat) {
                                for (const key of Object.keys(cat)) {
                                  const diag = cat[key];
                                  // Check English match
                                  if (diag.problemName === item.problemName) {
                                    foundDiag = getLocalDiagnostic(item.deviceType, [key]);
                                    setTriedAlternative(false);
                                    break;
                                  }
                                  if (diag.alternativeProblemName === item.problemName) {
                                    foundDiag = getLocalDiagnostic(item.deviceType, [key]);
                                    setTriedAlternative(true);
                                    break;
                                  }
                                  // Check Arabic match
                                  const arTrans = LOCAL_ARABIC_TRANSLATIONS[item.deviceType]?.[key];
                                  if (arTrans) {
                                    if (arTrans.problemNameAr === item.problemName) {
                                      foundDiag = getLocalDiagnostic(item.deviceType, [key]);
                                      setTriedAlternative(false);
                                      break;
                                    }
                                    if (arTrans.alternativeProblemNameAr === item.problemName) {
                                      foundDiag = getLocalDiagnostic(item.deviceType, [key]);
                                      setTriedAlternative(true);
                                      break;
                                    }
                                  }
                                }
                              }

                              if (!foundDiag) {
                                foundDiag = getLocalDiagnostic(item.deviceType, []);
                                setTriedAlternative(false);
                              }
                              
                              setDiagnosisResult(foundDiag);
                              setCurrentStep('results');
                            }}
                            className="text-xs font-semibold text-[#4F7E7A] hover:underline flex items-center gap-0.5"
                          >
                            {t.open} {walkthroughLang === "ar" ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                          </button>
                          <button
                            onClick={() => handleRemoveSaved(item.id)}
                            className="text-[10px] text-red-500 hover:underline"
                          >
                            {t.remove}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- STEP 1: DEVICE SELECT --- */}
        {currentStep === 'device' && (
          <div className="space-y-6 animate-fade-in" id="device-selection-view">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B43]">{t.step1Of5}</span>
              <h2 className={`font-serif font-bold text-2xl text-[#2B2927] ${textClass('text-2xl', 'text-3xl')}`}>
                {t.deviceScreenTitle}
              </h2>
              <p className="text-[#5C5651] text-sm">{t.deviceScreenDesc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="device-cards-grid">
              {DEVICES.map((dev) => {
                const localizedMeta = TRANSLATED_DEVICE_SELECTIONS[walkthroughLang][dev.id];
                return (
                  <button
                    key={dev.id}
                    id={`device-card-${dev.id}`}
                    onClick={() => {
                      setSelectedDevice(dev.id);
                      // If device is other, facebook, whatsapp, or messenger, skip OS step
                      if (dev.id === 'other' || dev.id === 'facebook' || dev.id === 'whatsapp' || dev.id === 'messenger') {
                        setSelectedOs('unknown');
                        setCurrentStep('symptoms');
                      } else {
                        setSelectedOs('');
                        setCurrentStep('os');
                      }
                    }}
                    className={`bg-white border-2 border-[#EAE4DC] hover:border-[#D96B43] rounded-2xl p-6 hover:shadow-md transition-all group flex flex-col justify-between h-48 cursor-pointer ${
                      walkthroughLang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="bg-[#FAF8F5] group-hover:bg-[#FDF6F3] p-3 rounded-xl inline-block border border-[#EAE4DC] group-hover:border-[#F5D8CE] transition-all self-start">
                      <IconRenderer name={dev.iconName} className="w-8 h-8 text-[#5C5651] group-hover:text-[#D96B43] transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#2B2927] group-hover:text-[#D96B43] transition-colors">
                        {localizedMeta.label}
                      </h3>
                      <p className="text-xs text-[#7A746E] line-clamp-2 mt-1">{localizedMeta.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-[#EAE4DC]">
              <button
                id="btn-back-to-intro"
                onClick={() => setCurrentStep('intro')}
                className="flex items-center gap-1 text-sm font-semibold text-[#7A746E] hover:text-[#2B2927] px-4 py-2"
              >
                {walkthroughLang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />} {t.homeBtn}
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: OS SELECT (OR DEVICE TYPE SPECIFIC) --- */}
        {currentStep === 'os' && selectedDevice && (
          <div className="space-y-6 animate-fade-in" id="os-selection-view">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B43]">{t.step2Of5}</span>
              <h2 className={`font-serif font-bold text-2xl text-[#2B2927] ${textClass('text-2xl', 'text-3xl')}`}>
                {t.osScreenTitle}
              </h2>
              <p className="text-[#5C5651] text-sm">{t.osScreenDesc}</p>
            </div>

            {/* MAIN CHOICE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="os-cards-grid">
              {OS_OPTIONS[selectedDevice as Exclude<DeviceType, 'other' | 'facebook' | 'whatsapp' | 'messenger'>]?.map((opt) => {
                const localizedOpt = TRANSLATED_OS_OPTIONS[walkthroughLang][opt.id as keyof typeof TRANSLATED_OS_OPTIONS['en']] || opt;
                return (
                  <button
                    key={opt.id}
                    id={`os-card-${opt.id}`}
                    onClick={() => {
                      setSelectedOs(opt.id);
                      if (opt.id === 'unknown') {
                        setShowOsGuide(true);
                      } else {
                        setShowOsGuide(false);
                        setCurrentStep('symptoms');
                      }
                    }}
                    className={`bg-white border-2 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer ${
                      selectedOs === opt.id ? 'border-[#D96B43] bg-[#FDF6F3]' : 'border-[#EAE4DC] hover:border-[#D96B43]'
                    } ${walkthroughLang === "ar" ? "text-right" : "text-left"}`}
                  >
                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EAE4DC] shrink-0 self-start">
                      <IconRenderer name={opt.iconName} className="w-6 h-6 text-[#5C5651]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-[#2B2927]">{localizedOpt.label}</h3>
                      <p className="text-xs text-[#7A746E] leading-relaxed">{localizedOpt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* --- VISUAL 'HELP ME FIND OUT' GUIDE --- */}
            {showOsGuide && (
              <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-2xl p-6 space-y-6" id="help-me-find-out-guide">
                <div className="flex items-center gap-2 border-b border-[#EAE4DC] pb-3">
                  <Info className="w-5 h-5 text-[#4F7E7A]" />
                  <h3 className="font-serif font-bold text-base text-[#2B2927]">
                    {t.visualGuideHeader}
                  </h3>
                </div>

                {selectedDevice === 'laptop_computer' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="computer-os-illustrations">
                    <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Apple className="w-5 h-5 text-gray-800" />
                          <span className="font-bold text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">Apple Mac</span>
                        </div>
                        <p className="text-xs text-[#5C5651] leading-relaxed">
                          {t.guideMacDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOs('macos');
                          setCurrentStep('symptoms');
                          setShowOsGuide(false);
                        }}
                        className="w-full bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guideMacBtn}
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Monitor className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-xs bg-blue-50 px-2 py-0.5 rounded text-blue-700">Windows PC</span>
                        </div>
                        <p className="text-xs text-[#5C5651] leading-relaxed">
                          {t.guideWinDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOs('windows');
                          setCurrentStep('symptoms');
                          setShowOsGuide(false);
                        }}
                        className="w-full bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guideWinBtn}
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Chrome className="w-5 h-5 text-yellow-500" />
                          <span className="font-bold text-xs bg-yellow-50 px-2 py-0.5 rounded text-yellow-700">Chromebook</span>
                        </div>
                        <p className="text-xs text-[#5C5651] leading-relaxed">
                          {t.guideChromeDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOs('chromebook');
                          setCurrentStep('symptoms');
                          setShowOsGuide(false);
                        }}
                        className="w-full bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guideChromeBtn}
                      </button>
                    </div>
                  </div>
                )}

                {selectedDevice === 'phone_tablet' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="phone-os-illustrations">
                    <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Apple className="w-5 h-5 text-gray-800" />
                          <span className="font-bold text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">Apple iPhone / iPad</span>
                        </div>
                        <p className="text-xs text-[#5C5651] leading-relaxed">
                          {t.guideIosDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOs('ios');
                          setCurrentStep('symptoms');
                          setShowOsGuide(false);
                        }}
                        className="w-full bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guideIosBtn}
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-xs bg-green-50 px-2 py-0.5 rounded text-green-700">Android</span>
                        </div>
                        <p className="text-xs text-[#5C5651] leading-relaxed">
                          {t.guideAndroidDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOs('android');
                          setCurrentStep('symptoms');
                          setShowOsGuide(false);
                        }}
                        className="w-full bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guideAndroidBtn}
                      </button>
                    </div>
                  </div>
                )}

                {selectedDevice === 'printer' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="printer-os-illustrations">
                    <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] space-y-3 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#2B2927]">{walkthroughLang === 'ar' ? 'طابعة ألوان سائلة (خرطوشة حبر)' : 'Inkjet (Liquid Cartridges)'}</h4>
                        <p className="text-xs text-[#5C5651] mt-1 leading-relaxed">
                          {t.guideInkjetDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOs('inkjet');
                          setCurrentStep('symptoms');
                          setShowOsGuide(false);
                        }}
                        className="w-full bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guideInkjetBtn}
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] space-y-3 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#2B2927]">{walkthroughLang === 'ar' ? 'طابعة ليزر (درام أو حبر جاف)' : 'Laser (Toner Cylinder)'}</h4>
                        <p className="text-xs text-[#5C5651] mt-1 leading-relaxed">
                          {t.guideLaserDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedOs('laser');
                          setCurrentStep('symptoms');
                          setShowOsGuide(false);
                        }}
                        className="w-full bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guideLaserBtn}
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSelectedOs('unknown');
                      setCurrentStep('symptoms');
                      setShowOsGuide(false);
                    }}
                    className="text-xs text-[#7A746E] hover:underline cursor-pointer"
                  >
                    {t.skipGuideBtn}
                  </button>
                </div>
              </div>
            )}

            {/* BUTTON FOOTER */}
            <div className="flex justify-between pt-4 border-t border-[#EAE4DC]">
              <button
                id="btn-back-to-device"
                onClick={() => {
                  setSelectedOs('');
                  setCurrentStep('device');
                  setShowOsGuide(false);
                }}
                className="flex items-center gap-1 text-sm font-semibold text-[#7A746E] hover:text-[#2B2927] px-4 py-2 cursor-pointer"
              >
                {walkthroughLang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />} {t.goBackBtn}
              </button>

              {selectedOs && selectedOs !== 'unknown' && (
                <button
                  id="btn-next-to-symptoms"
                  onClick={() => {
                    setCurrentStep('symptoms');
                    setShowOsGuide(false);
                  }}
                  className="bg-[#4F7E7A] hover:bg-[#3B5F5C] text-white font-bold px-6 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {t.nextStepBtn} {walkthroughLang === "ar" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- STEP 3: SYMPTOMS SELECTION --- */}
        {currentStep === 'symptoms' && selectedDevice && (
          <div className="space-y-6 animate-fade-in" id="symptoms-view">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B43]">{t.step3Of5}</span>
              <h2 className={`font-serif font-bold text-2xl text-[#2B2927] ${textClass('text-2xl', 'text-3xl')}`}>
                {t.symptomsScreenTitle}
              </h2>
              <p className="text-[#5C5651] text-sm">{t.symptomsScreenDesc}</p>
            </div>

            {/* PRESETS LIST */}
            <div className="space-y-3" id="symptoms-checkboxes">
              {SYMPTOMS[selectedDevice]?.map((sym) => {
                const isChecked = selectedSymptoms.includes(sym.id);
                const labelText = (walkthroughLang === "ar" ? TRANSLATED_SYMPTOMS.ar[sym.id] : TRANSLATED_SYMPTOMS.en[sym.id]) || sym.label;
                const descText = sym.description;
                return (
                  <label
                    key={sym.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isChecked ? 'border-[#D96B43] bg-[#FDF6F3]' : 'border-[#EAE4DC] bg-white hover:border-[#D96B43]'
                    } ${walkthroughLang === "ar" ? "text-right" : "text-left"}`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#D96B43] w-4.5 h-4.5 rounded cursor-pointer"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSymptoms([...selectedSymptoms, sym.id]);
                        } else {
                          setSelectedSymptoms(selectedSymptoms.filter(item => item !== sym.id));
                        }
                      }}
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-sm text-[#2B2927]">{labelText}</span>
                      <p className="text-xs text-[#7A746E]">{descText}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* CUSTOM TEXT AREA */}
            <div className="space-y-2 bg-white border border-[#EAE4DC] p-5 rounded-2xl" id="custom-symptom-input">
              <label className="block font-bold text-sm text-[#2B2927] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#D96B43]" /> {t.customSymptomLabel}
              </label>
              <textarea
                className="w-full border border-[#EAE4DC] rounded-xl p-3 text-sm focus:outline-none focus:border-[#D96B43] placeholder-[#A59F99]"
                rows={3}
                placeholder={t.customSymptomPlaceholder}
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
              />
            </div>

            {/* STEP BUTTONS */}
            <div className="flex justify-between pt-4 border-t border-[#EAE4DC]">
              <button
                id="btn-back-to-os"
                onClick={() => {
                  if (selectedDevice === 'other' || selectedDevice === 'facebook') {
                    setCurrentStep('device');
                  } else {
                    setCurrentStep('os');
                  }
                }}
                className="flex items-center gap-1 text-sm font-semibold text-[#7A746E] hover:text-[#2B2927] px-4 py-2 cursor-pointer"
              >
                {walkthroughLang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />} {t.goBackBtn}
              </button>

              <button
                id="btn-next-to-negatives"
                onClick={() => setCurrentStep('negatives')}
                disabled={selectedSymptoms.length === 0 && !customSymptom.trim()}
                className={`font-bold px-6 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedSymptoms.length > 0 || customSymptom.trim()
                    ? 'bg-[#4F7E7A] hover:bg-[#3B5F5C] text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t.nextStepBtn} {walkthroughLang === "ar" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 4: NEGATIVE SYMPTOMS ("100% Sure is Not") --- */}
        {currentStep === 'negatives' && selectedDevice && (
          <div className="space-y-6 animate-fade-in" id="negatives-view">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B43]">{t.step4Of5}</span>
              <h2 className={`font-serif font-bold text-2xl text-[#2B2927] ${textClass('text-2xl', 'text-3xl')}`}>
                {t.negativesScreenTitle}
              </h2>
              <p className="text-[#5C5651] text-sm">
                {t.negativesScreenDesc}
              </p>
            </div>

            <div className="space-y-3" id="negatives-checkboxes">
              {NEGATIVE_SYMPTOMS[selectedDevice]?.map((neg) => {
                const isChecked = selectedNegatives.includes(neg.id);
                const labelText = (walkthroughLang === "ar" ? TRANSLATED_NEGATIVES.ar[neg.id] : TRANSLATED_NEGATIVES.en[neg.id]) || neg.label;
                const descText = neg.description;
                return (
                  <label
                    key={neg.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isChecked ? 'border-[#4F7E7A] bg-[#ECF4F3]' : 'border-[#EAE4DC] bg-white hover:border-[#4F7E7A]'
                    } ${walkthroughLang === "ar" ? "text-right" : "text-left"}`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#4F7E7A] w-4.5 h-4.5 rounded cursor-pointer"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNegatives([...selectedNegatives, neg.id]);
                        } else {
                          setSelectedNegatives(selectedNegatives.filter(item => item !== neg.id));
                        }
                      }}
                    />
                    <div className="space-y-0.5">
                      <span className="font-bold text-sm text-[#2B2927] flex items-center gap-1">
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-[#4F7E7A]" />}
                        {labelText}
                      </span>
                      <p className="text-xs text-[#7A746E]">{descText}</p>
                    </div>
                  </label>
                );
              })}

              <div className="bg-white p-4 rounded-xl border border-[#EAE4DC] text-center">
                <span className="text-xs text-[#7A746E]">
                  {t.negativesSkipHint}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#EAE4DC]">
              <button
                id="btn-back-to-symptoms"
                onClick={() => setCurrentStep('symptoms')}
                className="flex items-center gap-1 text-sm font-semibold text-[#7A746E] hover:text-[#2B2927] px-4 py-2 cursor-pointer"
              >
                {walkthroughLang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />} {t.goBackBtn}
              </button>

              <button
                id="btn-next-to-tried"
                onClick={() => setCurrentStep('tried')}
                className="bg-[#4F7E7A] hover:bg-[#3B5F5C] text-white font-bold px-6 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {t.nextStepBtn} {walkthroughLang === "ar" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 5: THINGS ALREADY TRIED --- */}
        {currentStep === 'tried' && selectedDevice && (
          <div className="space-y-6 animate-fade-in" id="tried-view">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B43]">{t.step5Of5}</span>
              <h2 className={`font-serif font-bold text-2xl text-[#2B2927] ${textClass('text-2xl', 'text-3xl')}`}>
                {t.triedScreenTitle}
              </h2>
              <p className="text-[#5C5651] text-sm">
                {t.triedScreenDesc}
              </p>
            </div>

            <div className="bg-white border border-[#EAE4DC] rounded-2xl p-6 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border border-[#EAE4DC] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D96B43] placeholder-[#A59F99]"
                  placeholder={t.triedPlaceholder}
                  value={newFailedAttempt}
                  onChange={(e) => setNewFailedAttempt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFailedAttempt();
                    }
                  }}
                />
                <button
                  id="btn-add-failed-attempt"
                  onClick={addFailedAttempt}
                  className="bg-[#4F7E7A] hover:bg-[#3B5F5C] text-white font-bold px-4 rounded-xl text-sm flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" /> {t.addBtn}
                </button>
              </div>

              {failedAttempts.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#7A746E]">{t.alreadyTriedLabel}</span>
                  <div className="flex flex-wrap gap-2">
                    {failedAttempts.map((attempt, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#EAE4DC] text-[#2B2927] text-xs px-3 py-1.5 rounded-full"
                      >
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" /> {attempt}
                        <button
                          onClick={() => removeFailedAttempt(index)}
                          className="text-[#A59F99] hover:text-red-500 font-bold ml-1 text-sm focus:outline-none cursor-pointer"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-[#EAE4DC] rounded-xl text-[#7A746E] text-xs">
                  <p>{t.noPriorAttempts}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-[#EAE4DC]">
              <button
                id="btn-back-to-negatives"
                onClick={() => setCurrentStep('negatives')}
                className="flex items-center gap-1 text-sm font-semibold text-[#7A746E] hover:text-[#2B2927] px-4 py-2 cursor-pointer"
              >
                {walkthroughLang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />} {t.goBackBtn}
              </button>

              <button
                id="btn-run-diagnosis"
                onClick={handleRunDiagnosis}
                className="bg-[#D96B43] hover:bg-[#C45E39] text-white font-bold px-8 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2 text-base cursor-pointer"
              >
                {t.getMyFixesBtn} <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* --- RESULTS / DIAGNOSIS SCREEN --- */}
        {currentStep === 'results' && (
          <div className="space-y-6 animate-fade-in" id="results-view">
            
            {/* DIAGNOSING LOADER */}
            {isDiagnosing ? (
              <div className="bg-white border border-[#EAE4DC] rounded-3xl p-12 text-center space-y-6 shadow-sm" id="diagnosing-loader">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 border-4 border-[#FAF8F5] rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#D96B43] border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#D96B43]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-[#2B2927]">{t.loaderTitle}</h3>
                  <p className="text-sm text-[#7A746E] max-w-md mx-auto">
                    {t.loaderDesc}
                  </p>
                </div>
              </div>
            ) : (
              diagnosisResult && (
                <div className="space-y-8 animate-fade-in" id="diagnosis-content" dir={walkthroughLang === "ar" ? "rtl" : "ltr"}>
                  
                  {/* AUDIO WALKTHROUGH PLAYER */}
                  <AudioWalkthroughPlayer
                    diagnosisResult={diagnosisResult}
                    triedAlternative={triedAlternative}
                    language={walkthroughLang}
                    onLanguageChange={(lang) => setWalkthroughLang(lang)}
                    onActiveSpokenIndexChange={(idx) => setActiveSpokenIndex(idx)}
                  />

                  {/* DIAGNOSIS HERO CARD */}
                  <div className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-all duration-300 ${
                    activeSpokenIndex === -2 
                      ? "border-[#D96B43] bg-gradient-to-r from-[#FFF5F1] to-[#FFF9F6] shadow-md scale-[1.015]" 
                      : "border-[#EAE4DC]"
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="bg-[#FDF6F3] text-[#D96B43] font-bold text-xs px-3 py-1 rounded-full border border-[#F5D8CE] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 
                        {t.friendlyDiagnosis}
                      </span>
                      {isUsingAi ? (
                        <span className="text-[11px] font-semibold text-[#4F7E7A] bg-[#ECF4F3] px-2.5 py-1 rounded-md">
                          {t.aiCustomized}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#7A746E] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#EAE4DC]">
                          {t.localExpert}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h2 className={`font-serif font-bold text-2xl sm:text-3xl text-[#2B2927] transition-colors ${
                        activeSpokenIndex === -2 ? "text-[#D96B43]" : "text-[#2B2927]"
                      } ${textClass('', 'text-3xl sm:text-4xl')}`}>
                        {walkthroughLang === "ar"
                          ? (!triedAlternative ? (diagnosisResult.problemNameAr || diagnosisResult.problemName) : (diagnosisResult.alternativeProblemNameAr || diagnosisResult.alternativeProblemName))
                          : (!triedAlternative ? diagnosisResult.problemName : diagnosisResult.alternativeProblemName)}
                      </h2>
                      <p className={`text-[#5C5651] leading-relaxed italic border-l-4 border-[#F5D8CE] pl-4 transition-all ${
                        activeSpokenIndex === -1 ? "bg-amber-50/50 p-2 rounded border-[#D96B43]" : ""
                      } ${textClass('text-sm sm:text-base', 'text-base sm:text-lg')}`}>
                        "{walkthroughLang === "ar" ? (diagnosisResult.explanationAr || diagnosisResult.explanation) : diagnosisResult.explanation}"
                      </p>
                    </div>
                  </div>

                  {/* STEP-BY-STEP FLOW */}
                  <div className="bg-white border border-[#EAE4DC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6" id="troubleshooting-steps">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE4DC] pb-4">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-[#D96B43]" />
                        <h3 className="font-serif font-bold text-lg text-[#2B2927]">
                          {t.whatToDo}
                        </h3>
                      </div>

                      {/* VIEW MODE TOGGLE BUTTONS */}
                      <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EAE4DC]">
                        <button
                          type="button"
                          onClick={() => setGuideViewMode('visual')}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                            guideViewMode === 'visual'
                              ? 'bg-[#D96B43] text-white shadow-xs'
                              : 'text-[#7A746E] hover:text-[#2B2927]'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {t.visualGuideTab || "Visual Cards"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setGuideViewMode('simple')}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                            guideViewMode === 'simple'
                              ? 'bg-[#D96B43] text-white shadow-xs'
                              : 'text-[#7A746E] hover:text-[#2B2927]'
                          }`}
                        >
                          <List className="w-3.5 h-3.5" />
                          {t.simpleTextTab || "Simple Text"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setGuideViewMode('hardware_map')}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                            guideViewMode === 'hardware_map'
                              ? 'bg-[#D96B43] text-white shadow-xs'
                              : 'text-[#7A746E] hover:text-[#2B2927]'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {t.hardwareMapTab || "Hardware Inspector"}
                        </button>
                      </div>
                    </div>

                    {/* CONTENT ACCORDING TO VIEW MODE */}
                    {(() => {
                      const activeStepsList = walkthroughLang === "ar"
                        ? (!triedAlternative ? (diagnosisResult.stepsAr || diagnosisResult.steps) : (diagnosisResult.alternativeStepsAr || diagnosisResult.alternativeSteps))
                        : (!triedAlternative ? diagnosisResult.steps : diagnosisResult.alternativeSteps);

                      const totalSteps = activeStepsList.length;
                      const completedCount = completedStepIndices.length;
                      const progressPercent = Math.round((completedCount / (totalSteps || 1)) * 100);
                      const isAllCompleted = totalSteps > 0 && completedCount === totalSteps;

                      return (
                        <div className="space-y-6">

                          {/* STEP PROGRESS TRACKER BAR */}
                          {guideViewMode !== 'hardware_map' && (
                            <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-[#D96B43] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                    {progressPercent}%
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-sm text-[#2B2927]">
                                      {t.stepProgressLabel || "Step-by-Step Progress"}
                                    </h4>
                                    <p className="text-xs text-[#7A746E]">
                                      {completedCount} / {totalSteps} {t.stepsCompletedLabel || "Steps Done"}
                                    </p>
                                  </div>
                                </div>

                                {completedCount > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setCompletedStepIndices([])}
                                    className="text-xs font-semibold text-[#7A746E] hover:text-[#D96B43] flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    {t.resetProgressBtn || "Reset Progress"}
                                  </button>
                                )}
                              </div>

                              {/* VISUAL PROGRESS TRACK */}
                              <div className="w-full h-3 bg-white border border-[#EAE4DC] rounded-full overflow-hidden p-0.5 shadow-inner">
                                <div
                                  className="h-full bg-gradient-to-r from-[#D96B43] via-amber-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                                  style={{ width: `${progressPercent}%` }}
                                />
                              </div>

                              {/* STEPPER TIMELINE DOTS */}
                              <div className="flex items-center justify-between pt-1 px-1 relative">
                                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-[#EAE4DC] -z-0" />
                                
                                {activeStepsList.map((_, idx) => {
                                  const isDone = completedStepIndices.includes(idx);
                                  const isCurrent = (activeSpokenIndex ?? 0) === idx;
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setActiveSpokenIndex(idx)}
                                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 cursor-pointer ${
                                        isDone
                                          ? 'bg-emerald-500 text-white ring-2 ring-emerald-200 shadow-xs'
                                          : isCurrent
                                            ? 'bg-[#D96B43] text-white ring-4 ring-[#D96B43]/20 scale-110 shadow-md'
                                            : 'bg-white border-2 border-[#EAE4DC] text-[#7A746E] hover:border-[#D96B43]'
                                      }`}
                                      title={`Jump to Step ${idx + 1}`}
                                    >
                                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 100% COMPLETION CELEBRATION CARD */}
                          {isAllCompleted && guideViewMode !== 'hardware_map' && (
                            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-2 border-emerald-300 rounded-2xl p-5 text-center space-y-3 animate-fade-in shadow-sm">
                              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 text-white rounded-full shadow-md">
                                <CheckCircle2 className="w-7 h-7" />
                              </div>
                              <div>
                                <h4 className="font-serif font-bold text-lg text-emerald-950">
                                  {t.allStepsCompletedTitle || "🎉 All Steps Completed!"}
                                </h4>
                                <p className="text-xs sm:text-sm text-emerald-800">
                                  {t.allStepsCompletedSub || "Great job! You have gone through every step in this guide. Did this fix your issue?"}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (walkthroughLang === 'ar') {
                                      alert("دي أخبار ممتازة بجد! أنت بطل حقيقي ومستوعب التكنولوجيا كويس. حفظنا الحل ده في مجلدك الخاص!");
                                    } else {
                                      alert("That is wonderful news! You are a superstar. We will save this to your folder!");
                                    }
                                    handleSaveFix();
                                    resetFlow();
                                  }}
                                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                  {t.yesFixedBtn || "Yes, Problem Solved! 🎉"}
                                </button>
                                {!triedAlternative && diagnosisResult.alternativeSteps && diagnosisResult.alternativeSteps.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTriedAlternative(true);
                                      setFailedAttempts([...failedAttempts, diagnosisResult.problemName]);
                                    }}
                                    className="px-4 py-2 bg-white border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-all cursor-pointer"
                                  >
                                    {t.noBackupBtn || "Try Alternative Steps"}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* HARDWARE MAP VIEW */}
                          {guideViewMode === 'hardware_map' && (
                            <DeviceHardwareDiagram
                              deviceType={selectedDevice || 'laptop_computer'}
                              lang={walkthroughLang}
                            />
                          )}

                          {/* VISUAL CARDS VIEW */}
                          {guideViewMode === 'visual' && (
                            <div className="space-y-4">
                              {activeStepsList.map((step, idx) => {
                                const isHighlighted = activeSpokenIndex === idx;
                                const isCompleted = completedStepIndices.includes(idx);
                                return (
                                  <VisualStepGuide
                                    key={idx}
                                    stepIndex={idx}
                                    totalSteps={activeStepsList.length}
                                    stepText={step}
                                    deviceType={selectedDevice || 'laptop_computer'}
                                    isHighlighted={isHighlighted}
                                    lang={walkthroughLang}
                                    isCompleted={isCompleted}
                                    onSelectStep={() => setActiveSpokenIndex(idx)}
                                    onToggleComplete={() => {
                                      setCompletedStepIndices(prev => {
                                        const exists = prev.includes(idx);
                                        const next = exists ? prev.filter(i => i !== idx) : [...prev, idx];
                                        // Auto advance to next step if marking completed
                                        if (!exists && idx === (activeSpokenIndex ?? 0)) {
                                          setActiveSpokenIndex(Math.min(totalSteps - 1, idx + 1));
                                        }
                                        return next;
                                      });
                                    }}
                                  />
                                );
                              })}
                            </div>
                          )}

                          {/* SIMPLE TEXT LIST MODE */}
                          {guideViewMode === 'simple' && (
                            <div className="space-y-4">
                              {activeStepsList.map((step, idx) => {
                                const isHighlighted = activeSpokenIndex === idx;
                                const isCompleted = completedStepIndices.includes(idx);
                                return (
                                  <div 
                                    key={idx} 
                                    onClick={() => setActiveSpokenIndex(idx)}
                                    className={`flex gap-4 items-start p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                                      isHighlighted 
                                        ? "bg-gradient-to-r from-[#FFF5F1] to-[#FFF9F6] border-2 border-[#D96B43] shadow-md scale-[1.015]" 
                                        : isCompleted
                                          ? "bg-[#F4F9F8] border-[#BCE0FD]"
                                          : "border-[#EAE4DC] hover:bg-gray-50/50"
                                    }`}
                                  >
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCompletedStepIndices(prev => {
                                          const exists = prev.includes(idx);
                                          const next = exists ? prev.filter(i => i !== idx) : [...prev, idx];
                                          if (!exists && idx === (activeSpokenIndex ?? 0)) {
                                            setActiveSpokenIndex(Math.min(totalSteps - 1, idx + 1));
                                          }
                                          return next;
                                        });
                                      }}
                                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm font-bold text-base transition-all duration-300 ${
                                        isCompleted
                                          ? "bg-emerald-500 text-white"
                                          : isHighlighted 
                                            ? "bg-[#D96B43] text-white ring-4 ring-[#D96B43]/10" 
                                            : "bg-[#FAF8F5] border-2 border-[#EAE4DC] text-[#2B2927]"
                                      }`}
                                    >
                                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                                    </button>
                                    <div className="space-y-1 pt-1.5 flex-1">
                                      <p className={`text-[#2B2927] leading-relaxed transition-colors duration-300 ${
                                        isHighlighted ? "text-[#D96B43] font-semibold" : "text-[#2B2927]"
                                      } ${textClass('text-sm sm:text-base', 'text-base sm:text-lg')}`}>
                                        {step}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* STEP NAVIGATION CONTROLS */}
                          {guideViewMode !== 'hardware_map' && totalSteps > 0 && (
                            <div className="flex items-center justify-between pt-2 border-t border-[#EAE4DC]">
                              <button
                                type="button"
                                disabled={(activeSpokenIndex ?? 0) <= 0}
                                onClick={() => setActiveSpokenIndex(prev => Math.max(0, (prev ?? 0) - 1))}
                                className="px-4 py-2 rounded-xl border border-[#EAE4DC] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs text-[#2B2927] flex items-center gap-1.5 transition-all cursor-pointer"
                              >
                                <ChevronLeft className={`w-4 h-4 ${walkthroughLang === 'ar' ? 'rotate-180' : ''}`} />
                                {t.prevStepBtn || "Previous Step"}
                              </button>

                              <span className="text-xs font-bold text-[#7A746E]">
                                {walkthroughLang === 'ar' 
                                  ? `الخطوة ${(activeSpokenIndex ?? 0) + 1} من ${totalSteps}`
                                  : `Step ${(activeSpokenIndex ?? 0) + 1} of ${totalSteps}`}
                              </span>

                              <button
                                type="button"
                                disabled={(activeSpokenIndex ?? 0) >= totalSteps - 1}
                                onClick={() => setActiveSpokenIndex(prev => Math.min(totalSteps - 1, (prev ?? 0) + 1))}
                                className="px-4 py-2 rounded-xl border border-[#EAE4DC] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs text-[#2B2927] flex items-center gap-1.5 transition-all cursor-pointer"
                              >
                                {t.nextStepBtn || "Next Step"}
                                <ChevronRight className={`w-4 h-4 ${walkthroughLang === 'ar' ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          )}

                        </div>
                      );
                    })()}

                    {/* SAVE SOLUTION ACTION */}
                    {(() => {
                      const resolvedProblemName = triedAlternative
                        ? (walkthroughLang === "ar" ? diagnosisResult?.alternativeProblemNameAr || diagnosisResult?.alternativeProblemName : diagnosisResult?.alternativeProblemName)
                        : (walkthroughLang === "ar" ? diagnosisResult?.problemNameAr || diagnosisResult?.problemName : diagnosisResult?.problemName);
                      
                      const savedItem = savedFixes.find(item => item.deviceType === selectedDevice && item.problemName === resolvedProblemName);
                      const isAlreadySaved = !!savedItem;

                      return (
                        <div className="pt-4 border-t border-[#EAE4DC] flex flex-col sm:flex-row justify-between items-center gap-4">
                          <span className="text-xs text-[#7A746E]">
                            {isAlreadySaved 
                              ? (walkthroughLang === 'ar' ? "الحل ده محفوظ في صندوق المفضلة الخاص بك. تقدر تشوفه في أي وقت!" : "This guide is saved in your Favourite Fixes chest. You can view it anytime!") 
                              : t.saveSolutionText
                            }
                          </span>
                          {isAlreadySaved && savedItem ? (
                            <button
                              id="btn-remove-from-favourites"
                              onClick={() => handleRemoveSaved(savedItem.id)}
                              className="bg-[#FDF6F3] hover:bg-[#FBEBE6] text-[#D96B43] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#F5D8CE]"
                            >
                              <Heart className="w-4 h-4 fill-current text-[#D96B43]" /> 
                              {t.savedToFavourites}
                            </button>
                          ) : (
                            <button
                              id="btn-save-this-solution"
                              onClick={handleSaveFix}
                              className="bg-[#ECF4F3] hover:bg-[#D9E6E4] text-[#4F7E7A] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Heart className="w-4 h-4" /> 
                              {t.saveToFavourites}
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* FEEDBACK & REACTIONS ("Did this fix the problem?") */}
                  <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-3xl p-6 sm:p-8 space-y-4" id="reaction-panel">
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-base text-[#2B2927]">{t.reactionTitle}</h3>
                      <p className="text-xs text-[#7A746E]">{t.reactionDesc}</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        id="btn-feedback-solved"
                        onClick={() => {
                          if (walkthroughLang === 'ar') {
                            alert("دي أخبار ممتازة بجد! أنت بطل حقيقي ومستوعب التكنولوجيا كويس. حفظنا الحل ده في مجلدك الخاص!");
                          } else {
                            alert("That is wonderful news! You are a superstar. We will save this to your folder!");
                          }
                          handleSaveFix();
                          resetFlow();
                        }}
                        className="bg-[#4F7E7A] hover:bg-[#3B5F5C] text-white font-bold px-6 py-3 rounded-2xl text-sm flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-4.5 h-4.5" /> {t.yesFixed}
                      </button>

                      {!triedAlternative && diagnosisResult.alternativeSteps && diagnosisResult.alternativeSteps.length > 0 && (
                        <button
                          id="btn-feedback-try-alternative"
                          onClick={() => {
                            setTriedAlternative(true);
                            // Add original problem to failed list
                            setFailedAttempts([...failedAttempts, diagnosisResult.problemName]);
                            if (walkthroughLang === 'ar') {
                              alert("ولا يهمك خالص يا غالي! دايماً عندنا خطة بديلة جاهزة. يلا نجرب الخطوات الاحتياطية.");
                            } else {
                              alert("No worries! We have a backup plan. Let's try the alternative steps.");
                            }
                          }}
                          className="bg-white border border-[#D96B43] text-[#D96B43] hover:bg-[#FDF6F3] font-bold px-6 py-3 rounded-2xl text-sm flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <ThumbsDown className="w-4.5 h-4.5" /> {t.noBackup}
                        </button>
                      )}

                      <button
                        id="btn-feedback-grandchild-note"
                        onClick={handleGenerateNote}
                        className="bg-white border border-[#EAE4DC] text-[#2B2927] hover:bg-[#FAF8F5] font-bold px-6 py-3 rounded-2xl text-sm flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4.5 h-4.5 text-[#4F7E7A]" /> {t.needHelperAssist}
                      </button>
                    </div>
                  </div>

                  {/* VISUAL YOUTUBE & GOOGLE GENERATOR LINKS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="search-redirects">
                    <a
                      id="youtube-search-link"
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(diagnosisResult.youtubeSearchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FFF5F5] border border-red-200 hover:border-red-400 p-5 rounded-2xl flex items-start gap-3 hover:shadow-sm transition-all"
                    >
                      <div className="bg-red-500 text-white p-2 rounded-xl shrink-0">
                        <CornerDownRight className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-red-700 flex items-center gap-1">
                          {t.youtubeTitle} <ExternalLink className="w-3.5 h-3.5" />
                        </h4>
                        <p className="text-xs text-[#7A746E]">
                          {walkthroughLang === 'ar'
                            ? `اضغط للبحث في يوتيوب عن: "${diagnosisResult.youtubeSearchQuery}" حيث يعرض صناع محتوى ودودون الطريقة بالفيديو خطوة بخطوة.`
                            : `Click to search YouTube for: "${diagnosisResult.youtubeSearchQuery}" where friendly creators demonstrate it on screen.`}
                        </p>
                      </div>
                    </a>

                    <a
                      id="google-search-link"
                      href={`https://www.google.com/search?q=${encodeURIComponent(diagnosisResult.googleSearchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#F0F7FF] border border-blue-200 hover:border-blue-400 p-5 rounded-2xl flex items-start gap-3 hover:shadow-sm transition-all"
                    >
                      <div className="bg-blue-500 text-white p-2 rounded-xl shrink-0">
                        <Search className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-blue-700 flex items-center gap-1">
                          {t.googleTitle} <ExternalLink className="w-3.5 h-3.5" />
                        </h4>
                        <p className="text-xs text-[#7A746E]">
                          {walkthroughLang === 'ar'
                            ? `اضغط لتصفح مقالات مبسطة على جوجل عن: "${diagnosisResult.googleSearchQuery}" المجهزة خصيصاً للمبتدئين.`
                            : `Click to browse articles for: "${diagnosisResult.googleSearchQuery}" compiled for beginners.`}
                        </p>
                      </div>
                    </a>
                  </div>

                  {/* --- GRANDCHILD NOTE SHOWER --- */}
                  {showNoteGenerator && (
                    <div className="bg-white border-2 border-[#ECF4F3] rounded-3xl p-6 space-y-4 animate-fade-in" id="relative-hotline-note">
                      <div className="flex items-center gap-2 border-b border-[#EAE4DC] pb-3">
                        <Phone className="w-5 h-5 text-[#4F7E7A]" />
                        <h3 className="font-serif font-bold text-base text-[#2B2927]">
                          {t.familyNoteTitle}
                        </h3>
                      </div>
                      <p className="text-xs text-[#7A746E]">
                        {t.familyNoteDesc}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-semibold text-[#7A746E] w-32 shrink-0">{t.whoSendingTo}</label>
                          <input
                            type="text"
                            value={relativeName}
                            onChange={(e) => {
                              setRelativeName(e.target.value);
                            }}
                            className="border border-[#EAE4DC] rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#4F7E7A]"
                            placeholder={t.namePlaceholder}
                          />
                          <button
                            onClick={handleGenerateNote}
                            className="bg-[#FAF8F5] border border-[#EAE4DC] text-[#4F7E7A] text-xs font-bold px-2 py-1 rounded hover:bg-[#ECF4F3] cursor-pointer"
                          >
                            {t.updateNameBtn}
                          </button>
                        </div>

                        <div className="relative">
                          <textarea
                            readOnly
                            value={generatedNote}
                            className="w-full h-44 bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl p-3.5 text-xs font-mono focus:outline-none select-all text-[#2B2927]"
                          />
                          <div className="flex flex-wrap gap-2 justify-end mt-2">
                            <button
                              id="btn-whatsapp-send-note"
                              onClick={() => sendToWhatsApp()}
                              className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                              {t.sendViaWhatsappBtn}
                            </button>
                            <button
                              onClick={copyToClipboard}
                              className="bg-[#4F7E7A] hover:bg-[#3B5F5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                            >
                              {copiedNote ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              {copiedNote ? t.copiedNoteBtn : t.copyNoteBtn}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM FOOTER NAVIGATION */}
                  <div className="flex justify-between pt-6 border-t border-[#EAE4DC]">
                    <button
                      id="btn-results-back"
                      onClick={() => setCurrentStep('tried')}
                      className="flex items-center gap-1 text-sm font-semibold text-[#7A746E] hover:text-[#2B2927] px-4 py-2 cursor-pointer"
                    >
                      {walkthroughLang === "ar" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />} {t.editSymptomsBtn}
                    </button>

                    <button
                      id="btn-results-reset"
                      onClick={resetFlow}
                      className="bg-[#D96B43] hover:bg-[#C45E39] text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> {t.startOverBtn}
                    </button>
                  </div>

                </div>
              )
            )}

          </div>
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-[#EAE4DC] bg-white py-8" id="main-footer">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-xs text-[#A59F99] leading-relaxed">
            {t.footerDesc}
          </p>
          <div className="flex justify-center flex-wrap gap-4 text-xs font-semibold text-[#7A746E]">
            <span>{t.footerLink1}</span>
            <span>&bull;</span>
            <span>{t.footerLink2}</span>
            <span>&bull;</span>
            <span>{t.footerLink3}</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP ASSISTANCE BADGE */}
      <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-40">
        <button
          id="btn-floating-whatsapp"
          onClick={() => {
            if (diagnosisResult && !generatedNote) {
              handleGenerateNote();
            }
            setShowWhatsappModal(true);
          }}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer group"
          title={t.whatsappHelpBtn}
        >
          <MessageCircle className="w-6 h-6 fill-current shrink-0" />
          <span className="hidden sm:inline font-bold text-xs">{t.whatsappHelpBtn}</span>
        </button>
      </div>

      {/* WHATSAPP HELP MODAL */}
      {showWhatsappModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in" id="whatsapp-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#EAE4DC] relative">
            <button
              id="btn-close-whatsapp-modal"
              onClick={() => setShowWhatsappModal(false)}
              className="absolute top-4 ltr:right-4 rtl:left-4 text-[#7A746E] hover:text-[#2B2927] p-2 rounded-full hover:bg-[#FAF8F5] cursor-pointer"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="bg-[#25D366] text-white p-3 rounded-2xl shrink-0">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2B2927]">
                  {t.whatsappModalTitle}
                </h3>
                <p className="text-xs text-[#7A746E]">
                  {t.whatsappModalDesc}
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE4DC]">
              <div>
                <label className="block text-xs font-semibold text-[#7A746E] mb-1">
                  {t.whatsappPhoneNumberLabel}
                </label>
                <input
                  type="text"
                  value={helperPhone}
                  onChange={(e) => setHelperPhone(e.target.value)}
                  placeholder={t.whatsappPhoneNumberPlaceholder}
                  className="w-full border border-[#EAE4DC] bg-white rounded-xl px-3 py-2 text-xs text-[#2B2927] focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7A746E] mb-1">
                  {walkthroughLang === 'ar' ? 'معاينة الرسالة:' : 'Message Preview:'}
                </label>
                <textarea
                  readOnly
                  value={generatedNote || (
                    selectedDevice && diagnosisResult
                      ? (walkthroughLang === 'ar'
                          ? `أهلاً! أنا بستخدم موقع مُبَسِّط وبحاول أحل مشكلة في ${TRANSLATED_DEVICES.ar[selectedDevice] || 'جهازي'}.\nممكن تساعدني نبص عليها سوا لما تكون فاضي؟ ❤️`
                          : `Hi! I am using Mubassitt to fix an issue with my ${TRANSLATED_DEVICES.en[selectedDevice] || 'device'}.\nCould you help me take a look when you have a moment? ❤️`)
                      : (walkthroughLang === 'ar'
                          ? `أهلاً! أنا بستخدم موقع مُبَسِّط للتعامل مع مشكلة في جهازي، ومحتاج مساعدتك لو فاضي ❤️`
                          : `Hi! I am using Mubassitt to fix a tech issue and could use your help when you have a moment ❤️`)
                  )}
                  className="w-full h-32 bg-white border border-[#EAE4DC] rounded-xl p-3 text-xs font-mono select-all text-[#2B2927] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                id="btn-cancel-whatsapp"
                onClick={() => setShowWhatsappModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#7A746E] hover:text-[#2B2927] cursor-pointer"
              >
                {walkthroughLang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                id="btn-confirm-whatsapp-send"
                onClick={() => {
                  sendToWhatsApp(helperPhone);
                  setShowWhatsappModal(false);
                }}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                {t.openWhatsappBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
