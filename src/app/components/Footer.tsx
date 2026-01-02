"use client"
import React, { useState } from 'react';
import styles from '../Footer.module.css';
import Image from 'next/image';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isChecked && email) {
      console.log('Email submitted:', email);
      // Handle form submission here
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h3 className={styles.columnTitle}>Solutions</h3>
            <div className={styles.linksSection}>

              <div className={styles.column}>

                <ul className={styles.linkList}>
                  <li><a href="#" className={styles.link}>Mobile Development</a></li>
                  <li><a href="#" className={styles.link}>IT Consulting & Advisory</a></li>
                  <li><a href="#" className={styles.link}>Deployment Services</a></li>
                  <li><a href="#" className={styles.link}>UI/UX Design</a></li>
                </ul>
              </div>
              <div className={styles.column}>
                <ul className={styles.linkList} >
                  <li><a href="#" className={styles.link}>Managed Services</a></li>
                  <li><a href="#" className={styles.link}>Web Development</a></li>
                  <li><a href="#" className={styles.link}>AI/ML & Blockchain</a></li>
                  <li><a href="#" className={styles.link}>Brand Management</a></li>
                </ul>
              </div>
            </div>
            <h3 className={styles.columnTitle}>Company</h3>
            <div className={styles.linksSection}>

              <div className={styles.column}>

                <ul className={styles.linkList}>
                  <li><a href="#" className={styles.link}>About us</a></li>
                  <li><a href="#" className={styles.link}>Why us</a></li>
                  <li><a href="#" className={styles.link}>Team</a></li>
                  <li><a href="#" className={styles.link}>Careers</a></li>
                  <li><a href="#" className={styles.link}>Partners & Certifications</a></li>
                  <li><a href="#" className={styles.link}>Reviews & Awards</a></li>
                </ul>
              </div>
              <div className={styles.column}>
                <ul className={styles.linkList} style={{ marginTop: '2.5rem' }}>
                  <li><a href="#" className={styles.link}>GovTech</a></li>
                  <li><a href="#" className={styles.link}>Web Development</a></li>
                  <li><a href="#" className={styles.link}>Cloud Services</a></li>
                  <li><a href="#" className={styles.link}>Deployment Services</a></li>
                </ul>
              </div>
            </div>

            <div className={styles.subscriptionSection}>
              <h4 className={styles.subscriptionTitle}>Don't miss out any updates</h4>
              <form onSubmit={handleSubmit} className={styles.subscriptionForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  required
                />
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <label htmlFor="privacyConsent" className={styles.checkboxLabel}>
                    I agree to the Privacy Policy and give my permission to process my personal data for the
                    purposes specified in the Privacy Policy.
                  </label>
                </div>
                <button
                  type="submit"
                  className={styles.sendButton}
                  disabled={!isChecked || !email}
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className={styles.rightSection}>


            <div className={styles.logoSection}>
              <div className={styles.logo}>

                <Image
                  src="/footerlogo.jpg"
                  alt="Description of image"
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;