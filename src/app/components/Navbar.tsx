'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../Navbar.module.css';
import { useTranslation } from '../contexts/TranslationContext';
import TranslatedText from './TranslatedText';
import SearchModal from './SearchModal';
import MobileNav from './MobileNav';
import QuickContactModal from './QuickContactModal';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);
  const { currentLanguage, changeLanguage, isTranslating } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    companyEmail: '',
    companyName: '',
    projectDescription: ''
  });

  // Listen for quick contact event from mobile nav
  React.useEffect(() => {
    const handleQuickContact = () => {
      setIsQuickContactOpen(true);
    };

    window.addEventListener('openQuickContact', handleQuickContact);
    return () => window.removeEventListener('openQuickContact', handleQuickContact);
  }, []);

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'UA', name: 'Українська', flag: '🇺🇦' },
    { code: 'RU', name: 'Русский', flag: '🇷🇺' }
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageSelect = async (langCode: string) => {
    await changeLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form Data:', formData);
    // You can add your form submission logic here
    closeModal();
    // Reset form
    setFormData({
      fullName: '',
      companyEmail: '',
      companyName: '',
      projectDescription: ''
    });
  };

  return (
    <>
      <header className={styles.headerSection}>
        <div className="container-fluid px-4">
          <nav className="navbar navbar-expand-lg p-0">
            {/* Logo - Left */}
            <div className="navbar-brand">
              <Image
                src="/logo2.jpg"
                alt="Logo"
                width={55}
                height={55}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`d-lg-none ${styles.mobileMenuBtn}`}
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile menu"
            >
              <span className="material-symbols-sharp">menu</span>
            </button>

            {/* Navigation Links - Center */}
            <div className={`${styles.navCenter} mx-auto`}>
              <div className={`navbar-nav d-flex flex-row align-items-center ${styles.navbarNav}`}>
                <a className={`nav-link ${styles.navLink} ${styles.activeLink}`} href="#">
                  <span className={styles.linkWithDots}>
                    <TranslatedText text="home" />
                    <span className={styles.dots}></span>
                  </span>
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#">
                  <TranslatedText text="capabilities" />
                  <Image
                    src="/svg-icons/downarrow.svg"
                    alt="dropdown arrow"
                    width={24}
                    height={24}
                    className={styles.navIcon}
                  />
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#">
                  <TranslatedText text="industries" />
                  <Image
                    src="/svg-icons/downarrow.svg"
                    alt="dropdown arrow"
                    width={24}
                    height={24}
                    className={styles.navIcon}
                  />
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#">
                  <TranslatedText text="solutions" />
                  <Image
                    src="/svg-icons/downarrow.svg"
                    alt="dropdown arrow"
                    width={24}
                    height={24}
                    className={styles.navIcon}
                  />
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#">
                  <TranslatedText text="company" />
                  <Image
                    src="/svg-icons/downarrow.svg"
                    alt="dropdown arrow"
                    width={24}
                    height={24}
                    className={styles.navIcon}
                  />
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#"><TranslatedText text="products" /></a>
                <a className={`nav-link ${styles.navLink}`} href="#"><TranslatedText text="careers" /></a>
              </div>
            </div>

            {/* Client Support & Contact - Right */}
            <div className={`d-flex align-items-center ${styles.rightSection}`}>
              <div className={styles.clientSupport}>
                <span className={styles.supportText}>
                  <TranslatedText text="client support" />
                </span>
                <span className={styles.phoneNumber}>+91 63909 05290</span>
              </div>
              <button
                className={`ms-3 ${styles.contactBtn}`}
                onClick={openModal}
                disabled={isTranslating}
              >
                <TranslatedText text="Contact Us" />
                {isTranslating && <span className={styles.loadingSpinner}>⟳</span>}
              </button>

              {/* Icon Section - After Contact Us */}
              <div className={styles.iconSection}>
                <Image
                  src="/svg-icons/search.svg"
                  alt="search"
                  width={35}
                  height={35}
                  className={styles.gradientIcon}
                  onClick={() => setIsSearchModalOpen(true)}
                  style={{ cursor: 'pointer' }}
                  title="Search"
                />
                <Image
                  src="/svg-icons/mail.svg"
                  alt="mail"
                  width={35}
                  height={35}
                  className={styles.gradientIcon}
                  onClick={() => setIsQuickContactOpen(true)}
                  style={{ cursor: 'pointer' }}
                  title="Quick Contact"
                />

                {/* Language Dropdown */}
                <div className={styles.languageDropdown}>
                  <Image
                    src="/svg-icons/language.svg"
                    alt="language"
                    width={35}
                    height={35}
                    className={`${styles.gradientIcon} ${styles.languageIcon}`}
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    style={{ cursor: 'pointer' }}
                  />

                  {isLanguageDropdownOpen && (
                    <div className={styles.languageMenu}>
                      {languages.map((lang) => (
                        <div
                          key={lang.code}
                          className={`${styles.languageOption} ${currentLanguage === lang.code ? styles.activeLanguage : ''}`}
                          onClick={() => handleLanguageSelect(lang.code)}
                        >
                          <span className={styles.languageFlag}>{lang.flag}</span>
                          <span className={styles.languageName}>{lang.name}</span>
                          <span className={styles.languageCode}>{lang.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Quick Contact Modal */}
      <QuickContactModal
        isOpen={isQuickContactOpen}
        onClose={() => setIsQuickContactOpen(false)}
      />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Contact Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.featureHeading}>
                <div className={styles.shapes}>
                  <div className={styles.circle}></div>
                  <div className={styles.triangle}></div>
                  <div className={styles.square}></div>
                  <div className={styles.pentagon}></div>
                </div>
                <h2 className={styles.modalTitle}>
                  <TranslatedText text="Get in Touch" />
                </h2>
              </div>
              <button
                className={styles.closeBtn}
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName" className={styles.formLabel}>
                  <TranslatedText text="Full Name" />
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="companyEmail" className={styles.formLabel}>
                  <TranslatedText text="Company Email" />
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="companyName" className={styles.formLabel}>
                  <TranslatedText text="Company Name" />
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="projectDescription" className={styles.formLabel}>
                  <TranslatedText text="Project Description" />
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelBtn}
                >
                  <TranslatedText text="Cancel" />
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isTranslating}
                >
                  <TranslatedText text="Send Message" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}