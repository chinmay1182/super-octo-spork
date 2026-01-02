"use client"
import React, { useState, useEffect } from 'react';
import styles from './MobileNav.module.css';
import TranslatedText from './TranslatedText';
import { useTranslation } from '../contexts/TranslationContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, changeLanguage } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'UA', name: 'Українська', flag: '🇺🇦' },
    { code: 'RU', name: 'Русский', flag: '🇷🇺' }
  ];

  const handleLanguageSelect = async (langCode: string) => {
    await changeLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Menu</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <span className="material-symbols-sharp">close</span>
          </button>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="home" />
          </a>
          <a href="#" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="capabilities" />
          </a>
          <a href="#" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="industries" />
          </a>
          <a href="#" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="solutions" />
          </a>
          <a href="#" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="company" />
          </a>
          <a href="#" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="omo impact" />
          </a>
          <a href="#" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="careers" />
          </a>
        </nav>

        <div className={styles.actions}>
          <div className={styles.languageSection}>
            <button 
              className={styles.languageToggle}
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <span className="material-symbols-sharp">language</span>
              <TranslatedText text="Language" />
              <span className={`material-symbols-sharp ${styles.arrow} ${isLanguageDropdownOpen ? styles.arrowUp : ''}`}>
                keyboard_arrow_down
              </span>
            </button>
            
            {isLanguageDropdownOpen && (
              <div className={styles.languageOptions}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.languageOption} ${currentLanguage === lang.code ? styles.active : ''}`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span className={styles.flag}>{lang.flag}</span>
                    <span className={styles.langName}>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.contact}>
            <div className={styles.supportInfo}>
              <span className={styles.supportLabel}>
                <TranslatedText text="client support" />
              </span>
              <a href="tel:+916390905290" className={styles.phoneNumber}>
                +91 63909 05290
              </a>
            </div>
            
            <button 
              className={styles.quickContactBtn}
              onClick={() => {
                // This will be handled by parent component
                onClose();
                // Trigger quick contact modal
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('openQuickContact'));
                }
              }}
            >
              <span className="material-symbols-sharp">mail</span>
              <TranslatedText text="Quick Contact" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;