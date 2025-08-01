'use client';

import useTaskStore from '@/store/taskStore';
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';

/**
 * Displays a list of available tasks and allows the user to select one.
 */
const TaskList = () => {
  const { tasks, currentTask, actions } = useTaskStore();

  if (tasks.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography>No tasks available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ maxHeight: '80vh', overflow: 'auto' }}>
      <List component="nav">
        {tasks.map((task) => (
          <ListItemButton
            key={task.id}
            selected={currentTask?.id === task.id}
            onClick={() => actions.setCurrentTask(task.id)}
          >
            <ListItemText
              primary={task.title}
              secondary={task.description}
              primaryTypographyProps={{ noWrap: true, fontWeight: 'medium' }}
              secondaryTypographyProps={{ noWrap: true }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
