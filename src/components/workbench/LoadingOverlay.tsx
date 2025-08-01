'use client';

import styles from './LoadingOverlay.module.css';

export default function LoadingOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <svg className={styles.spinnerSvg} viewBox="0 0 66 66">
            <circle
              className={styles.spinnerCircle}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
            />
          </svg>
        </div>
        <p className={styles.loadingText}>Loading task...</p>
      </div>
    </div>
  );
}