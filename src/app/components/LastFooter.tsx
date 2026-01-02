import React from 'react';
import styles from '../LastFooter.module.css';
import Image from 'next/image';

const LastFooter: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                {/* Social Media Section */}
                <div className={styles.socialSection}>
                    <span className={styles.followText}>Follow us on</span>
                    <div className={styles.arrow}>→</div>
                    <div className={styles.socialIcons}>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/omodigital/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/linkedin.png"
                                alt="linkedin"
                            />
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/omodigital.io/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/instagram-new--v1.png"
                                alt="instagram"
                            />
                        </a>

                        {/* Facebook */}
                        <a href="https://www.facebook.com/profile.php?id=61574898677320#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/facebook-new.png"
                                alt="facebook"
                            />
                        </a>

                        {/* X (Twitter) */}
                        <a href="https://x.com/omodigital_io" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/twitterx--v2.png"
                                alt="x"
                            />
                        </a>

                        {/* Telegram Bot */}
                        <a href="https://t.me/omodigital_bot" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/telegram-app.png"
                                alt="telegram bot"
                            />
                        </a>

                        {/* Threads */}
                        <a href="https://www.threads.com/@omodigital.io" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/threads.png"
                                alt="threads"
                            />
                        </a>

                        {/* Dribbble */}
                        <a href="https://dribbble.com/omodigitalio" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/dribbble.png"
                                alt="dribbble"
                            />
                        </a>

                        {/* Telegram Channel */}
                        <a href="https://t.me/omodigital" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/telegram-app.png"
                                alt="telegram"
                            />
                        </a>

                        {/* VK */}
                        <a href="https://vk.com/omodigital" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/vk-com.png"
                                alt="vk"
                            />
                        </a>

                        {/* Yandex Zen */}
                        <a href="https://dzen.ru/omodigital" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/yandex-zen.png"
                                alt="yandex zen"
                            />
                        </a>

                        {/* Odnoklassniki */}
                        <a href="https://ok.ru/group/70000040412945" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Image
                                height={40}
                                width={40}
                                src="https://img.icons8.com/ios/50/ffffff/odnoklassniki.png"
                                alt="odnoklassniki"
                            />
                        </a>
                    </div>
                </div>

                {/* Horizontal Line */}
                <div className={styles.divider}></div>

                {/* Main Heading */}
                <div className={styles.mainContent}>
                    <h1 className={styles.mainHeading}>We are looking for a challenge.</h1>
                </div>

                {/* Footer Links */}
                <div className={styles.footerLinks}>
                    <a href="#" className={styles.footerLink}>Privacy Policy</a>
                    <a href="#" className={styles.footerLink}>Terms of service</a>
                    <a href="#" className={styles.footerLink}>Refund Policy</a>
                    <a href="#" className={styles.footerLink}>Acceptable user policy</a>

                    {/* Scroll to Top Button */}
                    <button className={styles.scrollToTop}>
                        <span className="material-symbols-sharp">north</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default LastFooter;
