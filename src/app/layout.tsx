import type { Metadata } from 'next';
import './globals.css';
import TitleVisibilityHandler from '../../TitleVisibilityHandler';
import CookieConsent from './components/CookieConsent';
import WhatsAppFloat from './components/WhatsAppFloat';
import { TranslationProvider } from './contexts/TranslationContext';
import ErrorBoundary from './components/ErrorBoundary';
import AnalyticsWrapper from './components/AnalyticsWrapper';


export const metadata: Metadata = {
  metadataBase: new URL('https://omodigital.io'),
  title: 'O M O',
  description: 'Leading digital transformation company specializing in web development, mobile apps, AI/ML, and cloud solutions.',
  keywords: 'web development, mobile apps, AI, machine learning, cloud services, digital transformation, software development',
  authors: [{ name: 'OMO Digital' }],
  creator: 'OMO Digital',
  publisher: 'OMO Digital',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://omodigital.io',
    siteName: 'OMO Digital',
    title: 'O M O',
    description: 'Leading digital transformation company specializing in web development, mobile apps, AI/ML, and cloud solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OMO Digital - Code. Create. Celebrate.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O M O',
    description: 'Leading digital transformation company specializing in web development, mobile apps, AI/ML, and cloud solutions.',
    creator: '@omodigital',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#8b5cf6',
    'msapplication-TileColor': '#8b5cf6',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#8b5cf6" />
        
        {/* Variable font loading */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body>
        <ErrorBoundary>
          <TranslationProvider>
            <AnalyticsWrapper />
            <TitleVisibilityHandler />
            <CookieConsent />
            <WhatsAppFloat />
            {children}
          </TranslationProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
