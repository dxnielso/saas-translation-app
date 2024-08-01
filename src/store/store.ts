import { create } from "zustand";
import { SubscriptionT } from "@/types";

export type LanguagesSupported =
  | "en"
  | "es"
  | "de"
  | "fr"
  | "hi"
  | "ja"
  | "la"
  | "ru"
  | "zh"
  | "ar"
  | "pt"
  | "ko";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "Ingles",
  es: "Español",
  de: "Alemán",
  fr: "Frances",
  hi: "Hindi",
  ja: "Japonés",
  la: "Latín",
  ru: "Ruso",
  zh: "Chino",
  ar: "Árabe",
  pt: "Portugués",
  ko: "Coreano",
};

const LANGUAGES_FREE = 2;

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: "es",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    // si es pro regresa todos los lenguajes
    if (isPro) {
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
    }
    // si no, solo regresa los primeros dos lenguajes
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      LANGUAGES_FREE
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    // si es pro, no hay lenguajes no soportados
    if (isPro) {
      return [];
    }
    // si no, regresa todos los lenguajes menos los primeros dos
    return Object.keys(LanguagesSupportedMap).slice(
      LANGUAGES_FREE
    ) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: SubscriptionT | null | undefined;
  setSubscription: (subscription: SubscriptionT | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: SubscriptionT | null) =>
    set({ subscription }),
}));
