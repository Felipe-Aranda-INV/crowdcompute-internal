'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Alert } from '@mui/material';
import useManagerStore from '@/store/managerStore';
import { format } from 'date-fns';

const TaskList: React.FC = () => {
  const { tasks, isLoading, error } = useManagerStore();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
      sortable: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      sortable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      sortable: false,
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 180,
      sortable: true,
      valueFormatter: (params) => {
        if (!params.value) return '-';
        try {
          return format(new Date(params.value), 'MMM dd, yyyy HH:mm');
        } catch {
          return params.value;
        }
      },
    },
  ];

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default TaskList;