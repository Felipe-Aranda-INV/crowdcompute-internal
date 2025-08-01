import { create } from 'zustand';
import { getTasks } from '@/lib/google-sheets';

// This is a mock task type. In a real application, this would be defined in a shared types file.
type Task = {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    text: string;
    type: 'multiple-choice' | 'free-text';
    options?: string[];
  }[];
};

type TaskStore = {
  tasks: Task[];
  fetchTasks: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const tasks = await getTasks();
    // @ts-ignore
    set({ tasks });
  },
}));