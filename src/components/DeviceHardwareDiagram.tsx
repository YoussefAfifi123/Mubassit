import React, { useState } from 'react';
import { DeviceType } from '../types';
import { 
  Laptop, 
  Smartphone, 
  Wifi, 
  Printer, 
  Tv, 
  Facebook, 
  HelpCircle,
  Power,
  Volume2,
  Plug,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  MessageCircle,
  MessageSquare
} from 'lucide-react';

interface DeviceHardwareDiagramProps {
  deviceType: DeviceType;
  lang: 'en' | 'ar';
}

interface Hotspot {
  id: string;
  nameEn: string;
  nameAr: string;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  descEn: string;
  descAr: string;
  icon: any;
}

const HARDWARE_HOTSPOTS: Record<DeviceType, Hotspot[]> = {
  laptop_computer: [
    {
      id: 'power_button',
      nameEn: 'Power Button',
      nameAr: 'زر التشغيل الرئيسي',
      xPercent: 88,
      yPercent: 22,
      descEn: 'Located at the top right of the keyboard or on the top side edge. Hold for 10 seconds to force shutdown when frozen.',
      descAr: 'موجود في الركن الأعلى على اليمين فوق الكيبورد أو في الجانب العلوي. اضغط عليه 10 ثوانٍ متواصلة عشان تطفي الجهاز إجبارياً لما يهنج.',
      icon: Power
    },
    {
      id: 'charging_port',
      nameEn: 'Charging Port & Light',
      nameAr: 'منفذ الشاحن ولمبة الإضاءة',
      xPercent: 12,
      yPercent: 45,
      descEn: 'Plug the power cord firmly here. Look for a tiny LED light next to the port that glows orange or white when charging.',
      descAr: 'مكان تركيب فيشة الشاحن. بص جمب الفتحة هتلاقي لمبة صغنونة بتنور برتقالي أو أبيض لما الشاحن يكون واصل صح.',
      icon: Plug
    },
    {
      id: 'volume_keys',
      nameEn: 'Volume & Mute Keys (F1-F12)',
      nameAr: 'أزرار الصوت والكتم (F1 - F12)',
      xPercent: 40,
      yPercent: 22,
      descEn: 'Look at the top row of keys (F1 to F12). Find keys with speaker icons. Press them while holding Fn to adjust sound.',
      descAr: 'بص في الصف اللي فوق خالص في الكيبورد (من F1 لـ F12). هتلاقي أزرار عليها رسمة مكبر صوت. اضغط عليهم مع زرار Fn لرفع الصوت.',
      icon: Volume2
    },
    {
      id: 'ventilation',
      nameEn: 'Cooling Vents (Bottom/Back)',
      nameAr: 'فتحات التهوئة والتبريد',
      xPercent: 50,
      yPercent: 85,
      descEn: 'Keep the bottom vents clear! Never place a laptop on soft blankets or cushions while running to prevent overheating.',
      descAr: 'فتحات التهوئة أسفل اللابتوب. اوعى تحطه على مخدة أو سرير وهو شغال عشان السخونة ما تحرقش المكونات الداخلية!',
      icon: AlertTriangle
    }
  ],
  phone_tablet: [
    {
      id: 'power_side_key',
      nameEn: 'Side Power Key',
      nameAr: 'زر التشغيل الجانبي',
      xPercent: 85,
      yPercent: 28,
      descEn: 'Hold down for 10-15 seconds together with Volume Down to force restart an unresponsive touchscreen.',
      descAr: 'اضغط عليه 10 لـ 15 ثانية متواصلة مع زرار توطية الصوت عشان تجبر الموبايل يعيد التشغيل لما الشاشة تعلق.',
      icon: Power
    },
    {
      id: 'charging_usb',
      nameEn: 'Charging Port (USB-C / Lightning)',
      nameAr: 'فتحة الشاحن أسفل الموبايل',
      xPercent: 50,
      yPercent: 92,
      descEn: 'Ensure no lint or dust is trapped inside. The cable plug should snap firmly without falling out.',
      descAr: 'تأكد إن مفيش تراب أو خيط معلق جوه الفتحة. الكابل لازم يدخل للأخر بـ "طقة" ثابتة.',
      icon: Plug
    },
    {
      id: 'volume_rocker',
      nameEn: 'Volume Up/Down Buttons',
      nameAr: 'أزرار تعلية وتوطية الصوت',
      xPercent: 15,
      yPercent: 32,
      descEn: 'Press Volume Up during calls or media playback. Make sure Silent/Vibrate mode switch is toggled OFF.',
      descAr: 'زرار تعلية وتوطية الصوت الجانبي. تأكد إن زرار الصامت (في الآيفون) مش متفعل بالخطأ.',
      icon: Volume2
    }
  ],
  internet_wifi: [
    {
      id: 'power_cable',
      nameEn: 'Power Socket & Switch',
      nameAr: 'فيشة الكهرباء وزر التشغيل',
      xPercent: 80,
      yPercent: 75,
      descEn: 'Unplug the power cable from the back for 30 seconds to restart the router cleanly.',
      descAr: 'افصل فيشة الكهربا من ظهر الراوتر لمدة 30 ثانية ورجعها تاني عشان ينعش الاتصال بالنت.',
      icon: Plug
    },
    {
      id: 'led_lights',
      nameEn: 'Status Indicator LEDs',
      nameAr: 'لمبات البيان الخضراء',
      xPercent: 50,
      yPercent: 25,
      descEn: 'Power, DSL/Fiber, and Internet lights MUST be solid or blinking green. A red light indicates service provider downtime.',
      descAr: 'لمبة Power و DSL و Internet لازم ينوروا أخضر ثابت أو بيطفش. اللمبة الحمراء تعني وجود عطل عند شركة النت.',
      icon: CheckCircle2
    },
    {
      id: 'reset_button',
      nameEn: 'Reset Pinhole',
      nameAr: 'ثقب إعادة الضبط (Reset)',
      xPercent: 20,
      yPercent: 75,
      descEn: 'Tiny hole requiring a paperclip. ONLY press if advised by technician, as it erases Wi-Fi passwords!',
      descAr: 'خرم صغنن بتحتاج دبوس عشان تضغط عليه. استخدمه فقط برعاية فني النت لأنه بيمسح باسورد الواي فاي!',
      icon: AlertTriangle
    }
  ],
  printer: [
    {
      id: 'paper_tray',
      nameEn: 'Paper Input Tray',
      nameAr: 'درج تغذية الورق',
      xPercent: 50,
      yPercent: 82,
      descEn: 'Align paper edges evenly using the plastic guides. Do not overfill above the max line.',
      descAr: 'ظبط استقامة الورق بالموجهات البلاستيك. بلاش تحط ورق زيادة عن اللزوم عشان ما يتحشرش.',
      icon: Info
    },
    {
      id: 'ink_door',
      nameEn: 'Ink Cartridge Access Door',
      nameAr: 'باب الحبارات وألوان الطباعة',
      xPercent: 50,
      yPercent: 40,
      descEn: 'Open front or top panel to replace ink cartridges. Listen for a clear click when inserting new ones.',
      descAr: 'افتح الباب الأمامي عشان تغير الحبارة. لازم تسمع صوت تكّة لما تحط الحبارة الجديدة مكانها.',
      icon: CheckCircle2
    }
  ],
  tv_remote: [
    {
      id: 'ir_emitter',
      nameEn: 'Remote IR Sensor Eye',
      nameAr: 'عدسة الريموت الحمراء (الإشارة)',
      xPercent: 50,
      yPercent: 12,
      descEn: 'Point the top bulb directly at the TV bottom sensor. Ensure no books or soundbars block line of sight.',
      descAr: 'وجه مقدمة الريموت مباشرة نحو أسفل التلفزيون. اتأكد إن مفيش سماعة أو ديكور محجوب جمب الشاشة.',
      icon: Tv
    },
    {
      id: 'battery_door',
      nameEn: 'Battery Compartment (+/-)',
      nameAr: 'مكان البطاريات والحجارة (+/-)',
      xPercent: 50,
      yPercent: 70,
      descEn: 'Remove cover on the back. Match the flat end of the battery to the spring (- pole).',
      descAr: 'افتح الغطاء الخلفي للريموت. حط الناحية الملساء في البطارية ناحية السوستة السلك (القطب السالم -).',
      icon: Plug
    }
  ],
  facebook: [
    {
      id: 'caps_lock',
      nameEn: 'Keyboard Caps Lock Key',
      nameAr: 'زرار Caps Lock في الكيبورد',
      xPercent: 18,
      yPercent: 50,
      descEn: 'Check if Caps Lock indicator light is glowing! Facebook passwords are case-sensitive.',
      descAr: 'تأكد إن لمبة الحروف الكبيرة مش منورة بالغلط. كلمة السر بتفرق جداً بين الحروف الكبيرة والصغيرة.',
      icon: RotateCcw
    },
    {
      id: 'pull_refresh',
      nameEn: 'App Pull-to-Refresh Gesture',
      nameAr: 'حركة سحب الشاشة لتحت',
      xPercent: 50,
      yPercent: 20,
      descEn: 'Touch top of news feed and drag your finger down until a spinning circle appears.',
      descAr: 'حط صباعك في أعلى الشاشة واسحبه لتحت خالص لحد ما تظهر دايرة بتلف لتحديث المنشورات.',
      icon: RotateCcw
    }
  ],
  whatsapp: [
    {
      id: 'wa_mic',
      nameEn: 'Voice Note Microphone',
      nameAr: 'ميكروفون الملاحظات الصوتية',
      xPercent: 85,
      yPercent: 80,
      descEn: 'Hold the green microphone icon to record. Drag up to lock hands-free recording.',
      descAr: 'اضغط مع الاستمرار على أيقونة الميكروفون الأخضر للتسجيل. اسحب لفوق للتثبيت.',
      icon: MessageCircle
    },
    {
      id: 'wa_settings',
      nameEn: 'App Settings & Notifications',
      nameAr: 'الإعدادات والإشعارات',
      xPercent: 85,
      yPercent: 20,
      descEn: 'Tap 3 dots or gear icon to check notification sound settings and chat backup.',
      descAr: 'اضغط على النقاط الثلاث أو الترس للتحقق من إعدادات الصوت والنسخ الاحتياطي.',
      icon: RotateCcw
    }
  ],
  messenger: [
    {
      id: 'msg_calls',
      nameEn: 'Voice & Video Call Buttons',
      nameAr: 'أزرار المكالمات والصوت',
      xPercent: 80,
      yPercent: 15,
      descEn: 'Located at the top right inside any chat. Tap camera or phone icon to start a call.',
      descAr: 'موجودة في الأعلى على اليمين داخل أي محادثة. اضغط الكاميرا أو الهاتف لبدء مكالمة.',
      icon: MessageSquare
    },
    {
      id: 'msg_bubbles',
      nameEn: 'Chat Heads / Notification Bubbles',
      nameAr: 'فقاعات المحادثة والإشعارات',
      xPercent: 50,
      yPercent: 50,
      descEn: 'Enable "Display over other apps" in phone settings if chat bubbles disappear.',
      descAr: 'فعل خيار "الظهور فوق التطبيقات" في إعدادات الموبايل لو اختفت فقاعات المحادثة.',
      icon: Info
    }
  ],
  other: [
    {
      id: 'general_power',
      nameEn: 'Main Power Switch',
      nameAr: 'زرار الكهرباء والتشغيل',
      xPercent: 50,
      yPercent: 50,
      descEn: 'Check that power adapter is connected securely and switch is ON.',
      descAr: 'تأكد من توصيل محول الكهرباء بشكل سليم وأن زر التشغيل مفعل.',
      icon: Power
    }
  ]
};

