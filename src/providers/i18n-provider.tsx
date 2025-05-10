"use client";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { ReactNode, useState, useEffect } from "react";
import en from "@/assets/languages/en.json";
import he from "@/assets/languages/he.json";

export const defaultLang = "en";
export const fallbackLang = "he";
export const supportedLanguages = ["en", "he"];

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      he: { translation: he },
    },
    lng: defaultLang,
    fallbackLng: fallbackLang,
    interpolation: {
      escapeValue: false,
    },
  });
}

export function changeLanguage(lang: string) {
  if (supportedLanguages.includes(lang)) {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;

    document.documentElement.dir =
      lang === "he" || lang === "ar" ? "rtl" : "ltr";

    localStorage.setItem("language", lang);
  }
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || defaultLang;
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      changeLanguage(savedLanguage);
    }

    setIsMounted(true);
    const handleLanguageChanged = () => {
      forceUpdate({});
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div
        style={{
          visibility: isMounted ? "visible" : "hidden",
          opacity: isMounted ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {children}
      </div>
    </I18nextProvider>
  );
}

export default i18n;
