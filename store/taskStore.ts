import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task } from '@/types/tasks';

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  actions: {
    setTasks: (tasks: Task[]) => void;
    setCurrentTask: (taskId: string | null) => void;
  };
}

const useTaskStore = create<TaskState>()(
  immer((set, get) => ({
    tasks: [],
    currentTask: null,
    actions: {
      setTasks: (tasks) => {
        set((state) => {
          state.tasks = tasks;
          // Automatically set the first task as current if it's not already set
          if (!state.currentTask && tasks.length > 0) {
            state.currentTask = tasks[0];
          }
        });
      },
      setCurrentTask: (taskId) => {
        set((state) => {
          if (taskId === null) {
            state.currentTask = null;
            return;
          }
          const task = state.tasks.find((t) => t.id === taskId);
          state.currentTask = task || null;
        });
      },
    },
  }))
);

export default useTaskStore;
