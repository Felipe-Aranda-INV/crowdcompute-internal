'use client';

import { Chip } from '@mui/material';

interface SuggestionChipProps {
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ label, onClick, selected = false }) => {
  return (
    <Chip
      label={label}
      onClick={onClick}
      color={selected ? 'primary' : 'default'}
      variant={selected ? 'filled' : 'outlined'}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: selected ? undefined : 'rgba(0, 0, 0, 0.04)',
        },
      }}
    />
  );
};

export default SuggestionChip;