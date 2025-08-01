import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task } from '@/types/tasks';

// ### IMPORTANT ###
// This URL must be replaced with your actual Google Apps Script web app URL.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

interface AgentState {
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
  actions: {
    fetchNextTask: () => Promise<void>;
    submitTask: (submissionData: {
      taskId: string;
      answer: Record<string, any>;
    }) => Promise<void>;
  };
}

const useAgentStore = create<AgentState>()(
  immer((set, get) => ({
    currentTask: null,
    isLoading: false,
    error: null,
    actions: {
      fetchNextTask: async () => {
        set({ isLoading: true, error: null });
        try {
          // Construct the URL for the GET request
          const url = new URL(APPS_SCRIPT_URL);
          url.searchParams.append('action', 'getNextTask');

          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
          });

          // The response from a GET request to Google Apps Script is text.
          const result = JSON.parse(await response.text());

          if (!result.success) {
            throw new Error(result.error || 'Failed to fetch next task.');
          }

          set({ currentTask: result.data, isLoading: false });
        } catch (error: any) {
          console.error('Failed to fetch next task:', error);
          set({ error: error.message, isLoading: false, currentTask: null });
        }
      },
      submitTask: async (submissionData) => {
        set({ isLoading: true });
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
            mode: 'cors',
          });

          const result = await response.json();

          if (!result.success) {
            throw new Error(result.error || 'Failed to submit task.');
          }

          // Submission successful, fetch the next task
          await get().actions.fetchNextTask();
        } catch (error: any) {
          console.error('Failed to submit task:', error);
          set({ error: `Failed to submit: ${error.message}`, isLoading: false });
        }
      },
    },
  }))
);

export default useAgentStore;