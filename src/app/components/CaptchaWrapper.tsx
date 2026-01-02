"use client"
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface CaptchaWrapperProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal';
  className?: string;
}

const CaptchaWrapper: React.FC<CaptchaWrapperProps> = ({
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId, setWidgetId] = useState<number | null>(null);

  useEffect(() => {
    // Load reCAPTCHA script if not already loaded
    if (!window.grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      
      window.onRecaptchaLoad = () => {
        setIsLoaded(true);
      };
      
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && window.grecaptcha && !widgetId) {
      const id = window.grecaptcha.render('recaptcha-container', {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        callback: onVerify,
        'expired-callback': onExpire,
        'error-callback': onError,
        theme,
        size
      });
      setWidgetId(id);
    }
  }, [isLoaded, onVerify, onExpire, onError, theme, size, widgetId]);

  const reset = () => {
    if (window.grecaptcha && widgetId !== null) {
      window.grecaptcha.reset(widgetId);
    }
  };

  const execute = () => {
    if (window.grecaptcha && widgetId !== null) {
      window.grecaptcha.execute(widgetId);
    }
  };

  // Methods are available but not exposed via ref
  // If you need to call reset/execute from parent, you can add them as props

  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return (
      <div className={`${className} captcha-placeholder`}>
        <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
          reCAPTCHA not configured
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div id="recaptcha-container"></div>
      {!isLoaded && (
        <div style={{ 
          width: size === 'compact' ? '164px' : '304px', 
          height: '78px', 
          background: '#f9f9f9', 
          border: '1px solid #d3d3d3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#666'
        }}>
          Loading reCAPTCHA...
        </div>
      )}
    </div>
  );
};

export default CaptchaWrapper;