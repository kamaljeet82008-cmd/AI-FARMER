import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', short: 'ਪੰਜਾਬੀ', flag: '🌾' },
  { code: 'hi', name: 'हिंदी (Hindi)', short: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', name: 'English', short: 'EN', flag: '🌐' },
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('krishimitra_lang') || 'pa';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('krishimitra_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Nested translation helper: t('land.step1Title')
  const t = (path) => {
    if (!path) return '';
    const keys = path.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if translation missing
        let fallback = translations['en'];
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
