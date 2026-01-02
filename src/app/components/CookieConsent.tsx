'use client';

import { useEffect, useState } from 'react';
import styles from '../CookieConsent.module.css';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  }

  function rejectAll() {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  }

  function openPreferences() {
    alert('Open your cookie preferences modal or page here.');
  }

  if (!showBanner) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent banner">
      <div className={styles.bannerText}>
        We use cookies for the best user experience on our website, including to personalize content & offerings, to provide social media features and to analyze traffic. By clicking “Accept All Cookies” you agree to our use of cookies. You can also manage your cookies by clicking on the{" "}
       
        and selecting the categories you would like to accept. For more information on how we use cookies please visit our{" "}
        <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
          Cookie Policy
        </a>{" "}
        and{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Statement
        </a>.
      </div>

      <div className={styles.buttons}>
         <button
          className={styles.btnPreference}
          onClick={openPreferences}
          type="button"
          aria-label="Cookie Preferences"
        >
          Cookie Preferences
        </button>{" "}
        <button
          type="button"
          className={styles.btnReject}
          onClick={rejectAll}
          aria-label="Reject all cookies"
        >
          Reject All Cookies
        </button>
        <button
          type="button"
          className={styles.btnAccept}
          onClick={acceptAll}
          aria-label="Accept all cookies"
        >
          Accept All Cookies
        </button>
      </div>
    </div>
  );
}
