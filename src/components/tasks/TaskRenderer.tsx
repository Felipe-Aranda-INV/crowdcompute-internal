'use client';

import { Paper, Box } from '@mui/material';
import { Task, TaskContentItem } from '@/types/tasks';
import ChatBubble from './ChatBubble';
import SuggestionChip from './SuggestionChip';

interface TaskRendererProps {
  task: Task;
}

/**
 * Renders the content of a given task, dynamically displaying different
 * UI components based on the content type.
 */
const TaskRenderer = ({ task }: TaskRendererProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        // Styles from .opa-preview in previewer.css
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
              // Styles from .opa-preview-suggestions-container
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
                  <SuggestionChip key={chipIndex} label={chip.label} />
                ))}
              </Box>
            );

          case 'card':
            return (
              // Styles from .opa-preview-card
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
                  // Style from .opa-preview-card-img
                  style={{ maxWidth: '100%', marginLeft: '-5px' }}
                />
              </Box>
            );

          default:
            return null;
        }
      })}
    </Paper>
  );
};

export default TaskRenderer;
