import { DeviceOption, OsOption, SymptomOption, NegativeSymptomOption, DiagnosticResult, DeviceType } from "./types";
import { LOCAL_ARABIC_TRANSLATIONS } from "./data_arabic";

export const DEVICES: DeviceOption[] = [
  {
    id: 'laptop_computer',
    label: 'Laptop or Computer',
    description: 'Windows PCs, Apple MacBooks, Chromebooks, or desk computers.',
    iconName: 'Laptop'
  },
  {
    id: 'phone_tablet',
    label: 'Phone or Tablet',
    description: 'iPhones, iPads, Android phones, Samsung Galaxies, and tablets.',
    iconName: 'Smartphone'
  },
  {
    id: 'internet_wifi',
    label: 'Wi-Fi & Internet Router',
    description: 'Your internet connection box, Wi-Fi network, or router.',
    iconName: 'Wifi'
  },
  {
    id: 'printer',
    label: 'Printer',
    description: 'For printing documents, photos, scanning, or copying.',
    iconName: 'Printer'
  },
  {
    id: 'tv_remote',
    label: 'TV or Remote Control',
    description: 'Smart TVs, television screens, cable boxes, or remotes.',
    iconName: 'Tv'
  },
  {
    id: 'facebook',
    label: 'Facebook Help',
    description: 'Logins, password recovery, fake locked warnings, and frozen pages.',
    iconName: 'Facebook'
  },
  {
    id: 'other',
    label: 'Something Else',
    description: 'Smart speakers, smartwatches, digital cameras, or other devices.',
    iconName: 'HelpCircle'
  }
];

export const OS_OPTIONS: Record<Exclude<DeviceType, 'other' | 'facebook'>, OsOption[]> = {
  laptop_computer: [
    {
      id: 'windows',
      label: 'Windows PC',
      description: 'The most common computer. Usually says HP, Dell, Lenovo, ASUS, or Acer.',
      iconName: 'Monitor'
    },
    {
      id: 'macos',
      label: 'Apple Mac (macOS)',
      description: 'Laptops called MacBooks or desktop computers called iMacs.',
      iconName: 'Apple'
    },
    {
      id: 'chromebook',
      label: 'Google Chromebook',
      description: 'Affordable laptops running Google Chrome browser as the main system.',
      iconName: 'Chrome'
    },
    {
      id: 'unknown',
      label: 'I am not sure / Help me find out!',
      description: 'We will show you a simple guide with pictures to help you find out.',
      iconName: 'HelpCircle'
    }
  ],
  phone_tablet: [
    {
      id: 'ios',
      label: 'Apple iPhone or iPad',
      description: 'Devices made by Apple with the bitten apple logo on the back.',
      iconName: 'Smartphone'
    },
    {
      id: 'android',
      label: 'Android (Samsung, Pixel, etc.)',
      description: 'Devices made by Samsung, Google, Motorola, LG, or Xiaomi.',
      iconName: 'Smartphone'
    },
    {
      id: 'unknown',
      label: 'I am not sure / Help me find out!',
      description: 'We will show you a simple guide with pictures to help you find out.',
      iconName: 'HelpCircle'
    }
  ],
  internet_wifi: [
    {
      id: 'standard_router',
      label: 'Home Internet Box (Router)',
      description: 'The box supplied by your internet provider (Comcast, AT&T, Spectrum, etc.).',
      iconName: 'Network'
    },
    {
      id: 'unknown',
      label: 'I am not sure',
      description: 'The standard diagnostic steps work for almost all internet connections.',
      iconName: 'HelpCircle'
    }
  ],
  printer: [
    {
      id: 'inkjet',
      label: 'Inkjet Printer (with ink cartridges)',
      description: 'Uses wet ink cartridges. Common for home printing and photos.',
      iconName: 'Printer'
    },
    {
      id: 'laser',
      label: 'Laser Printer (with dry toner)',
      description: 'Uses dry powder (toner). Common for black-and-white documents.',
      iconName: 'Zap'
    },
    {
      id: 'unknown',
      label: 'I am not sure / Help me find out!',
      description: 'We will help you determine what kind of printer you have.',
      iconName: 'HelpCircle'
    }
  ],
  tv_remote: [
    {
      id: 'smart_tv',
      label: 'Smart TV',
      description: 'TV connected to the internet (Samsung, Sony, Roku, LG, Apple TV, Fire TV).',
      iconName: 'Tv'
    },
    {
      id: 'cable_box',
      label: 'Cable / Satellite Box TV',
      description: 'TV connected to a Comcast/Xfinity, Spectrum, or DirecTV box.',
      iconName: 'Layers'
    },
    {
      id: 'unknown',
      label: 'I am not sure',
      description: 'Standard TV setup instructions.',
      iconName: 'HelpCircle'
    }
  ]
};

