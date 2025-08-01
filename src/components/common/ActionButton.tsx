// components/common/ActionButton.tsx
'use client';
import { Button, Tooltip, SvgIcon, CircularProgress, Box } from '@mui/material';
import React from 'react';

interface ActionButtonProps {
  label: string;
  tooltip: string;
  icon: React.ElementType<typeof SvgIcon>;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ label, tooltip, icon: Icon, onClick, disabled, loading }, ref) => {
    const buttonContent = (
      <Box
        component="button"
        ref={ref}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={label}
        sx={{
          // Replicating VfPpkd-LgbsSe Rj2Mlf styles
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxSizing: 'border-box',
          minWidth: '64px',
          border: '1px solid #dadce0',
          outline: 'none',
          fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          height: '36px',
          padding: '0 15px',
          borderRadius: '4px',
          cursor: disabled || loading ? 'default' : 'pointer',
          backgroundColor: '#fff',
          color: '#1a73e8',
          transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&:hover': {
            backgroundColor: !disabled && !loading ? '#f8fbff' : 'transparent',
            borderColor: !disabled && !loading ? '#d2e3fc' : '#dadce0',
          },
          '&:disabled': {
            color: 'rgba(60, 64, 67, 0.38)',
            borderColor: 'rgba(60, 64, 67, 0.12)',
            backgroundColor: '#f1f3f4',
          },
        }}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: 'inherit' }} />
        ) : (
          <>
            <Icon sx={{ mr: 1, fontSize: '20px' }} />
            {label}
          </>
        )}
      </Box>
    );

    return (
      <Tooltip title={tooltip}>
        <span>{buttonContent}</span>
      </Tooltip>
    );
  }
);

ActionButton.displayName = 'ActionButton';
export default ActionButton;