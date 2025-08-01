'use client';

import { useState } from 'react';
import styles from './WorkbenchToolbar.module.css';

interface WorkbenchToolbarProps {
  sessionTime: string;
  questionsAvailable: number;
  parkedCount: number;
  canCompleteSession: boolean;
  canParkTask: boolean;
  onCompleteSession: () => void;
  onParkTask: () => void;
  onSkipTask: () => void;
  onReloadPlugin: () => void;
  onToggleInstructions: () => void;
}

export default function WorkbenchToolbar({
  sessionTime,
  questionsAvailable,
  parkedCount,
  canCompleteSession,
  canParkTask,
  onCompleteSession,
  onParkTask,
  onSkipTask,
  onReloadPlugin,
  onToggleInstructions
}: WorkbenchToolbarProps) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [questionInfoOpen, setQuestionInfoOpen] = useState(false);

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        {/* Question Timer */}
        <button 
          className={`${styles.button} ${styles.timerButton}`}
          aria-label="View Question"
          onClick={onToggleInstructions}
        >
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M20.15 8.26l1.2-1.21-1.41-1.41-1.19 1.2C17.14 5.7 15.13 5 13 5c-5.25 0-9.89 4.07-10.62 9.26-.19 1.38-.12 2.8.23 4.18.88 3.47 3.24 6.26 6.33 7.56 1.39.58 2.89.88 4.42.88 5.91 0 10.88-5.08 10.42-11.58a9.86 9.86 0 0 0-3.63-7.04zM13 3.07c2.44 0 4.68.85 6.46 2.27l-5.38 5.38c-.28-.22-.63-.36-1.01-.36-.88 0-1.59.71-1.59 1.59 0 .38.14.73.36 1.02L7.17 17.64A8.39 8.39 0 0 1 5 12c0-4.69 3.88-8.93 9-8.93zm0 17.86a8.928 8.928 0 0 1-4.26-1.06l5.39-5.38c.27.2.61.33.98.33a1.602 1.602 0 0 0 1.14-2.73l4.11-4.11c1.12 1.33 1.8 3.01 1.8 4.83.01 5.09-4.31 9.2-9.16 8.12z M11.11 11.5c-.3 0-.55.25-.55.55s.25.55.55.55.55-.25.55-.55-.25-.55-.55-.55z"/>
          </svg>
          <div className={styles.timerText}>{sessionTime}</div>
        </button>

        {/* Questions Counter */}
        <div className={styles.questionsCounter} title="Total questions available in the workstream">
          <div className={styles.questionsCount}>{questionsAvailable.toLocaleString()}</div>
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Complete Session Button */}
        <button 
          className={`${styles.actionButton} ${!canCompleteSession ? styles.disabled : ''}`}
          aria-label="Complete Session"
          disabled={!canCompleteSession}
          onClick={onCompleteSession}
          title={!canCompleteSession ? "You need to complete more tasks before you can end your session" : "Complete your session"}
        >
          <svg className={styles.actionIcon} viewBox="0 0 24 24">
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </button>

        {/* Park Task Button */}
        <button 
          className={`${styles.actionButton} ${!canParkTask ? styles.disabled : ''}`}
          aria-label="Park"
          disabled={!canParkTask}
          onClick={onParkTask}
          title={!canParkTask ? "This Question Type cannot be parked" : "Park this task for later"}
        >
          <svg className={styles.actionIcon} viewBox="0 0 24 24">
            <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
          </svg>
        </button>

        {/* Parking Lot Button */}
        <button 
          className={styles.actionButton}
          aria-label="Parking lot"
          onClick={() => console.log('Open parking lot')}
        >
          <svg className={styles.actionIcon} viewBox="0 0 24 24">
            <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/>
          </svg>
          {parkedCount > 0 && (
            <span className={styles.badge}>{parkedCount}</span>
          )}
        </button>

        {/* Analytics Button */}
        <button 
          className={styles.actionButton}
          aria-label="Analytics"
          onClick={() => console.log('Open analytics')}
        >
          <svg className={styles.actionIcon} viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        </button>

        {/* More Actions Menu */}
        <div className={styles.moreMenuContainer}>
          <button 
            className={styles.actionButton}
            aria-label="More"
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
          >
            <svg className={styles.actionIcon} viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          
          {moreMenuOpen && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem}>
                <svg className={styles.dropdownIcon} viewBox="0 0 24 24">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                Settings
              </button>
              
              <button className={styles.dropdownItem} onClick={onSkipTask}>
                <svg className={styles.dropdownIcon} viewBox="0 0 24 24">
                  <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>
                </svg>
                Skip
              </button>
              
              <button className={styles.dropdownItem}>
                <svg className={styles.dropdownIcon} viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                Find Answers
              </button>
              
              <button className={`${styles.dropdownItem} ${styles.disabled}`} disabled>
                <svg className={styles.dropdownIcon} viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
                </svg>
                Send Feedback
              </button>
            </div>
          )}
        </div>

        {/* Reload Plugin Button */}
        <button 
          className={styles.actionButton}
          aria-label="Reload Plugin"
          onClick={onReloadPlugin}
        >
          <svg className={styles.actionIcon} viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        </button>

        {/* Question Info Button */}
        <div className={styles.moreMenuContainer}>
          <button 
            className={styles.actionButton}
            aria-label="Question info"
            onClick={() => setQuestionInfoOpen(!questionInfoOpen)}
          >
            <svg className={styles.actionIcon} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </button>
          
          {questionInfoOpen && (
            <div className={styles.dropdown}>
              <div className={styles.questionInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Worker Pool:</span>
                  <span className={styles.infoValue}>General</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Question Type:</span>
                  <span className={styles.infoValue}>response_rating</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Question ID(s):</span>
                  <span className={styles.infoValue}>12345</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}