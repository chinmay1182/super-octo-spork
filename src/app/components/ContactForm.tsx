'use client';

import React, { useState } from 'react';
import styles from '../ContactForm.module.css';
import { emailService } from '../services/emailService';
import { trackContactForm } from './Analytics';
import TranslatedText from './TranslatedText';
import CaptchaWrapper from './CaptchaWrapper';

const ContactForm: React.FC = () => {
    const [selectedServices, setSelectedServices] = useState<string[]>(['Website Development']);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [captchaToken, setCaptchaToken] = useState<string>('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        companyName: '',
        projectDescription: ''
    });

    const services = [
        'Website Development',
        'Design',
        'Mobile',
        'Animation',
        'Illustrations'
    ];

    const faqs = [
        'What will be the responding hours usually?',
        'How do you wireframe the design?',
        'Are you efficient in developing the given project?',
        'What is your average response time?',
        'Where are you located?'
    ];

    const handleServiceToggle = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const handleFAQToggle = (index: number) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!captchaToken) {
            alert('Please complete the CAPTCHA verification');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const success = await emailService.sendContactForm({
                fullName: formData.fullName,
                companyEmail: formData.email,
                companyName: formData.companyName,
                projectDescription: `${formData.projectDescription}\n\nSelected Services: ${selectedServices.join(', ')}`
            });

            if (success) {
                setSubmitStatus('success');
                trackContactForm('main_contact_form');
                
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    companyName: '',
                    projectDescription: ''
                });
                setSelectedServices(['Website Development']);
                setCaptchaToken('');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const handleCaptchaExpire = () => {
        setCaptchaToken('');
    };

    return (
        <div className={`container-fluid ${styles.container}`}>
            <div className="row min-vh-100">
                {/* Left Section */}
                <div className={`col-lg-6 ${styles.leftSection}`}>
                    <div className={styles.leftContent}>
                        <h1 className={styles.mainHeading}>
                            <TranslatedText text="Let's create," /><br />
                            <TranslatedText text="progress together" />
                        </h1>

                        <div className={styles.servicesContainer}>
                            {services.map((service) => (
                                <button
                                    key={service}
                                    className={`${styles.serviceTag} ${selectedServices.includes(service) ? styles.serviceTagSelected : ''
                                        }`}
                                    onClick={() => handleServiceToggle(service)}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <TranslatedText text="Enter your full Name" />
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <TranslatedText text="Company Email" />
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
                                    <TranslatedText text="Company Name" />
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <TranslatedText text="Project Description" />
                                </label>
                                <textarea
                                    name="projectDescription"
                                    value={formData.projectDescription}
                                    onChange={handleInputChange}
                                    className={styles.textarea}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <CaptchaWrapper
                                    onVerify={handleCaptchaVerify}
                                    onExpire={handleCaptchaExpire}
                                    className={styles.captcha}
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className={styles.successMessage}>
                                    <TranslatedText text="Thank you! Your message has been sent successfully." />
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className={styles.errorMessage}>
                                    <TranslatedText text="Sorry, there was an error sending your message. Please try again." />
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className={styles.submitButton}
                                disabled={isSubmitting || !captchaToken}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className={styles.spinner}>⟳</span>
                                        <TranslatedText text="Sending..." />
                                    </>
                                ) : (
                                    <TranslatedText text="Submit Query" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Section */}
                <div className={`col-lg-6 ${styles.rightSection}`}>
                    <div className={styles.rightContent}>
                        <h2 className={styles.faqHeading}>
                            <TranslatedText text="FAQ's" />
                        </h2>

                        <div className={styles.faqContainer}>
                            {faqs.map((faq, index) => (
                                <div key={index} className={styles.faqItem}>
                                    <button
                                        className={styles.faqQuestion}
                                        onClick={() => handleFAQToggle(index)}
                                    >
                                        <span>{faq}</span>
                                        <span className={`${styles.faqIcon} ${expandedFAQ === index ? styles.faqIconExpanded : ''}`}>
                                            <span className="material-symbols-sharp">
                                                keyboard_arrow_down
                                            </span>
                                        </span>
                                    </button>
                                    {expandedFAQ === index && (
                                        <div className={styles.faqAnswer}>
                                            <p>This is a sample answer for the FAQ question. You can customize this content based on your specific needs.</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;