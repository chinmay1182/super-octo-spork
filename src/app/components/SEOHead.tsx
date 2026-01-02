"use client"
import { useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'OMO Digital | Code. Create. Celebrate.',
  description = 'Leading digital transformation company specializing in web development, mobile apps, AI/ML, and cloud solutions.',
  keywords = 'web development, mobile apps, AI, machine learning, cloud services, digital transformation, software development',
  image = '/og-image.jpg',
  url = 'https://omodigital.com',
  type = 'website',
  author = 'OMO Digital',
  publishedTime,
  modifiedTime
}) => {
  const { currentLanguage } = useTranslation();
  
  useEffect(() => {
    const langCode = currentLanguage.toLowerCase();
    const fullTitle = title.includes('OMO Digital') ? title : `${title} | OMO Digital`;
    
    // Update document title
    document.title = fullTitle;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('language', langCode);
    
    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:site_name', 'OMO Digital', true);
    updateMetaTag('og:locale', langCode === 'en' ? 'en_US' : langCode === 'ua' ? 'uk_UA' : 'ru_RU', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@omodigital');
    
    // Article specific tags
    if (type === 'article' && publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    if (type === 'article' && modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
    }
    if (type === 'article') {
      updateMetaTag('article:author', author, true);
    }
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
  }, [currentLanguage, title, description, keywords, image, url, type, author, publishedTime, modifiedTime]);
  
  return null; // This component doesn't render anything visible
};

export default SEOHead;