export const SYMPTOMS: Record<DeviceType, SymptomOption[]> = {
  laptop_computer: [
    { id: 'frozen', label: 'Everything is frozen / stuck', description: 'The mouse cursor won\'t move, or the screen is stuck on one image.' },
    { id: 'no_sound', label: 'No sound / silent', description: 'You play a video or music but cannot hear anything at all.' },
    { id: 'black_screen', label: 'Screen is completely black', description: 'The computer seems to be on (or you don\'t know), but the screen shows nothing.' },
    { id: 'no_internet', label: 'Cannot connect to Wi-Fi / Internet', description: 'Websites won\'t load, or there is a warning symbol on the Wi-Fi icon.' },
    { id: 'slow', label: 'Running extremely slowly', description: 'Everything takes several minutes to open, or there is a constant spinning circle.' },
    { id: 'popups', label: 'Weird warnings or virus alerts pop up', description: 'Scary red or blue screens claim you have a virus and tell you to call a number.' }
  ],
  phone_tablet: [
    { id: 'black_screen', label: 'Screen is completely black / won\'t turn on', description: 'Pressing buttons does not do anything; the screen is dead.' },
    { id: 'no_sound', label: 'No sound / silent ringtone', description: 'You can\'t hear videos, or your phone doesn\'t ring when people call.' },
    { id: 'no_wifi', label: 'Cannot connect to Wi-Fi', description: 'You can\'t check your emails or browse the web while at home.' },
    { id: 'fast_drain', label: 'Battery drains too fast / won\'t charge', description: 'The phone dies in a couple of hours, or it doesn\'t charge when plugged in.' },
    { id: 'frozen', label: 'Screen is frozen / unresponsive', description: 'Tapping the screen does absolutely nothing.' },
    { id: 'storage_full', label: '"Storage Full" warning keeps appearing', description: 'You can\'t take new photos or install apps because of storage alerts.' }
  ],
  internet_wifi: [
    { id: 'no_internet', label: 'The Wi-Fi network is gone completely', description: 'Your Wi-Fi network name does not show up in your settings at all.' },
    { id: 'connected_no_internet', label: 'Connected but says "No Internet"', description: 'Your device connects to the box, but websites still do not load.' },
    { id: 'slow_wifi', label: 'Internet is incredibly slow / videos buffer', description: 'Websites load very slowly, or video streams keep stopping to load.' },
    { id: 'blinking_red', label: 'Red light blinking on my internet box', description: 'The router box has a red light, orange light, or warning light on.' }
  ],
  printer: [
    { id: 'wont_print', label: 'Printer does absolutely nothing', description: 'You press "Print" on your computer, but the printer doesn\'t make a sound.' },
    { id: 'paper_jam', label: 'Paper is jammed inside', description: 'The printer stopped halfway and has paper stuck or crumpled inside.' },
    { id: 'faded_print', label: 'Pages are printing blank or faded', description: 'The paper comes out, but the text is extremely faint, blurry, or missing sections.' },
    { id: 'offline', label: 'Computer says printer is "Offline"', description: 'The printer is on, but your computer claims it cannot find it.' }
  ],
  tv_remote: [
    { id: 'remote_dead', label: 'The TV remote doesn\'t do anything', description: 'Pressing the power button or volume buttons on the remote does nothing.' },
    { id: 'no_signal', label: 'TV screen says "No Signal" or "No Input"', description: 'The TV turns on, but there is just a blue or black screen with a message.' },
    { id: 'blurry_picture', label: 'Picture is blurry, frozen, or blocky', description: 'The image has colored squares or keeps pausing.' },
    { id: 'no_sound', label: 'TV picture is there, but there is no sound', description: 'You can see the actors speaking but can\'t hear anything.' }
  ],
  facebook: [
    { id: 'login_error', label: 'Cannot log in / Forgot password', description: 'It asks for your password or says incorrect password, and you are stuck.' },
    { id: 'hacked_alert', label: 'Scary "Account Hacked" or lock message', description: 'A warning popup or message says your account has been disabled or hacked.' },
    { id: 'not_loading', label: 'Facebook app/website won\'t open at all', description: 'The screen stays white, or there is a spinning circle that never stops.' },
    { id: 'no_posts', label: 'Feed won\'t update or photos won\'t load', description: 'You see the same old posts from last week, or pictures are missing.' }
  ],
  other: [
    { id: 'wont_turn_on', label: 'The device won\'t turn on at all', description: 'It seems completely lifeless and dead.' },
    { id: 'bluetooth_fail', label: 'Cannot connect to Bluetooth', description: 'It won\'t link with your phone or speakers.' },
    { id: 'not_working', label: 'It is not doing what it is supposed to do', description: 'General trouble or unusual behavior.' }
  ]
};

export const NEGATIVE_SYMPTOMS: Record<DeviceType, NegativeSymptomOption[]> = {
  laptop_computer: [
    { id: 'has_power', label: 'I am 100% sure it has power / is plugged in', description: 'The charging light is on or it is plugged securely into the wall.' },
    { id: 'wifi_fine', label: 'My home Wi-Fi is working on other devices', description: 'My phone is connected and working fine on the same Wi-Fi.' },
    { id: 'not_spilled', label: 'I definitely did not spill any liquid on it', description: 'No coffee, water, or tea was spilled on the keyboard recently.' }
  ],
  phone_tablet: [
    { id: 'has_charger', label: 'The charging cable is definitely plugged in tightly', description: 'The cord is pushed all the way in.' },
    { id: 'no_water', label: 'The phone did not get wet or dropped in water', description: 'It has been completely dry.' },
    { id: 'not_cracked', label: 'The glass screen is NOT cracked or broken', description: 'The physical screen is perfectly intact.' }
  ],
  internet_wifi: [
    { id: 'plugged_in', label: 'The internet box is definitely plugged in', description: 'Its front lights are glowing or flashing.' },
    { id: 'bill_paid', label: 'My internet bill is definitely paid', description: 'No issues with account payments.' }
  ],
  printer: [
    { id: 'has_paper', label: 'The paper tray is filled with clean paper', description: 'There is plenty of standard paper sitting in the tray.' },
    { id: 'has_ink', label: 'The ink/toner cartridges were replaced recently', description: 'They shouldn\'t be completely dry.' }
  ],
  tv_remote: [
    { id: 'tv_on', label: 'The TV screen itself definitely has power', description: 'A small red or white light is shining at the bottom of the TV.' },
    { id: 'close_enough', label: 'I am standing close to the TV with no blocks', description: 'There is a straight line of sight to the television.' }
  ],
  facebook: [
    { id: 'know_password', label: 'I am writing down the password exactly', description: 'I am careful about spelling and did not forget it.' },
    { id: 'internet_fine', label: 'My internet and other apps work fine', description: 'YouTube or Google loads perfectly on the same device.' },
    { id: 'real_app', label: 'I am using the official Facebook app / website', description: 'I didn\'t click on any strange link from a text message.' }
  ],
  other: [
    { id: 'plugged_in', label: 'The device is definitely plugged in / charged', description: 'Power source is working.' }
  ]
};