export const DeviceHardwareDiagram: React.FC<DeviceHardwareDiagramProps> = ({
  deviceType,
  lang
}) => {
  const hotspots = HARDWARE_HOTSPOTS[deviceType] || HARDWARE_HOTSPOTS.other;
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(hotspots[0]);

  return (
    <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-3xl p-5 sm:p-7 space-y-6 shadow-sm" id="device-visual-map">
      
      {/* HEADER TITLE */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE4DC] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#ECF4F3] text-[#4F7E7A] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#2B2927]">
              {lang === 'ar' ? 'دليل الفحص البصري للجهاز (أين الأزرار والكابلات؟)' : 'Interactive Device Hardware Inspector'}
            </h3>
            <p className="text-xs text-[#7A746E]">
              {lang === 'ar' ? 'اضغط على الدوائر المنورة لمعرفة مكان كل قطعة وكيفية فحصها بسهولة!' : 'Tap the glowing hotspots to locate buttons, ports, and indicators on your device!'}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-white border border-[#EAE4DC] text-[#4F7E7A] rounded-full">
          {lang === 'ar' ? `${hotspots.length} نقاط فحص` : `${hotspots.length} Visual Hotspots`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* INTERACTIVE GRAPHIC STAGE WITH HOTSPOTS */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[340px] h-[240px] bg-white border-2 border-[#EAE4DC] rounded-3xl shadow-inner flex flex-col items-center justify-center p-6 select-none overflow-hidden">
            
            {/* DEVICE SILHOUETTE ICON */}
            <div className="opacity-15 flex flex-col items-center justify-center text-[#2B2927]">
              {deviceType === 'laptop_computer' && <Laptop className="w-36 h-36" />}
              {deviceType === 'phone_tablet' && <Smartphone className="w-32 h-32" />}
              {deviceType === 'internet_wifi' && <Wifi className="w-36 h-36" />}
              {deviceType === 'printer' && <Printer className="w-36 h-36" />}
              {deviceType === 'tv_remote' && <Tv className="w-36 h-36" />}
              {deviceType === 'facebook' && <Facebook className="w-32 h-32 text-blue-600" />}
              {deviceType === 'whatsapp' && <MessageCircle className="w-32 h-32 text-emerald-600" />}
              {deviceType === 'messenger' && <MessageSquare className="w-32 h-32 text-blue-500" />}
              {deviceType === 'other' && <HelpCircle className="w-32 h-32" />}
            </div>

            {/* OVERLAY HOTSPOT BUTTONS */}
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              const IconComp = spot.icon;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D96B43] text-white ring-8 ring-[#D96B43]/20 scale-125 z-10 shadow-lg'
                      : 'bg-white text-[#4F7E7A] border-2 border-[#4F7E7A] hover:bg-[#ECF4F3] hover:scale-110 z-0'
                  }`}
                  title={lang === 'ar' ? spot.nameAr : spot.nameEn}
                >
                  <IconComp className="w-4 h-4" />
                </button>
              );
            })}

            <div className="absolute bottom-2 left-3 text-[10px] text-[#A59F99] font-medium">
              {lang === 'ar' ? '👈 اضغط على النقاط' : '👈 Tap dots to inspect'}
            </div>
          </div>
        </div>

        {/* SELECTED HOTSPOT DETAILS CARD */}
        <div className="md:col-span-6 space-y-4">
          {selectedHotspot && (
            <div className="bg-white border-2 border-[#D96B43] rounded-2xl p-5 shadow-sm space-y-3 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5F1] text-[#D96B43] flex items-center justify-center font-bold">
                  {React.createElement(selectedHotspot.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2B2927]">
                    {lang === 'ar' ? selectedHotspot.nameAr : selectedHotspot.nameEn}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#D96B43] bg-[#FDF6F3] px-2 py-0.5 rounded border border-[#F5D8CE]">
                    {lang === 'ar' ? 'موقع المفتاح / الفتحة' : 'Hardware Location'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#5C5651] leading-relaxed">
                {lang === 'ar' ? selectedHotspot.descAr : selectedHotspot.descEn}
              </p>

              <div className="pt-2 border-t border-[#EAE4DC] flex items-center justify-between text-xs text-[#7A746E]">
                <span>{lang === 'ar' ? 'حالة التقييم:' : 'Check Status:'}</span>
                <span className="font-bold text-[#4F7E7A] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#4F7E7A]" />
                  {lang === 'ar' ? 'سليم وجاهز للتجربة' : 'Ready to inspect'}
                </span>
              </div>
            </div>
          )}

          {/* HOTSPOTS SELECTOR CHIPS */}
          <div className="flex flex-wrap gap-2 pt-1">
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-[#D96B43] text-white border-[#D96B43] shadow-xs'
                      : 'bg-white text-[#5C5651] border-[#EAE4DC] hover:border-[#D96B43]'
                  }`}
                >
                  {lang === 'ar' ? spot.nameAr : spot.nameEn}
                </button>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
