import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define the Task interface to match Google Sheet structure
export interface Task {
  id: string;
  title: string;
  description: string;
  content: any[]; // JSON parsed array
  created_at: string;
}

interface ManagerState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: {
    title: string;
    description: string;
    content: any[];
  }) => Promise<void>;
}

// Replace with your actual Google Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybzYID2K-SQX6q1N6-OuatREdkb1nd5rhnoxiG-Q4dZm3M99-kWD0vdwcYVGCDd8ys/exec';

const useManagerStore = create<ManagerState>()(
  immer((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(APPS_SCRIPT_URL);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch tasks');
        }

        set({ tasks: result.data, isLoading: false });
      } catch (error: any) {
        console.error('Failed to fetch tasks:', error);
        set({ error: error.message, isLoading: false });
      }
    },

    createTask: async (taskData) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'createTask',
            ...taskData,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to create task');
        }

        // Refresh the task list after successful creation
        await get().fetchTasks();
      } catch (error: any) {
        console.error('Failed to create task:', error);
        set({ error: error.message, isLoading: false });
      }
    },
  }))
);

export default useManagerStore;