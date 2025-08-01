'use client';

import styles from './TaskInstructions.module.css';

interface TaskInstructionsProps {
  task: any;
  onClose: () => void;
}

export default function TaskInstructions({ task, onClose }: TaskInstructionsProps) {
  return (
    <div className={styles.instructionsPanel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Instructions</h2>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close instructions"
        >
          <svg viewBox="0 0 24 24" className={styles.closeIcon}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <p>Please review the task here and read the full instructions prior to working.</p>
          <p>Not all questions will be initially visible.</p>
        </div>

        <div className={styles.section}>
          <a 
            href="https://docs.google.com/document/d/instructions" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            <u>INSTRUCTIONS - READ FULLY</u>
          </a>
        </div>

        <div className={styles.section}>
          <p>
            See{' '}
            <a 
              href="https://docs.google.com/document/d/faq" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              <u>FAQ</u>
            </a>
            {' '}for more information about reasons why a prompt cannot be rated.
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Task</h3>
          <p>
            In this task, you will be provided with a <strong>Prompt</strong> from a user 
            (for example, a question, instruction, statement) to an AI chatbot along with 
            machine-generated <strong>Responses</strong> to the Prompt.
          </p>
          <p>
            Your job is to assess the <strong>level of accuracy</strong> of the factual 
            information contained in the <strong>Response</strong>.
          </p>
          <p>
            For each <strong>Response</strong>, you will answer <strong>two questions</strong> 
            about that Response. If a Response contains Factual information, you will need to 
            <strong>perform research to assess whether that information is correct</strong>.
          </p>
        </div>

        <div className={styles.warningBox}>
          <p>
            These <strong>Responses</strong> seem like they were produced by a knowledgeable 
            person, but <strong>they often contain incorrect or misleading information.</strong> 
            Please assess the accuracy of these <strong>Responses</strong> by 
            <strong>carefully checking each and every single claim they contain</strong>.
          </p>
        </div>

        {task && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Current Task Details</h3>
            <div className={styles.taskDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Task ID:</span>
                <span className={styles.detailValue}>{task.id}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Title:</span>
                <span className={styles.detailValue}>{task.title}</span>
              </div>
              {task.description && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Description:</span>
                  <span className={styles.detailValue}>{task.description}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}