// Comprehensive local diagnostics database
export const LOCAL_DIAGNOSTICS: Record<DeviceType, Record<string, DiagnosticResult>> = {
  laptop_computer: {
    frozen: {
      problemName: "System Freeze (Locked Computer)",
      explanation: "Computers are like brains—sometimes they get overloaded with too many thoughts and get 'stuck'. Reassure yourself: you did nothing wrong! This happens to professionals all the time, and a simple clean restart will clear its head.",
      steps: [
        "Locate the Power Button. On a laptop, it is usually in the top right corner of the keyboard or on the side. On a desktop, it is a large round button on the front or top of the tower. It has a circle symbol with a line at the top.",
        "Press and hold that Power Button down. Do not lift your finger. Count slowly to 10. The screen must go completely dark, and any computer hum or lights should stop.",
        "Take your finger off. Wait 15 seconds. This gives the physical components inside a moment to rest and discharge.",
        "Press the Power Button once normally (just tap it like you usually do). The computer will start up fresh and clean!"
      ],
      youtubeSearchQuery: "how to force restart frozen computer laptop easy steps",
      googleSearchQuery: "unfreeze laptop windows mac simple guide",
      alternativeProblemName: "Overheated Computer",
      alternativeSteps: [
        "Feel the bottom of your laptop. If it feels extremely hot to the touch, the computer might have turned off or frozen to protect itself.",
        "Place it on a hard, flat surface (like a wooden table, not a bed or blanket) so air can flow underneath it.",
        "Let it sit for 20 minutes to cool down completely, then try turning it back on."
      ]
    },
    no_sound: {
      problemName: "Muted Volume or Wrong Speaker Selected",
      explanation: "Most sound problems happen because the computer accidentally turned off its speakers (mute) or is trying to send the audio to headphones that aren't plugged in anymore. This is very quick to fix!",
      steps: [
        "Look at the bottom-right corner of your screen (for Windows) or top-right (for Mac). Look for a tiny speaker icon (looks like a megaphone).",
        "Click on that speaker icon once. A small panel will pop up.",
        "Check for an 'X' or diagonal line next to the speaker. If you see one, click it to unmute. Also, slide the volume bar to the right to at least 50%.",
        "If you have headphones plugged in, pull them out. Sometimes the computer gets confused and keeps sending sound to headphones that aren't on your ears."
      ],
      youtubeSearchQuery: "no sound on laptop how to fix simple steps",
      googleSearchQuery: "fix laptop speaker no sound simple tutorial",
      alternativeProblemName: "Browser Tab is Muted",
      alternativeSteps: [
        "If you are playing a video in Chrome or Safari, look at the very top of the screen at the 'Tab' (the label for the website).",
        "If you see a tiny speaker icon with a line through it on that tab, right-click the tab and choose 'Unmute Site' or click the speaker icon."
      ]
    },
    black_screen: {
      problemName: "Deep Battery Drain or Disconnected Screen",
      explanation: "If your screen is completely black, the computer is most likely out of battery, or it went into a 'deep sleep' mode and got stuck there. We can wake it up!",
      steps: [
        "Plug your laptop's charging brick into a wall outlet and the other end tightly into the laptop. Look for a tiny light near the charging port (usually amber, red, or white). If you see a light, it means power is flowing!",
        "Leave it plugged in for at least 10 minutes. Do not try to turn it on yet; a completely drained battery needs time to recover.",
        "If you are on a desktop computer, walk to the back of the screen (monitor). Make sure the cable running from the screen to the wall is tight, and the cable running to the computer tower is plugged in securely.",
        "Now, press and hold the Power Button for 5 seconds, then let go. Wait 5 seconds, and press it once normally."
      ],
      youtubeSearchQuery: "laptop black screen wont turn on easy fix",
      googleSearchQuery: "fix computer black screen simple troubleshooting",
      alternativeProblemName: "Screen Brightness is at Zero",
      alternativeSteps: [
        "Sometimes we accidentally turn the screen brightness all the way to black.",
        "Look at the top row of keys on your keyboard (the F keys). Look for one with a 'sun' icon with larger rays.",
        "Press that sun button several times to see if your screen lights back up!"
      ]
    },
    no_internet: {
      problemName: "Disconnected Wi-Fi Antenna",
      explanation: "Computers have a tiny wireless receiver inside them. Sometimes it gets temporarily confused or turned off by a mistaken click. Turning it off and on again usually fixes it instantly!",
      steps: [
        "Look at the bottom right corner of your screen. Look for the Wi-Fi icon (looks like a small curved antenna or waves radiating outwards).",
        "Click the Wi-Fi icon. It will open your internet settings.",
        "Look for a button labeled 'Wi-Fi' or 'Network'. Click it to turn Wi-Fi OFF. The icon will turn grey or have a slash.",
        "Wait 10 seconds, then click that same button again to turn Wi-Fi back ON. Wait about 30 seconds for your computer to find your home network and reconnect.",
        "If it asks you to choose a network, click your home network name and click 'Connect'."
      ],
      youtubeSearchQuery: "computer cannot connect to wifi simple fix tutorial",
      googleSearchQuery: "fix computer wifi connection easy",
      alternativeProblemName: "Airplane Mode is Activated",
      alternativeSteps: [
        "Look at your keyboard or your settings panel. Is there a button with an airplane icon lit up?",
        "If 'Airplane Mode' is turned on, it shuts down all internet. Click the airplane icon to turn it OFF, then try connecting to your Wi-Fi again."
      ]
    },
    slow: {
      problemName: "Overcrowded Computer Brain",
      explanation: "When you have too many programs or web pages open at the same time, the computer runs out of 'thinking space' and slows down to a crawl. A simple cleanup will make it speedy again!",
      steps: [
        "Close unnecessary tabs. Look at the very top of your internet browser. If you have dozens of open tabs, click the small 'X' on the ones you aren't using. Each tab consumes memory!",
        "Close unused programs. If you have photo apps, word documents, or games open in the background, close them by clicking the 'X' in their top corners.",
        "Restart your computer. The most reliable way to speed up a computer is to give it a fresh start. Click your Start menu (bottom-left) or Apple menu (top-left), choose 'Power' or 'Shut Down', and click 'Restart'."
      ],
      youtubeSearchQuery: "make slow computer run faster easy guide",
      googleSearchQuery: "speed up slow laptop simple tutorial",
      alternativeProblemName: "System Update Running in Background",
      alternativeSteps: [
        "Computers often update themselves in the background, which makes them run very slowly.",
        "Leave the computer plugged in and idle for an hour without typing. This lets the update finish without interruption."
      ]
    },
    popups: {
      problemName: "Fake Warning Alert Scam",
      explanation: "If a scary message with loud noises pops up saying you have a virus and must call a phone number, REMEMBER: This is a 100% fake scam! Your computer does NOT have a virus. They are just trying to scare you. Do NOT call the number! We can close this scary window easily.",
      steps: [
        "Do NOT call any phone number on the screen. Do NOT click any buttons on that alert.",
        "We need to close your web browser. If you can move your mouse, look at the very top-right of your screen (Windows) or top-left (Mac) and click the 'X' button to close the browser.",
        "If the screen is locked and won't let you click, press these three keys at the same time: Control, Alt, and Delete. A menu will appear. Click 'Task Manager' (on Windows) or force quit. Alternatively, hold down the physical Power Button for 10 seconds to shut the computer down completely.",
        "When you turn the computer back on and open your browser, if it asks 'Do you want to restore your previous tabs?', click NO. This prevents the scary fake page from reopening!"
      ],
      youtubeSearchQuery: "how to close fake computer virus alert scam simple",
      googleSearchQuery: "fake blue screen virus warning scam how to close",
      alternativeProblemName: "Accidental Notification Subscription",
      alternativeSteps: [
        "Sometimes a website tricks us into clicking 'Allow notifications' which pop up in the corner of the screen.",
        "Go into your browser settings (three dots in the corner), search for 'Notifications', and remove any unfamiliar websites."
      ]
    }
  },
  phone_tablet: {
    black_screen: {
      problemName: "Frozen Screen or Deeply Drained Phone",
      explanation: "Phones are mini-computers. Sometimes they run out of charge entirely and need a kickstart, or they freeze while the screen is off and appear completely dead. We can wake them up!",
      steps: [
        "Plug your phone into its charger wire, and plug the charger directly into a wall socket. Make sure you feel it click into the bottom of the phone.",
        "Leave it completely alone for 15 minutes. It might not show anything on the screen right away if it was 100% dead. Be patient!",
        "If it still won't turn on, try a FORCE RESTART:",
        "• For iPhones: Press and quickly release Volume Up button, press and quickly release Volume Down button, then press and hold the Power button (right side) for 15 seconds until you see the Apple logo.",
        "• For Android (Samsung/Pixel): Press and hold both the Power button and the Volume Down button at the same time for 15 full seconds. The phone should vibrate and show its brand logo."
      ],
      youtubeSearchQuery: "phone screen black wont turn on force restart simple steps",
      googleSearchQuery: "fix phone black screen unresponsive tutorial",
      alternativeProblemName: "Faulty Charger Cable",
      alternativeSteps: [
        "If you don't see any charging icons, your charging cord or block might be broken.",
        "Try using a different cable and wall adapter, or try plugging into a different wall socket in another room."
      ]
    },
    no_sound: {
      problemName: "Silent Mode or Muted Switch",
      explanation: "Almost all phone sound issues are caused by an accidental flip of a physical switch or setting. Phones are designed to go completely silent to avoid disturbing you, but it's very easy to toggle back on!",
      steps: [
        "Look at the left side of your phone. If you are using an iPhone, look for a tiny physical switch right above the volume buttons. If you see an orange strip, it is muted! Flip that switch towards the screen to unmute it.",
        "On the side of your phone, press the TOP volume button several times. Look at the screen to ensure the sound bar rises all the way to the top.",
        "Swipe down from the very top of your screen to open your control panel. Look for an icon that looks like a crescent moon (Do Not Disturb) or a bell. If it is highlighted or blue, tap it once to turn it off.",
        "Go to your Settings app (the grey gear icon) -> Sound & Haptics -> and make sure the 'Ringtone and Alerts' slider is pushed all the way to the right."
      ],
      youtubeSearchQuery: "phone silent no sound how to unmute simple tutorial",
      googleSearchQuery: "fix phone ringtone silent volume button",
      alternativeProblemName: "Connected to Wireless Headphones",
      alternativeSteps: [
        "Your phone might be sending sound to wireless Bluetooth headphones that are sitting inside a bag or drawer.",
        "Swipe open your control panel, tap the Bluetooth icon (looks like a runic B symbol) to turn it off, and see if sound comes back to your phone speakers."
      ]
    },
    no_wifi: {
      problemName: "Temporary Network Disconnection",
      explanation: "Your phone connects to Wi-Fi using a tiny antenna. If you walked too far away or if the connection fell asleep, we can easily refresh it in your settings.",
      steps: [
        "Tap on your Settings app (the gear icon on your home screen).",
        "Tap on the word 'Wi-Fi'. Ensure the switch at the top is toggled to ON (green or colored, not grey).",
        "If you are connected but it isn't working, tap on your Wi-Fi network name, and tap 'Forget This Network'. Then tap it again and type in your password to establish a fresh, clean connection.",
        "Alternatively, turn on 'Airplane Mode' (the plane icon in settings) for 10 seconds, then turn it off again. This forces the phone to search for Wi-Fi again."
      ],
      youtubeSearchQuery: "phone wont connect to wifi easy fix tutorial",
      googleSearchQuery: "fix smartphone wifi connection settings",
      alternativeProblemName: "Incorrect Wi-Fi Password",
      alternativeSteps: [
        "Passwords are case-sensitive. Make sure you aren't confusing capital 'I' (eye) with lowercase 'l' (el) or number '1' (one). Check the back of your router for the exact password."
      ]
    },
    fast_drain: {
      problemName: "Bright Screen or Background Clutter",
      explanation: "As phone batteries get older, they run out of power faster. However, the biggest battery consumer is usually the screen brightness or apps running invisibly in the background. We can tweak a few things to make your battery last much longer!",
      steps: [
        "Lower Screen Brightness: Swipe down from the very top of your screen. Slide the brightness slider (usually has a sun icon) to the left to make your screen dimmer. A bright screen is the #1 battery killer!",
        "Turn on Low Power Mode: Go to Settings -> Battery -> and toggle on 'Low Power Mode' (or 'Battery Saver'). This slows down background updates and keeps your phone lasting hours longer.",
        "Close Unused Apps: Swipe up from the bottom of your screen to see your open apps. Swipe them off the screen to close them completely.",
        "Avoid leaving your phone in hot places (like a sunny car dashboard) because heat permanently damages battery life."
      ],
      youtubeSearchQuery: "how to save phone battery life simple tips",
      googleSearchQuery: "stop phone battery draining fast simple settings",
      alternativeProblemName: "Old Battery Degradation",
      alternativeSteps: [
        "If your phone is more than 3 years old, the battery itself may have physically aged and lost its capacity.",
        "You can check this in Settings -> Battery -> Battery Health. If it is below 80%, you can take it to a local shop to have just the battery replaced instead of buying a new phone."
      ]
    },
    frozen: {
      problemName: "App Overload / System Lock",
      explanation: "Sometimes an app on your phone gets confused and stops responding, which freezes the whole screen. A force restart is a perfectly safe, easy tool to clear this out without losing any of your photos or messages!",
      steps: [
        "First, tap the main circular or square button at the bottom of the screen (or swipe up from the bottom) to try to return to the home screen.",
        "If the screen remains frozen, perform a physical Force Restart (this is completely safe):",
        "• iPhones: Press and quickly release Volume Up, press and quickly release Volume Down, then hold the Power button on the right side for 15 seconds until the Apple logo appears.",
        "• Android (Samsung): Press and hold BOTH the Power button and the Volume Down button together for 15 seconds until the screen goes black and vibrates.",
        "Once the phone turns back on, avoid opening the app that caused the freeze until it is updated."
      ],
      youtubeSearchQuery: "how to unfreeze frozen phone screen step by step",
      googleSearchQuery: "force restart frozen unresponsive phone",
      alternativeProblemName: "Unresponsive Touch Screen due to Dirt",
      alternativeSteps: [
        "Sometimes grease, dirt, or water droplets on your screen make it think you are touching it somewhere else, locking up the touch controls.",
        "Wipe the screen thoroughly with a soft cloth or clean shirt, then try tapping again."
      ]
    },
    storage_full: {
      problemName: "Photo and Video Storage Overload",
      explanation: "Every photo, video, and text message takes up space on your phone. When the phone gets completely full, it can't download emails or update apps. We can free up space safely without losing your precious memories!",
      steps: [
        "Delete large, blurry videos: Videos take up 10 times more space than photos! Open your Photos app, go to Albums, scroll down to 'Videos', and delete any old videos you don't need anymore.",
        "Empty your 'Trash': When you delete a photo, your phone holds it for 30 days in a 'Recently Deleted' album. Open Photos -> Albums -> scroll to 'Recently Deleted' -> and click 'Delete All' to actually clear the space!",
        "Delete unused apps: Touch and hold any app icon you haven't opened in months until it shakes, then tap the '-' or 'X' or choose 'Remove App'."
      ],
      youtubeSearchQuery: "how to free up space on phone easily tutorial",
      googleSearchQuery: "clean up smartphone storage space simple steps",
      alternativeProblemName: "Unused Text Message Attachments",
      alternativeSteps: [
        "Text message conversations can store gigabytes of old photos and videos people sent you years ago.",
        "Go to Settings -> General -> iPhone Storage -> Messages to review and delete large attachments easily."
      ]
    }
  },
  internet_wifi: {
    no_internet: {
      problemName: "Invisible Wi-Fi Network",
      explanation: "If your Wi-Fi network name isn't showing up on any of your devices, the router box (which sends out the signal) has likely crashed or suffered a temporary power surge. A reset of the physical box is the absolute gold-standard fix!",
      steps: [
        "Walk over to your internet box (router). It is usually a black or white box with blinking green/blue lights.",
        "Look at the back of the box and locate the power cord. It is usually the thin, round black cord (not the thick blue or yellow internet lines). Unplug it from the wall or pull it out of the back of the box.",
        "Wait. Count slowly to 30. Do not plug it back in immediately; the box needs to fully drain its electric memory.",
        "Plug the power cable back in. The lights on the box will start blinking. This is normal! Wait 3 full minutes. When the lights turn solid green or solid blue, go back to your device and check if your Wi-Fi name has returned."
      ],
      youtubeSearchQuery: "how to restart internet router modem simple steps",
      googleSearchQuery: "restart wifi router unplug power cord",
      alternativeProblemName: "Accidental Router Button Press",
      alternativeSteps: [
        "Some routers have a small button on the side labeled 'Wi-Fi' or 'WPS'.",
        "If this was accidentally pressed, it might have disabled the wireless signal. Press and hold it for 3 seconds to see if the Wi-Fi light turns back on."
      ]
    },
    connected_no_internet: {
      problemName: "Router and Provider Disconnect",
      explanation: "Sometimes your phone connects to your home box perfectly, but the box itself is having trouble talking to the internet company (Comcast, AT&T, etc.). We need to force them to shake hands again!",
      steps: [
        "Unplug the power cord from the back of your internet box (the modem/router).",
        "Unplug any secondary boxes if you have more than one (like a separate Wi-Fi booster or extender).",
        "Wait 30 seconds, then plug the main internet box back in. Wait 3 minutes for all its lights to light up fully.",
        "Now, restart your phone or computer. This makes them ask the newly restarted box for a brand new internet connection.",
        "Try loading a website like 'google.com' to see if it works."
      ],
      youtubeSearchQuery: "connected to wifi but no internet simple fix",
      googleSearchQuery: "wifi connected no internet access easy troubleshooting",
      alternativeProblemName: "Service Provider Outage",
      alternativeSteps: [
        "Sometimes the internet company has a physical outage in your neighborhood due to weather or maintenance.",
        "Call your internet company's automated customer service line, or check their outage map on your phone using cellular data (with Wi-Fi turned off)."
      ]
    },
    slow_wifi: {
      problemName: "Signal Obstruction or Router Congestion",
      explanation: "Wi-Fi travels through the air like light. Solid brick walls, metallic shelves, and large appliances can block the signal. Also, internet boxes get tired after running for months without a break!",
      steps: [
        "Unplug the internet router box for 30 seconds and plug it back in. This clears out temporary data clutter and speeds things up.",
        "Move closer to the router. If you are in another room, walk into the same room as the box to see if websites load instantly. If they do, your Wi-Fi signal is being blocked by walls.",
        "Elevate the router box: Keep it on a table or shelf. Do not hide it inside a cabinet, behind the TV, or on the floor—this suffocates the wireless signal!",
        "Ensure no other devices are downloading massive files (like video games or movies) at the same time."
      ],
      youtubeSearchQuery: "how to speed up slow wifi signal simple tricks",
      googleSearchQuery: "make slow home internet wifi faster easy tips",
      alternativeProblemName: "Outdated Router Equipment",
      alternativeSteps: [
        "If your internet box is more than 5 years old, it may not be able to handle modern internet speeds.",
        "Contact your internet provider and ask them to send you their newest router—they will usually replace it for free!"
      ]
    },
    blinking_red: {
      problemName: "No Cable Connection detected",
      explanation: "A blinking red or orange light on your internet box means it is turned on, but it cannot find the physical cable that brings the internet into your home from the street. A cord has likely come loose!",
      steps: [
        "Look at the back of your internet box.",
        "Find the thick, round cable (coaxial cable, usually black or white with a metal screw-on connector) or the ethernet cable (looks like a thick telephone wire).",
        "Gently twist the metal screw connector clockwise to ensure it is tightened fully. If it is an ethernet wire, push it in until you hear a clear 'click' sound.",
        "Follow that cable to the wall outlet and ensure it is plugged tightly into the wall socket as well.",
        "Unplug the power cord of the box, wait 10 seconds, plug it back in, and watch if the light changes to green or blue."
      ],
      youtubeSearchQuery: "router flashing red light how to fix easy tutorial",
      googleSearchQuery: "internet box blinking red light loose cable",
      alternativeProblemName: "Service Maintenance",
      alternativeSteps: [
        "If all cords are tight, the internet provider is likely doing maintenance on the physical lines outside your home.",
        "This is temporary and usually resolves itself in an hour or two."
      ]
    }
  },
  printer: {
    wont_print: {
      problemName: "Printer Communication Disconnection",
      explanation: "Printers are notorious for falling into a 'deep sleep' or disconnecting from the computer's commands. Most of the time, the computer sent the print job, but the printer is waiting for a simple reset or cable push.",
      steps: [
        "Ensure the printer is actually turned ON. Look for a power light (green, blue, or white) on the front of the printer. If no lights are on, press the Power Button.",
        "If your printer connects with a wire to your computer, unplug the rectangular USB cable from both the computer and the printer, then plug them back in firmly.",
        "Turn the printer OFF using its power button, wait 15 seconds, and turn it back ON. This resets the printer's internal memory and forces it to look for commands again.",
        "Open the paper tray and make sure the paper is aligned perfectly. Sometimes a tiny misalignment triggers a safety sensor that stops printing."
      ],
      youtubeSearchQuery: "printer wont print how to fix simple steps for beginners",
      googleSearchQuery: "fix printer not printing easy checklist",
      alternativeProblemName: "Stuck Print Queue",
      alternativeSteps: [
        "Sometimes a print document gets stuck in line, blocking all other documents.",
        "On your computer, search for 'Printers', click on your printer name, choose 'Open Print Queue', and click 'Cancel All Documents'."
      ]
    },
    paper_jam: {
      problemName: "Crumpled Paper Jam",
      explanation: "A paper jam is very common and completely normal. It happens when paper goes in slightly crooked or is damp from humidity. Don't worry, we can pull it out safely without breaking anything!",
      steps: [
        "Turn the printer OFF first. This stops the internal rollers from spinning and makes it safe to touch.",
        "Open the main access door of the printer (usually where you put the ink, or the paper feed tray).",
        "Look for the stuck piece of paper. Grip it firmly with BOTH hands and pull it out SLOWLY and GENTLY. Pulling with both hands prevents the paper from ripping into tiny pieces inside.",
        "Ensure no tiny scraps of paper are left behind. Use a flashlight or your phone light to double check.",
        "Close all printer doors firmly, turn it back on, and try printing again."
      ],
      youtubeSearchQuery: "how to clear a paper jam printer easily step by step",
      googleSearchQuery: "safe way to remove jammed paper from printer",
      alternativeProblemName: "Overloaded Paper Tray",
      alternativeSteps: [
        "Putting too many sheets in the tray causes the printer rollers to grab multiple pages at once, jamming them.",
        "Take out the paper stack, fan the sheets like a deck of cards, and put back a smaller stack (about half full)."
      ]
    },
    faded_print: {
      problemName: "Dry Ink or Clogged Nozzles",
      explanation: "If your pages are coming out faded, blurry, or with blank white lines across the text, the ink inside the print cartridges has likely dried up a bit because of non-use, or the printer nozzles are clogged with dust.",
      steps: [
        "If you haven't printed in several weeks, the ink at the tip of the cartridge can dry out. Print 2 or 3 pages of simple text to see if the fresh wet ink starts flowing again.",
        "Run the Printer's Built-in Cleaning: Almost all printers have a self-cleaning button. Look at the printer screen (if it has one) -> find 'Tools' or 'Maintenance' -> and select 'Clean Printhead' or 'Nozzle Check'.",
        "If pages are still faded, check your ink levels. On your computer screen, search for your printer app or look at the printer's display screen to see if black or color ink is low.",
        "If ink is extremely low, you will need to purchase and snap in a new ink cartridge."
      ],
      youtubeSearchQuery: "printer printing faded pages blank lines easy fix",
      googleSearchQuery: "fix faded print ink jet cartridge simple tutorial",
      alternativeProblemName: "Protective Tape Still on Cartridge",
      alternativeSteps: [
        "If you recently replaced the ink cartridge, you might have forgotten to remove the tiny protective plastic tape.",
        "Take the cartridge out and ensure the bright orange or blue pull-tab tape is peeled off completely."
      ]
    },
    offline: {
      problemName: "Printer Offline Status",
      explanation: "When your computer says the printer is 'Offline', it simply means the computer cannot find the printer over your home network. They just need to be introduced to each other again!",
      steps: [
        "Ensure the printer is fully powered ON and not in sleep mode (tap the power button once to wake its screen).",
        "Make sure your computer is connected to the exact same Wi-Fi network as the printer. If your computer is on a guest network, it won't see the printer.",
        "Turn the printer OFF, wait 20 seconds, and turn it back ON. This resets its network card.",
        "On your computer, click the Start menu -> type 'Printers' -> click on your printer -> and if there is a checkbox that says 'Use Printer Offline', click it to UNCHECK it."
      ],
      youtubeSearchQuery: "how to fix printer offline error simple guide",
      googleSearchQuery: "printer offline status change to online windows mac",
      alternativeProblemName: "IP Address Change",
      alternativeSteps: [
        "Wi-Fi routers sometimes change the printer's digital address in the house, causing the computer to get lost.",
        "The easiest fix is to unplug the Wi-Fi router box for 30 seconds, plug it back in, wait for internet, and then restart both printer and computer."
      ]
    }
  },
  tv_remote: {
    remote_dead: {
      problemName: "Depleted Remote Batteries",
      explanation: "Remote controls are simple devices that use very little power, but when their batteries drop below a certain level, the infrared light they emit becomes too weak for the TV to see. A simple battery refresh is almost always the solution!",
      steps: [
        "Walk right up to the TV (within 2 feet) and press the power button. If the TV turns on, the remote signal is definitely weak.",
        "Turn the remote over and slide open the battery compartment cover on the back.",
        "Take both batteries out. Put them back in, making sure the flat end of each battery touches the spring inside the compartment.",
        "If that doesn't work, replace them with two brand new AA or AAA batteries from a fresh pack.",
        "Wipe the dark glass tip at the very front of your remote with a soft cloth. Dust or grease can block the invisible laser signal!"
      ],
      youtubeSearchQuery: "tv remote not working simple troubleshooting batteries",
      googleSearchQuery: "fix non responsive tv remote control simple",
      alternativeProblemName: "Unpaired Smart Remote",
      alternativeSteps: [
        "Some modern remotes (like Apple TV, Roku, or Fire TV) connect via Bluetooth and can accidentally get 'unpaired'.",
        "Hold down the 'Home' and 'Back' buttons (or 'Back' and 'Volume Up') together for 10 seconds while pointing it directly at the TV screen to re-pair it."
      ]
    },
    no_signal: {
      problemName: "Wrong TV Input / Channel Source",
      explanation: "If you see a black screen with 'No Signal', 'No Input', or 'HDMI 1' floating on it, don't worry! Your TV is perfectly fine. It is simply looking at the wrong 'doorway' (input) for its picture. We just need to tell it to look at the correct one!",
      steps: [
        "Grab your TV remote (not your cable box remote, the main TV remote, usually says Samsung, LG, Vizio, or Sony).",
        "Look for a button labeled **Input**, **Source**, or **HDMI**. It is usually at the very top or bottom of the remote.",
        "Press that **Input** or **Source** button once. A menu will appear on your TV screen showing options like 'HDMI 1', 'HDMI 2', 'TV', or 'AV'.",
        "Keep pressing the button slowly to move down the list. Stop on 'HDMI 1' or 'HDMI 2' (whichever your cable box or Roku is plugged into) and wait 5 seconds.",
        "Ensure your cable box, Roku, or DVD player is actually turned ON and has lights glowing on its front panel!"
      ],
      youtubeSearchQuery: "tv says no signal how to change input simple tutorial",
      googleSearchQuery: "fix tv no input hdmi black screen",
      alternativeProblemName: "Loose HDMI Cable",
      alternativeSteps: [
        "The wire connecting your cable box or streaming device to the TV may have slipped out.",
        "Look behind your TV and push any thick black HDMI cords tightly into their sockets."
      ]
    },
    blurry_picture: {
      problemName: "Temporary Cable Box Glitch",
      explanation: "If your picture is frozen, blocky (made of tiny colored squares), or the sound is crackling, your TV box is having trouble decoding the incoming signal. It just needs a quick power refresh to clean up the stream!",
      steps: [
        "Walk to your cable box or satellite box (not the TV itself, the extra box that brings in channels).",
        "Find its power cord at the back or wall outlet and unplug it completely.",
        "Wait 15 seconds, then plug it back in. You will see lights flash on the box, and it might say 'Booting' or 'Loading'. Be patient—this can take up to 5 minutes to fully load.",
        "While you wait, ensure the round, metallic cable coming from your wall and screwing into the back of your box is screwed on as tight as possible.",
        "Turn the TV back on and enjoy a crisp, clear picture!"
      ],
      youtubeSearchQuery: "tv picture frozen pixelated blurry easy fix",
      googleSearchQuery: "pixelated tv cable box restart tutorial",
      alternativeProblemName: "Slow Internet Streaming Speed",
      alternativeSteps: [
        "If you are streaming Netflix or YouTube, a blurry picture means your home Wi-Fi is currently running slowly.",
        "Unplug your Wi-Fi router for 30 seconds and plug it back in to boost your internet speed!"
      ]
    },
    no_sound: {
      problemName: "Incorrect TV Audio Destination",
      explanation: "When you see the picture but can't hear anything, the TV volume is either muted, turned to zero, or is trying to send sound to a soundbar or external speaker that is currently turned off or on the wrong setting.",
      steps: [
        "Press the Volume Up button on your main TV remote. Look for the volume number appearing on screen. Make sure it isn't set to '0' or showing a muted speaker symbol.",
        "If you have a separate black speaker bar (soundbar) under your TV, check if its power light is glowing. If it is off, find its power button and turn it on.",
        "Ensure the soundbar is set to the correct setting (usually 'Optical' or 'HDMI ARC'). Use the soundbar's remote to change the input.",
        "Unplug any headphones plugged into the TV's side or back panel."
      ],
      youtubeSearchQuery: "tv has picture but no sound simple troubleshooting",
      googleSearchQuery: "fix television volume no sound audio output",
      alternativeProblemName: "Secondary Remote Mute",
      alternativeSteps: [
        "Sometimes our cable box remote has un-muted the TV, but the TV's main remote still has it muted, or vice versa.",
        "Try pressing the 'Mute' button on EVERY remote sitting on your table once."
      ]
    }
  },
  facebook: {
    login_error: {
      problemName: "Facebook Login or Password Error",
      explanation: "Facebook requires a secret code (password) to make sure it's really you. Sometimes, when Facebook updates or we log out by accident, it asks for this code again. Don't panic! We can recover it easily or check if caps lock is on.",
      steps: [
        "Double check your spelling. Look at your keyboard: did you accidentally turn on the 'Caps Lock' light? If yes, press the Caps Lock key once to turn it off. Capital and lowercase letters must match exactly.",
        "If you wrote down your password in a notebook or on a paper, find it now and type it slowly. Watch your fingers to make sure you do not double-tap any letters.",
        "If it still fails, look for a blue button below the boxes that says 'Forgot Password?' or 'Find Your Account'. Tap or click it.",
        "Facebook will ask for your mobile phone number or your email. Type it in. They will send you a text message with a simple 6-digit number (code). Type that code into the screen, and Facebook will let you set a brand new password!"
      ],
      youtubeSearchQuery: "recover facebook password simple tutorial seniors step by step",
      googleSearchQuery: "facebook login forgot password recovery help",
      alternativeProblemName: "Saved Password in Google or Apple",
      alternativeSteps: [
        "Your phone or computer might have remembered your password for you automatically!",
        "When clicking the box to write your password, look right above your keyboard (on mobile) or below the box (on computer). Do you see a button with your username/email or 'Use Saved Password'? Tap it to log in instantly."
      ]
    },
    hacked_alert: {
      problemName: "Fake Hacking Warning or Locked Screen Scam",
      explanation: "Scammers often send fake messages or popups that look like they are from Facebook saying 'Your account will be deleted' or 'Warning: Account Hacked'. They do this to steal your password. Facebook will never ask you to call a number or pay money to unlock your account!",
      steps: [
        "Do NOT click any links in scary messages, and do NOT type your password or credit card details into any unfamiliar page.",
        "If your Facebook screen is locked with a warning to call a phone number, it is 100% a fake scam. Close the Facebook application or your internet browser completely. If on a phone, swipe the app away.",
        "If you are worried someone actually logged into your account, open the real, official Facebook app or go to www.facebook.com directly.",
        "Go to Menu (your photo in the corner) -> Settings (gear icon) -> Password and Security. If you see anything unusual, click 'Log Out of All Sessions' and click 'Change Password' to make your account perfectly secure."
      ],
      youtubeSearchQuery: "facebook hacked warning scam simple safe steps",
      googleSearchQuery: "facebook fake account hacked locked notice scan security help",
      alternativeProblemName: "Check Authorized Logins",
      alternativeSteps: [
        "To feel completely secure, check the 'Where you are logged in' list under Settings -> Password & Security.",
        "If you see a city or device you don't recognize, just tap the three dots next to it and select 'Log Out'. This instantly disconnects that device!"
      ]
    },
    not_loading: {
      problemName: "Stuck Facebook App or Browser Cache",
      explanation: "The Facebook app or website can get bloated with too many old images and 'stuck' memories. This causes it to spin forever or show a completely blank page. A simple reset of the app or browser will clear its head and make it load instantly!",
      steps: [
        "If you are on a phone or tablet, close the Facebook app completely: swipe up from the bottom of your screen, then swipe the Facebook window up and off the screen to close it.",
        "Wait 10 seconds, then tap the Facebook icon to open it again. This forces it to load fresh.",
        "If you are using a computer browser, look at the top left corner next to the address bar. Click the circular arrow icon ↻ to 'Reload' or 'Refresh' the page.",
        "If it still won't load, check if your device's Wi-Fi is turned on. Turn Wi-Fi off and on again to establish a fresh connection."
      ],
      youtubeSearchQuery: "facebook app wont open black white screen loading fix",
      googleSearchQuery: "facebook app won't open spinning wheel blank page",
      alternativeProblemName: "Check If Facebook Service Is Down",
      alternativeSteps: [
        "Sometimes Facebook's entire worldwide computer system breaks down for everyone. When this happens, nobody in the world can open it.",
        "Ask a family member or neighbor if their Facebook is working, or search Google for 'Is Facebook down'. If it is, you just have to wait a little while for them to fix it!"
      ]
    },
    no_posts: {
      problemName: "Frozen News Feed or App Out of Date",
      explanation: "If Facebook is open but you see the same old posts from last week, or if photos appear as grey squares, the app is having trouble fetching new updates over the internet.",
      steps: [
        "Go to the very top of your Facebook news feed screen. Touch the screen and drag your finger downwards, then let go. You will see a small spinning circle at the top—this 'pull-to-refresh' forces Facebook to search the internet for new posts!",
        "If you are on a phone, make sure your Facebook app is up to date. Open your App Store (Apple) or Play Store (Android), search for 'Facebook', and if you see a button saying 'Update', tap it.",
        "If it is updated and still won't work, turn off your device's Wi-Fi for 30 seconds and turn it back on. Sometimes a weak internet signal is enough to open the app but too weak to fetch large photos."
      ],
      youtubeSearchQuery: "facebook news feed not updating posts won't load",
      googleSearchQuery: "facebook home page news feed frozen same posts",
      alternativeProblemName: "Check Data Saver Settings",
      alternativeSteps: [
        "If you are on mobile data (not Wi-Fi), Facebook has a setting that hides pictures and updates to save you money.",
        "Go to Facebook Menu -> Settings -> Media, and check if 'Data Saver' is turned on. Turn it off to let pictures load beautifully!"
      ]
    }
  },
  other: {
    wont_turn_on: {
      problemName: "Completely Discharged Device",
      explanation: "When a device is totally lifeless, its internal safety switch often shuts it down completely to prevent damage. A fresh, clean charge and power cycle is the best way to revive it!",
      steps: [
        "Connect the device to its charger and leave it plugged into a wall outlet for at least 30 minutes. Do not touch or move it during this time.",
        "Inspect the power cable for any visible tears, rips, or kinks. Try a different charger cable if you have one.",
        "Find the physical power button. Press and hold it down firmly for 15 seconds. On many devices, holding the power button forces a reset.",
        "Make sure the wall outlet is working. You can test it by plugging in a lamp to see if it lights up."
      ],
      youtubeSearchQuery: "device wont turn on simple troubleshooting power reset",
      googleSearchQuery: "fix completely dead device power button reset",
      alternativeProblemName: "Tripped Outlet GFI Switch",
      alternativeSteps: [
        "Sometimes the wall outlet itself has shut off due to a safety trip (especially in kitchens or bathrooms).",
        "Look for an outlet with 'Test' and 'Reset' buttons nearby. Press the 'Reset' button and try plugging in again."
      ]
    }
  }
};

