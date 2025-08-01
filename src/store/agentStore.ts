import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task } from '@/types/tasks';

// Replace with your actual Google Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybzYID2K-SQX6q1N6-OuatREdkb1nd5rhnoxiG-Q4dZm3M99-kWD0vdwcYVGCDd8ys/exec';

interface AgentState {
  currentTask: Task | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  fetchNextTask: () => Promise<void>;
  submitTask: (submissionData: {
    taskId: string;
    agentId: string;
    answer: Record<string, any>;
  }) => Promise<void>;
}

const useAgentStore = create<AgentState>()(
  immer((set, get) => ({
    currentTask: null,
    isLoading: false,
    isSubmitting: false,
    error: null,

    fetchNextTask: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(APPS_SCRIPT_URL);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch next task');
        }

        // Get the first available task for now
        const tasks = result.data;
        const nextTask = tasks.length > 0 ? tasks[0] : null;
        
        set({ currentTask: nextTask, isLoading: false });
      } catch (error: any) {
        console.error('Failed to fetch next task:', error);
        set({ error: error.message, isLoading: false, currentTask: null });
      }
    },

    submitTask: async (submissionData) => {
      set({ isSubmitting: true, error: null });
      try {
        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'submitTask',
            payload: submissionData,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to submit task');
        }

        // Fetch the next task after successful submission
        await get().fetchNextTask();
        set({ isSubmitting: false });
      } catch (error: any) {
        console.error('Failed to submit task:', error);
        set({ error: error.message, isSubmitting: false });
      }
    },
  }))
);

export default useAgentStore;