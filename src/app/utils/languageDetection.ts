// Language detection utilities
export const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') return 'EN';
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  const supportedLanguages: { [key: string]: string } = {
    'en': 'EN',
    'uk': 'UA',
    'ru': 'RU'
  };
  
  return supportedLanguages[langCode] || 'EN';
};

export const getLanguageFromURL = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const path = window.location.pathname;
  const langMatch = path.match(/^\/([a-z]{2})\//);
  
  if (langMatch) {
    const urlLang = langMatch[1].toLowerCase();
    const langMap: { [key: string]: string } = {
      'en': 'EN',
      'ua': 'UA',
      'ru': 'RU'
    };
    return langMap[urlLang] || null;
  }
  
  return null;
};

export const updateURLWithLanguage = (languageCode: string) => {
  if (typeof window === 'undefined') return;
  
  const langMap: { [key: string]: string } = {
    'EN': 'en',
    'UA': 'ua',
    'RU': 'ru'
  };
  
  const urlLang = langMap[languageCode];
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  
  // Remove existing language prefix
  const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}\//, '/');
  
  // Add new language prefix (except for English)
  const newPath = languageCode === 'EN' 
    ? pathWithoutLang 
    : `/${urlLang}${pathWithoutLang}`;
  
  window.history.pushState({}, '', newPath + currentSearch);
};