// Return a fallback local diagnostic result if AI is not available
export function getLocalDiagnostic(
  deviceType: DeviceType,
  symptoms: string[] = []
): DiagnosticResult {
  let matchedKey = "wont_turn_on";
  let matchedDeviceType = deviceType;
  let rawDiag: DiagnosticResult;

  const cat = LOCAL_DIAGNOSTICS[deviceType];
  if (!cat) {
    rawDiag = LOCAL_DIAGNOSTICS.other.wont_turn_on;
    matchedDeviceType = "other";
    matchedKey = "wont_turn_on";
  } else {
    // Find the first symptom that has a diagnostic
    let found = false;
    for (const sym of symptoms) {
      if (cat[sym]) {
        rawDiag = cat[sym];
        matchedKey = sym;
        found = true;
        break;
      }
    }

    if (!found) {
      const keys = Object.keys(cat);
      if (keys.length > 0) {
        rawDiag = cat[keys[0]];
        matchedKey = keys[0];
      } else {
        rawDiag = LOCAL_DIAGNOSTICS.other.wont_turn_on;
        matchedDeviceType = "other";
        matchedKey = "wont_turn_on";
      }
    }
  }

  // Create a copy so we don't modify the static LOCAL_DIAGNOSTICS directly
  const diag: DiagnosticResult = { 
    ...rawDiag!, 
    steps: [...rawDiag!.steps], 
    alternativeSteps: [...rawDiag!.alternativeSteps] 
  };

  // Attach Arabic translation
  const arTrans = LOCAL_ARABIC_TRANSLATIONS[matchedDeviceType]?.[matchedKey];
  if (arTrans) {
    diag.problemNameAr = arTrans.problemNameAr;
    diag.explanationAr = arTrans.explanationAr;
    diag.stepsAr = arTrans.stepsAr;
    diag.alternativeProblemNameAr = arTrans.alternativeProblemNameAr;
    diag.alternativeStepsAr = arTrans.alternativeStepsAr;
  }

  return diag;
}
