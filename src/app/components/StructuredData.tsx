"use client"
import React from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'BreadcrumbList';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseData,
          name: data.name || 'OMO Digital',
          url: data.url || 'https://omodigital.com',
          logo: data.logo || 'https://omodigital.com/logo.png',
          description: data.description || 'Leading digital transformation company',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-63909-05290',
            contactType: 'customer service',
            availableLanguage: ['English', 'Ukrainian', 'Russian']
          },
          sameAs: data.sameAs || [
            'https://linkedin.com/company/omodigital',
            'https://twitter.com/omodigital'
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN'
          }
        };

      case 'WebSite':
        return {
          ...baseData,
          name: data.name || 'OMO Digital',
          url: data.url || 'https://omodigital.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://omodigital.com/search?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        };

      case 'Service':
        return {
          ...baseData,
          serviceType: data.serviceType,
          provider: {
            '@type': 'Organization',
            name: 'OMO Digital'
          },
          areaServed: data.areaServed || 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital Services',
            itemListElement: data.services || []
          }
        };

      case 'Article':
        return {
          ...baseData,
          headline: data.headline,
          author: {
            '@type': 'Organization',
            name: 'OMO Digital'
          },
          publisher: {
            '@type': 'Organization',
            name: 'OMO Digital',
            logo: {
              '@type': 'ImageObject',
              url: 'https://omodigital.com/logo.png'
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          image: data.image,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          }
        };

      case 'BreadcrumbList':
        return {
          ...baseData,
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      default:
        return baseData;
    }
  };

  const structuredData = generateStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default StructuredData;