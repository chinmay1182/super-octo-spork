// RTL (Right-to-Left) language support utilities

export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export const isRTLLanguage = (languageCode: string): boolean => {
  const azureCode = getAzureLanguageCode(languageCode);
  return RTL_LANGUAGES.includes(azureCode);
};

export const getAzureLanguageCode = (code: string): string => {
  const languageMap: { [key: string]: string } = {
    'EN': 'en',
    'UA': 'uk',
    'RU': 'ru',
    'AR': 'ar',
    'HE': 'he'
  };
  return languageMap[code] || 'en';
};

export const applyRTLStyles = (languageCode: string) => {
  if (typeof document === 'undefined') return;
  
  const isRTL = isRTLLanguage(languageCode);
  const htmlElement = document.documentElement;
  
  if (isRTL) {
    htmlElement.setAttribute('dir', 'rtl');
    htmlElement.classList.add('rtl');
  } else {
    htmlElement.setAttribute('dir', 'ltr');
    htmlElement.classList.remove('rtl');
  }
};

export const getRTLAwareStyles = (languageCode: string) => {
  const isRTL = isRTLLanguage(languageCode);
  
  return {
    textAlign: isRTL ? 'right' as const : 'left' as const,
    direction: isRTL ? 'rtl' as const : 'ltr' as const,
    marginLeft: isRTL ? 'auto' : undefined,
    marginRight: isRTL ? undefined : 'auto',
  };
};