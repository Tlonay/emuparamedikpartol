import { create } from 'zustand';

interface SettingsState {
  fontSize: number;
  chatNotifications: boolean;
  darkMode: boolean;
  setFontSize: (size: number) => void;
  setChatNotifications: (enabled: boolean) => void;
  setDarkMode: (enabled: boolean) => void;
}

export const useSettings = create<SettingsState>((set) => ({
  fontSize: 16,
  chatNotifications: true,
  darkMode: false,
  setFontSize: (size) => set({ fontSize: size }),
  setChatNotifications: (enabled) => set({ chatNotifications: enabled }),
  setDarkMode: (enabled) => set({ darkMode: enabled }),
}));