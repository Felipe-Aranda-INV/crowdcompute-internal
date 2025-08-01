'use client';

import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import {
  QueryBuilder,
  Description,
  SkipNext,
  LocalParking,
  DoneAll,
  ViewList,
  MoreVert,
} from '@mui/icons-material';
import ActionButton from '../common/ActionButton';
import useAgentStore from '@/store/agentStore';
import { useEffect } from 'react';

const MainToolbar = () => {
  const {
    timeLeft,
    tasksAvailable,
    currentTask,
    parkedCount,
    sessionStats,
    actions,
  } = useAgentStore();

  useEffect(() => {
    actions.startTimer();
    return () => actions.stopTimer();
  }, [actions]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    // Simulating .xQe57d
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#f5f5f5',
        height: '64px',
      }}
    >
      {/* Simulating .jXX4Rd */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Timer Button */}
        <ActionButton
          label={formatTime(timeLeft)}
          tooltip="Time left for current question"
          icon={QueryBuilder}
          onClick={() => console.log('View Question')}
        />
        <Typography variant="body2" sx={{ color: '#5f6368', ml: 1 }}>
          {tasksAvailable} tasks available
        </Typography>
      </Box>

      {/* Simulating .uV2DPb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ActionButton
          label="Instructions"
          tooltip="View Instructions"
          icon={Description}
          onClick={() => console.log('View Instructions')}
        />
        <Tooltip title="More actions">
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Tooltip>
        <ActionButton
          label="Skip"
          tooltip="Skip to the next task"
          icon={SkipNext}
          onClick={() => console.log('Skip Task')}
        />
        <ActionButton
          label="Park"
          tooltip="Park this task and come back to it later"
          icon={LocalParking}
          onClick={actions.parkTask}
          disabled={!currentTask?.isParkingAllowed}
        />
        <ActionButton
          label="Complete Session"
          tooltip="Finish and submit your session"
          icon={DoneAll}
          onClick={actions.completeSession}
          disabled={!sessionStats.canComplete}
        />
        <ActionButton
          label={`Parking Lot (${parkedCount})`}
          tooltip="View parked tasks"
          icon={ViewList}
          onClick={() => console.log('View Parking Lot')}
        />
      </Box>
    </Box>
  );
};

export default MainToolbar;
