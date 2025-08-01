'use client';

import { useState } from 'react';
import useManagerStore from '@/store/managerStore';
import toast from 'react-hot-toast';
import { Task, TaskContentItem, SuggestionChip } from '@/types/tasks';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  AddCircleOutline,
  Delete,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

const TaskCreator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState<TaskContentItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createTask } = useManagerStore();

  const addContentItem = (type: 'chat' | 'suggestions' | 'card') => {
    let newItem: TaskContentItem;
    switch (type) {
      case 'chat':
        newItem = { type: 'chat', content: { author: 'assistant', text: '' } };
        break;
      case 'suggestions':
        newItem = { type: 'suggestions', suggestions: [{ label: '' }] };
        break;
      case 'card':
        newItem = { type: 'card', content: { imageUrl: '' } };
        break;
    }
    setContent([...content, newItem]);
  };

  const handleContentChange = (index: number, newContent: TaskContentItem) => {
    const updatedContent = [...content];
    updatedContent[index] = newContent;
    setContent(updatedContent);
  };

  const removeContentItem = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const moveContentItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === content.length - 1)
    ) {
      return;
    }
    const newContent = [...content];
    const item = newContent.splice(index, 1)[0];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    newContent.splice(newIndex, 0, item);
    setContent(newContent);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const taskData = { title, description, content };

    try {
      await createTask(taskData);
      toast.success('Task created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setContent([]);
    } catch (error) {
      toast.error('Failed to create task. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Create a New Task
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={2}
          required
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Task Content
        </Typography>

        {content.map((item, index) => (
          <ContentItemEditor
            key={index}
            item={item}
            onChange={(newItem) => handleContentChange(index, newItem)}
            onRemove={() => removeContentItem(index)}
            onMove={(dir) => moveContentItem(index, dir)}
          />
        ))}

        <Box sx={{ mt: 2 }}>
          <Button
            startIcon={<AddCircleOutline />}
            onClick={() => addContentItem('chat')}
            sx={{ mr: 1 }}
          >
            Add Chat
          </Button>
          <Button
            startIcon={<AddCircleOutline />}
            onClick={() => addContentItem('suggestions')}
            sx={{ mr: 1 }}
          >
            Add Suggestions
          </Button>
          <Button
            startIcon={<AddCircleOutline />}
            onClick={() => addContentItem('card')}
          >
            Add Card
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !title || !description || content.length === 0}
          sx={{ mt: 4 }}
        >
          {isSubmitting ? 'Submitting...' : 'Create Task'}
        </Button>
      </Box>
    </Paper>
  );
};

// A sub-component to edit a single content item
interface ContentItemEditorProps {
  item: TaskContentItem;
  onChange: (item: TaskContentItem) => void;
  onRemove: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

const ContentItemEditor: React.FC<ContentItemEditorProps> = ({ item, onChange, onRemove, onMove }) => {
  const renderEditor = () => {
    switch (item.type) {
      case 'chat':
        return (
          <Box>
            <FormControl fullWidth size="small" sx={{ mb: 1 }}>
              <InputLabel>Author</InputLabel>
              <Select
                value={item.content.author}
                label="Author"
                onChange={(e) =>
                  onChange({ ...item, content: { ...item.content, author: e.target.value as 'user' | 'assistant' } })
                }
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="assistant">Assistant</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Chat Text"
              value={item.content.text}
              onChange={(e) =>
                onChange({ ...item, content: { ...item.content, text: e.target.value } })
              }
              multiline
              rows={2}
              required
            />
          </Box>
        );
      
      case 'suggestions':
        const handleChipChange = (chipIndex: number, newLabel: string) => {
          const newSuggestions = [...item.suggestions];
          newSuggestions[chipIndex] = { label: newLabel };
          onChange({ ...item, suggestions: newSuggestions });
        };
        
        const addChip = () => {
          onChange({ ...item, suggestions: [...item.suggestions, { label: '' }] });
        };
        
        const removeChip = (chipIndex: number) => {
          onChange({
            ...item,
            suggestions: item.suggestions.filter((_, i) => i !== chipIndex),
          });
        };
        
        return (
          <Box>
            {item.suggestions.map((chip, i) => (
              <Chip
                key={i}
                label={
                  <TextField
                    variant="standard"
                    size="small"
                    value={chip.label}
                    onChange={(e) => handleChipChange(i, e.target.value)}
                    placeholder="Chip Label"
                    sx={{ width: '150px' }}
                  />
                }
                onDelete={() => removeChip(i)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
            <IconButton onClick={addChip} size="small" color="primary">
              <AddCircleOutline />
            </IconButton>
          </Box>
        );
      
      case 'card':
        return (
          <TextField
            fullWidth
            label="Image URL"
            value={item.content.imageUrl}
            onChange={(e) =>
              onChange({ ...item, content: { imageUrl: e.target.value } })
            }
            placeholder="https://example.com/image.jpg"
            required
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }} elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
          {item.type} Block
        </Typography>
        <Box>
          <IconButton onClick={() => onMove('up')} size="small" color="primary">
            <ArrowUpward />
          </IconButton>
          <IconButton onClick={() => onMove('down')} size="small" color="primary">
            <ArrowDownward />
          </IconButton>
          <IconButton onClick={onRemove} size="small" color="error">
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Box>{renderEditor()}</Box>
    </Paper>
  );
};

export default TaskCreator;