"use client"
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { translationService } from '../services/translationService';
import { detectBrowserLanguage, getLanguageFromURL, updateURLWithLanguage } from '../utils/languageDetection';

interface TranslationContextType {
  currentLanguage: string;
  isTranslating: boolean;
  changeLanguage: (languageCode: string) => Promise<void>;
  translateText: (text: string) => Promise<string>;
  translations: { [key: string]: string };
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});

  // Initialize language from URL or browser detection
  useEffect(() => {
    const urlLanguage = getLanguageFromURL();
    const detectedLanguage = urlLanguage || detectBrowserLanguage();
    
    if (detectedLanguage !== 'EN') {
      setCurrentLanguage(detectedLanguage);
    }
  }, []);

  const changeLanguage = useCallback(async (languageCode: string) => {
    if (languageCode === currentLanguage) return;
    
    setIsTranslating(true);
    setCurrentLanguage(languageCode);
    
    // Update URL with language
    updateURLWithLanguage(languageCode);
    
    // Clear existing translations when language changes
    if (languageCode === 'EN') {
      setTranslations({});
    }
    
    setIsTranslating(false);
  }, [currentLanguage]);

  const translateText = useCallback(async (text: string): Promise<string> => {
    // If current language is English, return original text
    if (currentLanguage === 'EN') {
      return text;
    }

    // Check if translation already exists
    const cacheKey = `${text}_${currentLanguage}`;
    if (translations[cacheKey]) {
      return translations[cacheKey];
    }

    try {
      const azureLanguageCode = translationService.getAzureLanguageCode(currentLanguage);
      const translatedText = await translationService.translateText({
        text,
        to: azureLanguageCode
      });

      // Cache the translation
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }));

      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text on error
    }
  }, [currentLanguage, translations]);

  const value: TranslationContextType = {
    currentLanguage,
    isTranslating,
    changeLanguage,
    translateText,
    translations
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};