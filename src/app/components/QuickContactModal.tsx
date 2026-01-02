"use client"
import React, { useState } from 'react';
import styles from './QuickContactModal.module.css';
import TranslatedText from './TranslatedText';
import { emailService } from '../services/emailService';
import { trackContactForm } from './Analytics';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickContactModal: React.FC<QuickContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await emailService.sendContactForm({
        fullName: formData.name,
        companyEmail: formData.email,
        companyName: 'Quick Contact',
        projectDescription: formData.message
      });

      if (success) {
        setSubmitStatus('success');
        trackContactForm('quick_contact_modal');

        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setSubmitStatus('idle');
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Quick contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>

          <h2 className={styles.title}>
            <TranslatedText text="Quick Contact" />
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <span className="material-symbols-sharp">close</span>
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.subtitle}>
            <TranslatedText text="Send us a quick message and we'll get back to you soon!" />
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <TranslatedText text="Your Name" />
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <TranslatedText text="Email Address" />
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <TranslatedText text="Message" />
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.textarea}
                rows={4}
                required
              />
            </div>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                <span className="material-symbols-sharp">check_circle</span>
                <TranslatedText text="Message sent successfully! We'll get back to you soon." />
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                <span className="material-symbols-sharp">error</span>
                <TranslatedText text="Failed to send message. Please try again." />
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelBtn}
              >
                <TranslatedText text="Cancel" />
              </button>
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}>⟳</span>
                    <TranslatedText text="Sending..." />
                  </>
                ) : (
                  <>
                    <span className="material-symbols-sharp">send</span>
                    <TranslatedText text="Send Message" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickContactModal;