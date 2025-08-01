'use client';

import { useEffect } from 'react';
import useAgentStore from '@/store/agentStore';
import TaskRenderer from '@/components/tasks/TaskRenderer';
import { CircularProgress, Alert } from '@mui/material';

const AgentPage = () => {
  const {
    currentTask,
    isLoading,
    error,
    actions: { fetchNextTask },
  } = useAgentStore();

  useEffect(() => {
    fetchNextTask();
  }, [fetchNextTask]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!currentTask) {
    return <div>No tasks available.</div>;
  }

  return <TaskRenderer task={currentTask} />;
};

export default AgentPage;