"use client"
import { useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const ClientSEO: React.FC = () => {
  const { currentLanguage } = useTranslation();
  
  useEffect(() => {
    // Update HTML lang attribute based on current language
    const langCode = currentLanguage === 'EN' ? 'en' : 
                     currentLanguage === 'UA' ? 'uk' : 
                     currentLanguage === 'RU' ? 'ru' : 'en';
    
    document.documentElement.lang = langCode;
    
    // Update Open Graph locale
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    const locale = langCode === 'en' ? 'en_US' : 
                   langCode === 'uk' ? 'uk_UA' : 
                   langCode === 'ru' ? 'ru_RU' : 'en_US';
    
    updateMetaTag('og:locale', locale);
    
    // Update language alternates
    const updateLinkTag = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      link.href = href;
    };
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://omodigital.com';
    updateLinkTag('en', baseUrl);
    updateLinkTag('uk', `${baseUrl}/ua`);
    updateLinkTag('ru', `${baseUrl}/ru`);
    updateLinkTag('x-default', baseUrl);
    
  }, [currentLanguage]);
  
  return null;
};

export default ClientSEO;