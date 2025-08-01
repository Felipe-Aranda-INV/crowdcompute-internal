'use client';

import { useEffect, useRef } from 'react';
import styles from './WorkArea.module.css';

interface WorkAreaProps {
  taskId?: string;
  taskUrl?: string;
}

export default function WorkArea({ taskId, taskUrl }: WorkAreaProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set up message listener for iframe communication
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== window.location.origin) {
        return;
      }

      // Handle messages from iframe
      switch (event.data.type) {
        case 'task-submitted':
          console.log('Task submitted:', event.data.payload);
          break;
        case 'task-updated':
          console.log('Task updated:', event.data.payload);
          break;
        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Default task URL for demo purposes
  const defaultTaskUrl = '/task-plugin/response-rating';
  const iframeSrc = taskUrl || `${defaultTaskUrl}?taskId=${taskId || 'demo'}`;

  return (
    <div className={styles.workAreaContainer}>
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>Response Rating Task</h3>
        <div className={styles.taskMeta}>
          <span className={styles.metaItem}>Worker Pool: General</span>
          <span className={styles.metaSeparator}>•</span>
          <span className={styles.metaItem}>Question Type: response_rating</span>
        </div>
      </div>
      
      <div className={styles.iframeContainer}>
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          className={styles.taskIframe}
          title="Task Content"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
        
        {!taskId && (
          <div className={styles.noTaskMessage}>
            <svg className={styles.noTaskIcon} viewBox="0 0 24 24">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <p className={styles.noTaskText}>No task available</p>
            <p className={styles.noTaskSubtext}>Please wait while we load the next task...</p>
          </div>
        )}
      </div>
      
      <div className={styles.submissionPanel}>
        <div className={styles.submissionActions}>
          <button className={styles.secondaryButton}>
            Save Draft
          </button>
          <button className={styles.primaryButton}>
            Submit Task
          </button>
        </div>
      </div>
    </div>
  );
}