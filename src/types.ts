export type DeviceType = 'laptop_computer' | 'phone_tablet' | 'internet_wifi' | 'printer' | 'tv_remote' | 'facebook' | 'whatsapp' | 'messenger' | 'other';

export interface DeviceOption {
  id: DeviceType;
  label: string;
  description: string;
  iconName: string; // lucide icon name
}

export interface OsOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export interface SymptomOption {
  id: string;
  label: string;
  description: string;
}

export interface NegativeSymptomOption {
  id: string;
  label: string;
  description: string;
}

export interface DiagnosticResult {
  problemName: string;
  problemNameAr?: string;
  explanation: string;
  explanationAr?: string;
  steps: string[];
  stepsAr?: string[];
  youtubeSearchQuery: string;
  googleSearchQuery: string;
  alternativeProblemName: string;
  alternativeProblemNameAr?: string;
  alternativeSteps: string[];
  alternativeStepsAr?: string[];
}

export interface DiagnoseRequest {
  deviceType: DeviceType;
  os: string;
  symptoms: string[];
  customSymptom: string;
  negativeSymptoms: string[];
  failedAttempts: string[];
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  deviceType: DeviceType;
  problemName: string;
  resolved: boolean;
}
