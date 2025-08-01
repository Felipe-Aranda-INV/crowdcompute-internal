'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './WorkbenchHeader.module.css';

export default function WorkbenchHeader() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  
  // Mock user data - replace with actual user data from auth
  const user = {
    name: 'Manager',
    email: 'manager@example.com',
    profilePicture: '/images/default-avatar.png'
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <svg className={styles.logo} viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className={styles.appTitle}>CrowdCompute</span>
          </div>
        </div>
        
        <div className={styles.rightSection}>
          <button className={styles.appsButton} aria-label="Google apps">
            <svg className={styles.appsIcon} viewBox="0 0 24 24">
              <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"/>
            </svg>
          </button>
          
          <div className={styles.accountContainer}>
            <button 
              className={styles.accountButton}
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              aria-label="Google Account"
            >
              <img 
                src={user.profilePicture} 
                alt={user.name}
                className={styles.profilePicture}
              />
            </button>
            
            {accountMenuOpen && (
              <div className={styles.accountMenu}>
                <div className={styles.accountInfo}>
                  <img 
                    src={user.profilePicture} 
                    alt={user.name}
                    className={styles.menuProfilePicture}
                  />
                  <div className={styles.accountDetails}>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                  </div>
                </div>
                <div className={styles.menuDivider}></div>
                <button className={styles.menuItem}>Manage your Google Account</button>
                <div className={styles.menuDivider}></div>
                <button className={styles.menuItem}>Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}