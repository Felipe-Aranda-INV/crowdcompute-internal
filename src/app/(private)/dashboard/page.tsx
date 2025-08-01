'use client';

import { useEffect } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import useTaskStore from '@/store/taskStore';
import TaskList from '@/components/tasks/TaskList';
import TaskRenderer from '@/components/tasks/TaskRenderer';
import MainToolbar from '@/components/shell/MainToolbar';

const AgentDashboardPage = () => {
  const { currentTask, actions } = useTaskStore();

  useEffect(() => {
    const fetchAndSetTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const result = await response.json();
        if (result.success) {
          actions.setTasks(result.data);
        } else {
          console.error('Failed to fetch tasks:', result.message);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchAndSetTasks();
  }, [actions]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MainToolbar />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} md={4} lg={3}>
          <TaskList />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {currentTask ? (
            <TaskRenderer task={currentTask} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading tasks...</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentDashboardPage;
