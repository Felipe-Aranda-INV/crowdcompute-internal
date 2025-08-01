'use client';

import { useEffect, useState } from 'react';
import useTaskStore from '@/store/taskStore';
import WorkbenchHeader from '@/components/workbench/WorkbenchHeader';
import WorkbenchToolbar from '@/components/workbench/WorkbenchToolbar';
import TaskInstructions from '@/components/workbench/TaskInstructions';
import WorkArea from '@/components/workbench/WorkArea';
import LoadingOverlay from '@/components/workbench/LoadingOverlay';
import styles from './workbench.module.css';

export default function WorkbenchPage() {
  const { currentTask, isLoading, fetchNextTask } = useTaskStore();
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [parkedCount, setParkedCount] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [questionsAvailable, setQuestionsAvailable] = useState(5000);

  useEffect(() => {
    // Fetch initial task when component mounts
    fetchNextTask();

    // Start session timer
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [fetchNextTask]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteSession = () => {
    // TODO: Implement session completion logic
    console.log('Complete session');
  };

  const handleParkTask = () => {
    // TODO: Implement park task logic
    console.log('Park task');
    setParkedCount(prev => prev + 1);
  };

  const handleSkipTask = () => {
    // TODO: Implement skip task logic
    console.log('Skip task');
    fetchNextTask();
  };

  const handleReloadPlugin = () => {
    // Reload the iframe content
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const canCompleteSession = tasksCompleted >= 5; // Example: require 5 tasks
  const canParkTask = currentTask !== null;

  return (
    <div className={styles.workbenchContainer}>
      <WorkbenchHeader />
      
      <WorkbenchToolbar
        sessionTime={formatTime(sessionTime)}
        questionsAvailable={questionsAvailable}
        parkedCount={parkedCount}
        canCompleteSession={canCompleteSession}
        canParkTask={canParkTask}
        onCompleteSession={handleCompleteSession}
        onParkTask={handleParkTask}
        onSkipTask={handleSkipTask}
        onReloadPlugin={handleReloadPlugin}
        onToggleInstructions={() => setInstructionsOpen(!instructionsOpen)}
      />
      
      <div className={styles.mainContent}>
        {instructionsOpen && (
          <TaskInstructions
            task={currentTask}
            onClose={() => setInstructionsOpen(false)}
          />
        )}
        
        <div className={styles.workAreaContainer}>
          <WorkArea
            taskId={currentTask?.id}
            taskUrl={currentTask?.content?.url || ''}
          />
        </div>
      </div>
      
      {isLoading && <LoadingOverlay />}
    </div>
  );
}