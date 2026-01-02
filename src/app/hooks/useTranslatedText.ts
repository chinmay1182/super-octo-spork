"use client"
import { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

export const useTranslatedText = (originalText: string): string => {
  const { translateText, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(originalText);

  useEffect(() => {
    const performTranslation = async () => {
      if (currentLanguage === 'EN') {
        setTranslatedText(originalText);
        return;
      }

      try {
        const translated = await translateText(originalText);
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText(originalText);
      }
    };

    performTranslation();
  }, [originalText, translateText, currentLanguage]);

  return translatedText;
};