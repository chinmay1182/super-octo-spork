"use client"
import styles from '../NotificationBar.module.css';

export default function NotificationBar() {
 const items = [
  "Created immersive 3D product videos to showcase PineLabs’ offerings",
  "Brucira hosts its third internal football match for some sporty fun",
  "Designed landing page and 3D video for boAt Stone Lumos speakers",
  "Partnered with Plum Goodness for a fresh web design makeover",
  "Yoga Bar saw a 100% boost in average conversion rate following Brucira's web redesign",
  "Swiggy partners with Brucira for Dineout’s design revamp"
];

const message = items.join(" \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ");


  return (
    <div className={`${styles.notificationBar} container-fluid`}>
      <div className={styles.scrollText}>
        {message.repeat(2)} {/* Repeats text to ensure smooth looping */}
      </div>
    </div>
  );
}
