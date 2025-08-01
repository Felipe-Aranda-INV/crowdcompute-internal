import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Simulating the structure of a task
interface Task {
  id: string;
  title: string;
  isParkingAllowed: boolean;
}

// Simulating the structure of session statistics
interface SessionStats {
  completed: number;
  inProgress: number;
  canComplete: boolean;
}

interface AgentState {
  timeLeft: number; // in seconds
  tasksAvailable: number;
  currentTask: Task | null;
  parkedCount: number;
  sessionStats: SessionStats;
  isLoading: boolean;
  error: string | null;
  actions: {
    startTimer: () => void;
    stopTimer: () => void;
    parkTask: () => void;
    completeSession: () => void;
    setCurrentTask: (task: Task | null) => void;
    fetchNextTask: (agentId: string) => Promise<void>;
    submitTask: (submissionData: {
      taskId: string;
      agentId: string;
      answer: Record<string, any>;
    }) => Promise<void>;
  };
}

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbybzYID2K-SQX6q1N6-OuatREdkb1nd5rhnoxiG-Q4dZm3M99-kWD0vdwcYVGCDd8ys/exec';

const useAgentStore = create<AgentState>()(
  immer((set, get) => {
    let timer: NodeJS.Timeout | null = null;

    return {
      timeLeft: 300, // 5 minutes
      tasksAvailable: 10,
      currentTask: {
        id: 'task-123',
        title: 'Sample Task',
        isParkingAllowed: true,
      },
      parkedCount: 0,
      sessionStats: {
        completed: 5,
        inProgress: 1,
        canComplete: false,
      },
      isLoading: false,
      error: null,
      actions: {
        startTimer: () => {
          if (timer) clearInterval(timer);
          timer = setInterval(() => {
            set((state) => {
              if (state.timeLeft > 0) {
                state.timeLeft -= 1;
              } else {
                if (timer) clearInterval(timer);
              }
            });
          }, 1000);
        },
        stopTimer: () => {
          if (timer) clearInterval(timer);
        },
        parkTask: () => {
          set((state) => {
            if (state.currentTask && state.currentTask.isParkingAllowed) {
              state.parkedCount += 1;
              state.currentTask = null; // Task is parked
            }
          });
        },
        completeSession: () => {
          set((state) => {
            if (state.sessionStats.canComplete) {
              // Logic to complete session
              console.log('Session completed');
            }
          });
        },
        setCurrentTask: (task) => {
          set((state) => {
            state.currentTask = task;
          });
        },
        fetchNextTask: async (agentId: string) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });
          try {
            const response = await fetch(APPS_SCRIPT_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'getNextTask', payload: { agentId } }),
              mode: 'cors',
            });
            const result = await response.json();

            if (!result.success) throw new Error(result.error);

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
        submitTask: async (submissionData) => {
          set((state) => {
            state.isLoading = true;
          });
          try {
            const response = await fetch(APPS_SCRIPT_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'submitTask', payload: submissionData }),
              mode: 'cors',
            });
            const result = await response.json();

            if (!result.success) throw new Error(result.error);

            // Submission successful, fetch the next task
            await get().actions.fetchNextTask(submissionData.agentId);
          } catch (error: any) {
            console.error('Failed to submit task:', error);
            set((state) => {
              state.error = `Failed to submit: ${error.message}`;
              state.isLoading = false;
            });
          }
        },
      },
    };
  })
);

export default useAgentStore;