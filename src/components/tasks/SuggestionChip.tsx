'use client';

type Props = {
  suggestion: string;
  onClick: (suggestion: string) => void;
};

const SuggestionChip = ({ suggestion, onClick }: Props) => {
  return (
    <button
      style={{
        background: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '16px',
        padding: '8px 12px',
        margin: '4px',
        cursor: 'pointer',
      }}
      onClick={() => onClick(suggestion)}
    >
      {suggestion}
    </button>
  );
};

export default SuggestionChip;