import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Task {
  id: string;
  title: string;
  description: string;
  content: {
    url?: string;
    questions?: Array<{
      id: string;
      text: string;
      type: 'multiple-choice' | 'free-text' | 'rating';
      options?: string[];
    }>;
    [key: string]: any;
  };
  metadata?: {
    workerPool?: string;
    questionType?: string;
    difficulty?: string;
    estimatedTime?: number;
  };
  created_at: string;
}

interface TaskState {
  // State
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
  
  // Task management
  fetchNextTask: () => Promise<void>;
  submitTask: (taskId: string, submission: any) => Promise<void>;
  skipTask: () => Promise<void>;
  parkTask: () => Promise<void>;
  
  // Session management
  sessionStats: {
    tasksCompleted: number;
    tasksParked: number;
    sessionStartTime: Date;
  };
  updateSessionStats: (stats: Partial<TaskState['sessionStats']>) => void;
}

const useTaskStore = create<TaskState>()(
  immer((set, get) => ({
    // Initial state
    tasks: [],
    currentTask: null,
    isLoading: false,
    error: null,
    sessionStats: {
      tasksCompleted: 0,
      tasksParked: 0,
      sessionStartTime: new Date(),
    },

    // Fetch next available task
    fetchNextTask: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await fetch('/api/tasks/next');
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch next task');
        }

        set((state) => {
          state.currentTask = result.data;
          state.isLoading = false;
        });
      } catch (error: any) {
        console.error('Failed to fetch next task:', error);
        set((state) => {
          state.error = error.message;
          state.isLoading = false;
          state.currentTask = null;
        });
      }
    },

    // Submit current task
    submitTask: async (taskId: string, submission: any) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await fetch('/api/tasks/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskId,
            submission,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to submit task');
        }

        // Update session stats
        set((state) => {
          state.sessionStats.tasksCompleted += 1;
        });

        // Fetch next task
        await get().fetchNextTask();
      } catch (error: any) {
        console.error('Failed to submit task:', error);
        set((state) => {
          state.error = error.message;
          state.isLoading = false;
        });
      }
    },

    // Skip current task
    skipTask: async () => {
      // Simply fetch the next task without submitting
      await get().fetchNextTask();
    },

    // Park current task
    parkTask: async () => {
      const currentTask = get().currentTask;
      if (!currentTask) return;

      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await fetch('/api/tasks/park', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskId: currentTask.id,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to park task');
        }

        // Update session stats
        set((state) => {
          state.sessionStats.tasksParked += 1;
        });

        // Fetch next task
        await get().fetchNextTask();
      } catch (error: any) {
        console.error('Failed to park task:', error);
        set((state) => {
          state.error = error.message;
          state.isLoading = false;
        });
      }
    },

    // Update session statistics
    updateSessionStats: (stats) => {
      set((state) => {
        state.sessionStats = { ...state.sessionStats, ...stats };
      });
    },
  }))
);

export default useTaskStore;