import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;          // for mobile drawer
  isCollapsed: boolean;     // for desktop width collapse
  toggleOpen: () => void;
  toggleCollapsed: () => void;
  close: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  close: () => set({ isOpen: false }),
}));