"use client"
import styles from '../HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                We view every project as a partnership, where our passion for{' '}
                <span className={styles.highlight}>innovation</span> meets our clients' drive for progress, creating transformative results together.
              </h1>

              <div className={styles.ctaContainer}>
                <button className={styles.ctaButton}>
                  Let's Collaborate
                  <span
                    className="material-symbols-sharp"
                    style={{
                      fontSize: '70px!important', // this auto-adjusts 'opsz'
                      fontVariationSettings: `'FILL' 0, 'wght' 300, 'GRAD' 0`, // no 'opsz' needed
                    }}
                  >
                    north_east
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;