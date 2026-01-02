// Azure AI Translator Service
interface TranslationResponse {
  translations: Array<{
    text: string;
    to: string;
  }>;
}

interface TranslateOptions {
  text: string;
  from?: string;
  to: string;
}

class TranslationService {
  private apiKey: string;
  private endpoint: string;
  private region: string;

  constructor() {
    // These should be set in your environment variables
    this.apiKey = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_KEY || '';
    this.endpoint = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com';
    this.region = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_REGION || 'global';
  }

  async translateText({ text, from = 'auto', to }: TranslateOptions): Promise<string> {
    if (!this.apiKey) {
      console.warn('Azure Translator API key not found. Using fallback.');
      return text; // Return original text if no API key
    }

    try {
      const response = await fetch(`${this.endpoint}/translate?api-version=3.0&from=${from}&to=${to}`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
          'Ocp-Apim-Subscription-Region': this.region,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ text }]),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data: TranslationResponse[] = await response.json();
      return data[0]?.translations[0]?.text || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  async translateMultiple(texts: string[], to: string): Promise<string[]> {
    if (!this.apiKey) {
      return texts; // Return original texts if no API key
    }

    try {
      const body = texts.map(text => ({ text }));
      
      const response = await fetch(`${this.endpoint}/translate?api-version=3.0&to=${to}`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
          'Ocp-Apim-Subscription-Region': this.region,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data: TranslationResponse[] = await response.json();
      return data.map(item => item.translations[0]?.text || '');
    } catch (error) {
      console.error('Translation error:', error);
      return texts; // Return original texts on error
    }
  }

  // Language code mapping for Azure Translator
  getAzureLanguageCode(code: string): string {
    const languageMap: { [key: string]: string } = {
      'EN': 'en',
      'UA': 'uk',
      'RU': 'ru',
      'AR': 'ar',
      'HE': 'he',
      'ES': 'es',
      'FR': 'fr',
      'DE': 'de',
      'IT': 'it',
      'PT': 'pt',
      'JA': 'ja',
      'KO': 'ko',
      'ZH': 'zh'
    };
    return languageMap[code] || 'en';
  }

  // Get supported languages
  async getSupportedLanguages(): Promise<any> {
    try {
      const response = await fetch(`${this.endpoint}/languages?api-version=3.0`);
      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching supported languages:', error);
      return null;
    }
  }
}

export const translationService = new TranslationService();
export default TranslationService;