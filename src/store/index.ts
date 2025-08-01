import { create } from 'zustand';

interface AppState {
  // Add your state properties here
}

export const useAppStore = create<AppState>((set) => ({
  // Add your initial state and actions here
}));
