'use client';

import { useState } from 'react';
import { Paper, Box, Button, Alert } from '@mui/material';
import { Task, TaskContentItem } from '@/types/tasks';
import ChatBubble from './ChatBubble';
import SuggestionChip from './SuggestionChip';
import useAgentStore from '@/store/agentStore';
import toast from 'react-hot-toast';

interface TaskRendererProps {
  task: Task;
}

const TaskRenderer = ({ task }: TaskRendererProps) => {
  const [answer, setAnswer] = useState<Record<string, any>>({});
  const { submitTask, isSubmitting } = useAgentStore();

  const handleSuggestionClick = (suggestion: string) => {
    setAnswer({ ...answer, selectedSuggestion: suggestion });
  };

  const handleSubmit = async () => {
    if (Object.keys(answer).length === 0) {
      toast.error('Please select an answer before submitting');
      return;
    }

    try {
      await submitTask({
        taskId: task.id,
        agentId: 'agent-001', // This should come from auth context in production
        answer,
      });
      toast.success('Task submitted successfully!');
      setAnswer({}); // Reset answer for next task
    } catch (error) {
      toast.error('Failed to submit task');
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        padding: '16px 12px',
        backgroundColor: '#eceff1',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: '"Roboto", sans-serif',
        fontSize: '16px',
      }}
    >
      {task.content.map((item, index) => {
        switch (item.type) {
          case 'chat':
            return (
              <ChatBubble
                key={index}
                author={item.content.author}
                text={item.content.text}
              />
            );

          case 'suggestions':
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  overflowX: 'auto',
                  paddingBottom: '4px',
                }}
              >
                {item.suggestions.map((chip, chipIndex) => (
                  <SuggestionChip
                    key={chipIndex}
                    label={chip.label}
                    onClick={() => handleSuggestionClick(chip.label)}
                    selected={answer.selectedSuggestion === chip.label}
                  />
                ))}
              </Box>
            );

          case 'card':
            return (
              <Box
                key={index}
                sx={{
                  lineHeight: 0,
                  mt: '4px',
                }}
              >
                <img
                  src={item.content.imageUrl}
                  alt="Task-related card content"
                  style={{ maxWidth: '100%', marginLeft: '-5px' }}
                />
              </Box>
            );

          default:
            return null;
        }
      })}

      {answer.selectedSuggestion && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Selected: {answer.selectedSuggestion}
        </Alert>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || Object.keys(answer).length === 0}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskRenderer;