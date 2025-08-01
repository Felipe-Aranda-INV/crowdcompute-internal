'use client';

import { useState, useEffect } from 'react';
import styles from './response-rating.module.css';

// This would be loaded in the iframe as a separate route
export default function ResponseRatingPlugin() {
  const [taskData, setTaskData] = useState<any>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Get task ID from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('taskId');

    // Fetch task data (mock for now)
    setTaskData({
      id: taskId,
      prompt: "What are the main causes of climate change?",
      responses: [
        {
          id: "resp1",
          text: "The main causes of climate change include greenhouse gas emissions from burning fossil fuels, deforestation, industrial processes, and agriculture. Human activities have increased atmospheric CO2 levels by over 40% since pre-industrial times.",
          model: "Model A"
        },
        {
          id: "resp2",
          text: "Climate change is primarily caused by natural cycles and solar activity. While humans contribute slightly through emissions, the Earth's climate has always varied naturally throughout history.",
          model: "Model B"
        }
      ]
    });
  }, []);

  const handleRatingChange = (responseId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [responseId]: rating }));
  };

  const handleCommentChange = (responseId: string, comment: string) => {
    setComments(prev => ({ ...prev, [responseId]: comment }));
  };

  const handleSubmit = () => {
    // Send message to parent window
    window.parent.postMessage({
      type: 'task-submitted',
      payload: {
        taskId: taskData?.id,
        ratings,
        comments,
        timestamp: new Date().toISOString()
      }
    }, '*');
  };

  if (!taskData) {
    return <div className={styles.loading}>Loading task...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.promptSection}>
        <h3 className={styles.sectionTitle}>User Prompt</h3>
        <div className={styles.promptBox}>
          <p>{taskData.prompt}</p>
        </div>
      </div>

      <div className={styles.responsesSection}>
        <h3 className={styles.sectionTitle}>AI Responses to Evaluate</h3>
        
        {taskData.responses.map((response: any, index: number) => (
          <div key={response.id} className={styles.responseCard}>
            <div className={styles.responseHeader}>
              <span className={styles.responseLabel}>Response {index + 1}</span>
              <span className={styles.modelLabel}>{response.model}</span>
            </div>
            
            <div className={styles.responseText}>
              <p>{response.text}</p>
            </div>
            
            <div className={styles.ratingSection}>
              <label className={styles.ratingLabel}>Accuracy Rating:</label>
              <div className={styles.ratingButtons}>
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    className={`${styles.ratingButton} ${
                      ratings[response.id] === rating ? styles.selected : ''
                    }`}
                    onClick={() => handleRatingChange(response.id, rating)}
                  >
                    {rating}
                  </button>
                ))}
              </div>
              <div className={styles.ratingLabels}>
                <span>Very Inaccurate</span>
                <span>Very Accurate</span>
              </div>
            </div>
            
            <div className={styles.commentSection}>
              <label className={styles.commentLabel}>
                Comments (optional):
              </label>
              <textarea
                className={styles.commentInput}
                rows={3}
                value={comments[response.id] || ''}
                onChange={(e) => handleCommentChange(response.id, e.target.value)}
                placeholder="Provide any additional feedback about this response..."
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={Object.keys(ratings).length < taskData.responses.length}
        >
          Submit Evaluation
        </button>
      </div>
    </div>
  );
}