import React from 'react';
import { DeviceType } from '../types';
import { 
  Power, 
  Plug, 
  Volume2, 
  Wifi, 
  Keyboard, 
  RefreshCw, 
  Tv, 
  Printer, 
  BatteryCharging, 
  Settings, 
  Wind, 
  CheckCircle2, 
  MousePointer, 
  AlertCircle,
  HelpCircle,
  Smartphone,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface VisualStepGuideProps {
  stepIndex: number;
  totalSteps: number;
  stepText: string;
  deviceType: DeviceType;
  problemKey?: string;
  isHighlighted?: boolean;
  lang: 'en' | 'ar';
  isCompleted: boolean;
  onToggleComplete: () => void;
  onSelectStep: () => void;
}

// Function to determine action type based on text content & problem
function getStepActionMeta(text: string, deviceType: DeviceType, stepIndex: number) {
  const lower = text.toLowerCase();
  
  if (lower.includes('power button') || lower.includes('زر التشغيل') || lower.includes('hold') || lower.includes('اضغط') || lower.includes('10 seconds') || lower.includes('10 ثوان')) {
    return {
      type: 'power_hold',
      badgeEn: 'Power Button (10s Hold)',
      badgeAr: 'زر التشغيل (ضغط 10 ثوانٍ)',
      color: 'bg-amber-500',
      actionKey: 'hold_power'
    };
  }
  
  if (lower.includes('plug') || lower.includes('wall') || lower.includes('cable') || lower.includes('كهربا') || lower.includes('شاحن') || lower.includes('فيشة')) {
    return {
      type: 'power_plug',
      badgeEn: 'Check Power Cord & Outlet',
      badgeAr: 'فحص كابل الكهرباء والفيشة',
      color: 'bg-blue-500',
      actionKey: 'plug_cable'
    };
  }

  if (lower.includes('speaker') || lower.includes('volume') || lower.includes('mute') || lower.includes('صوت') || lower.includes('مكبر') || lower.includes('كتم')) {
    return {
      type: 'volume',
      badgeEn: 'Volume & Unmute Check',
      badgeAr: 'فحص الصوت والرفع واللغاء الكتم',
      color: 'bg-emerald-500',
      actionKey: 'check_sound'
    };
  }

  if (lower.includes('wi-fi') || lower.includes('router') || lower.includes('internet') || lower.includes('واي فاي') || lower.includes('راوتر') || lower.includes('إنترنت')) {
    return {
      type: 'wifi',
      badgeEn: 'Router Lights & Wi-Fi Check',
      badgeAr: 'فحص لمبات الراوتر والإنترنت',
      color: 'bg-teal-500',
      actionKey: 'check_router'
    };
  }

  if (lower.includes('caps lock') || lower.includes('password') || lower.includes('spelling') || lower.includes('كلمة السر') || lower.includes('حروف كبيرة')) {
    return {
      type: 'keyboard',
      badgeEn: 'Caps Lock & Keyboard Check',
      badgeAr: 'فحص الحروف الكبيرة وكلمة السر',
      color: 'bg-indigo-500',
      actionKey: 'check_caps'
    };
  }

  if (lower.includes('refresh') || lower.includes('drag') || lower.includes('pull') || lower.includes('اسحب') || lower.includes('تحديث') || lower.includes('تطبيق')) {
    return {
      type: 'refresh',
      badgeEn: 'Pull Down / Reload App',
      badgeAr: 'سحب الشاشة لتحت / إعادة التحميل',
      color: 'bg-purple-500',
      actionKey: 'pull_refresh'
    };
  }

  if (lower.includes('paper') || lower.includes('tray') || lower.includes('ink') || lower.includes('طابعة') || lower.includes('ورق') || lower.includes('حبارة')) {
    return {
      type: 'printer',
      badgeEn: 'Printer Tray & Paper Alignment',
      badgeAr: 'فحص درج الورق والحبارة',
      color: 'bg-orange-500',
      actionKey: 'align_paper'
    };
  }

  if (lower.includes('battery') || lower.includes('remote') || lower.includes('بطارية') || lower.includes('ريموت')) {
    return {
      type: 'battery',
      badgeEn: 'Remote Battery Alignment',
      badgeAr: 'تركيب بطارية الريموت بشكل صحيح',
      color: 'bg-rose-500',
      actionKey: 'remote_battery'
    };
  }

  if (lower.includes('setting') || lower.includes('menu') || lower.includes('إعدادات') || lower.includes('قائمة')) {
    return {
      type: 'settings',
      badgeEn: 'Settings & Security Menu',
      badgeAr: 'قائمة الإعدادات والأمان',
      color: 'bg-cyan-500',
      actionKey: 'open_settings'
    };
  }

  if (lower.includes('cool') || lower.includes('heat') || lower.includes('حرارة') || lower.includes('سخونة') || lower.includes('ترابيزة')) {
    return {
      type: 'cooling',
      badgeEn: 'Surface & Cooling Check',
      badgeAr: 'وضع الجهاز على سطح مستوٍ للتبريد',
      color: 'bg-blue-400',
      actionKey: 'cool_surface'
    };
  }

  return {
    type: 'general',
    badgeEn: `Action Step ${stepIndex + 1}`,
    badgeAr: `خطوة عمل رقم ${stepIndex + 1}`,
    color: 'bg-[#D96B43]',
    actionKey: 'general'
  };
}

export const VisualStepGuide: React.FC<VisualStepGuideProps> = ({
  stepIndex,
  totalSteps,
  stepText,
  deviceType,
  problemKey,
  isHighlighted = false,
  lang,
  isCompleted,
  onToggleComplete,
  onSelectStep
}) => {
  const meta = getStepActionMeta(stepText, deviceType, stepIndex);

  return (
    <div 
      onClick={onSelectStep}
      className={`group relative rounded-3xl transition-all duration-300 cursor-pointer border overflow-hidden ${
        isHighlighted
          ? 'bg-gradient-to-br from-[#FFF8F5] via-white to-[#FAF4EF] border-[#D96B43] shadow-md ring-2 ring-[#D96B43]/20 scale-[1.01]'
          : isCompleted
            ? 'bg-[#F4F9F8] border-[#BCE0FD] opacity-90'
            : 'bg-white border-[#EAE4DC] hover:border-[#D96B43]/50 hover:shadow-sm'
      }`}
    >
      {/* TOP HEADER BAR */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EAE4DC]/60 bg-[#FAF8F5]/50">
        <div className="flex items-center gap-2.5">
          {/* STEP NUMBER CIRCLE */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
            isCompleted
              ? 'bg-emerald-500 text-white'
              : isHighlighted
                ? 'bg-[#D96B43] text-white ring-4 ring-[#D96B43]/15'
                : 'bg-[#FAF8F5] border-2 border-[#EAE4DC] text-[#2B2927]'
          }`}>
            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepIndex + 1}
          </div>

          {/* ACTION CATEGORY BADGE */}
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full text-white shadow-xs ${meta.color}`}>
            {lang === 'ar' ? meta.badgeAr : meta.badgeEn}
          </span>
        </div>

        {/* COMPLETED CHECKBOX BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-white hover:bg-gray-100 text-[#7A746E] border border-[#EAE4DC]'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 fill-emerald-200' : 'text-gray-400'}`} />
          {isCompleted 
            ? (lang === 'ar' ? 'تمت بنجاح!' : 'Completed!') 
            : (lang === 'ar' ? 'تحديد كـ تم' : 'Mark Done')}
        </button>
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* TEXT INSTRUCTION COLUMN */}
        <div className="md:col-span-7 space-y-3">
          <p className={`leading-relaxed text-[#2B2927] ${
            isHighlighted ? 'font-medium text-base sm:text-lg text-[#2B2927]' : 'text-sm sm:text-base'
          }`}>
            {stepText}
          </p>

          {/* HELPFUL QUICK TIP BOX */}
          <div className="flex items-start gap-2 text-xs bg-[#FAF8F5] border border-[#EAE4DC] p-2.5 rounded-xl text-[#5C5651]">
            <Eye className="w-4 h-4 text-[#D96B43] shrink-0 mt-0.5" />
            <span>
              {lang === 'ar' 
                ? 'نصيحة بصرية: اتفرج على الرسم التوضيحي جمب الخطوة عشان تعرف المكان والزرار بالضبط!'
                : 'Visual Tip: Check the diagram next to this step to pinpoint the exact button or cable!'}
            </span>
          </div>
        </div>

        {/* CUSTOM SVG ILLUSTRATION DIAGRAM COLUMN */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-full max-w-[220px] bg-[#FAF8F5] border border-[#EAE4DC] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-inner relative group-hover:bg-white transition-colors">
            
            {/* ILLUSTRATION SWITCHER */}
            {meta.type === 'power_hold' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center animate-pulse">
                    <Power className="w-9 h-9 text-amber-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded-full shadow">
                    10s
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800">
                  <MousePointer className="w-3.5 h-3.5 text-amber-600" />
                  {lang === 'ar' ? 'اصبر 10 ثوانٍ متواصلة' : 'Hold down for 10 sec'}
                </div>
              </div>
            )}

            {meta.type === 'power_plug' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 border-2 border-blue-400 flex items-center justify-center">
                  <Plug className="w-9 h-9 text-blue-600 transform rotate-45" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-blue-800">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                  {lang === 'ar' ? 'تأكد من ثبات الفيشة' : 'Ensure tight plug fit'}
                </div>
              </div>
            )}

            {meta.type === 'volume' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center">
                  <Volume2 className="w-9 h-9 text-emerald-600" />
                </div>
                <div className="w-24 h-2 bg-emerald-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-emerald-500 rounded-full"></div>
                </div>
                <span className="text-[11px] font-bold text-emerald-800">
                  {lang === 'ar' ? 'رفع الصوت لـ 50%+' : 'Set Volume 50%+' }
                </span>
              </div>
            )}

            {meta.type === 'wifi' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-teal-100 border-2 border-teal-400 flex items-center justify-center">
                  <Wifi className="w-9 h-9 text-teal-600" />
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[11px] font-bold text-teal-800">
                  {lang === 'ar' ? 'تأكد من اللمبات الخضراء' : 'Look for Green LEDs'}
                </span>
              </div>
            )}

            {meta.type === 'keyboard' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center">
                  <Keyboard className="w-9 h-9 text-indigo-600" />
                </div>
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Caps Lock
                </span>
                <span className="text-[11px] font-bold text-indigo-800">
                  {lang === 'ar' ? 'اقفل لمبة الحروف الكبيرة' : 'Turn off Caps Lock light'}
                </span>
              </div>
            )}

            {meta.type === 'refresh' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-full bg-purple-100 border-2 border-purple-400 flex items-center justify-center">
                  <RefreshCw className="w-9 h-9 text-purple-600 animate-spin" />
                </div>
                <span className="text-[11px] font-bold text-purple-800">
                  {lang === 'ar' ? 'اسحب الشاشة لتحت' : 'Pull down to refresh'}
                </span>
              </div>
            )}

            {meta.type === 'printer' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 border-2 border-orange-400 flex items-center justify-center">
                  <Printer className="w-9 h-9 text-orange-600" />
                </div>
                <span className="text-[11px] font-bold text-orange-800">
                  {lang === 'ar' ? 'رتب الورق في الدرج' : 'Align Paper in Tray'}
                </span>
              </div>
            )}

            {meta.type === 'battery' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 border-2 border-rose-400 flex items-center justify-center">
                  <BatteryCharging className="w-9 h-9 text-rose-600" />
                </div>
                <div className="flex gap-2 text-xs font-black text-rose-700">
                  <span>(+)</span>
                  <span>(-)</span>
                </div>
                <span className="text-[11px] font-bold text-rose-800">
                  {lang === 'ar' ? 'تأكد من اتجاه البطارية' : 'Check Battery +/-'}
                </span>
              </div>
            )}

            {meta.type === 'settings' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-full bg-cyan-100 border-2 border-cyan-400 flex items-center justify-center">
                  <Settings className="w-9 h-9 text-cyan-600" />
                </div>
                <span className="text-[11px] font-bold text-cyan-800">
                  {lang === 'ar' ? 'افتح قائمة الإعدادات' : 'Open Settings Gear'}
                </span>
              </div>
            )}

            {meta.type === 'cooling' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
                  <Wind className="w-9 h-9 text-blue-500" />
                </div>
                <span className="text-[11px] font-bold text-blue-800">
                  {lang === 'ar' ? 'اتركه يبرد 20 دقيقة' : 'Cool down for 20 mins'}
                </span>
              </div>
            )}

            {meta.type === 'general' && (
              <div className="space-y-2 flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-[#FDF6F3] border-2 border-[#F5D8CE] flex items-center justify-center">
                  <ShieldCheck className="w-9 h-9 text-[#D96B43]" />
                </div>
                <span className="text-[11px] font-bold text-[#D96B43]">
                  {lang === 'ar' ? 'نفّذ الإجراء بهدوء' : 'Perform Step Carefully'}
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
