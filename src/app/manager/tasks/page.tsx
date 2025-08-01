'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';
import useManagerStore from '@/store/managerStore';
import TaskCreator from '@/components/manager/TaskCreator';
import TaskList from '@/components/manager/TaskList';

const ManagerTasksPage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { fetchTasks } = useManagerStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <Toaster position="top-right" />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Task Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
          >
            Create New Task
          </Button>
        </Box>

        <TaskList />

        <TaskCreatorDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
        />
      </Container>
    </>
  );
};

export default ManagerTasksPage;