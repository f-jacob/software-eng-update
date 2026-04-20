// === FILE: src/store/habitStore.ts ===
import { create } from 'zustand';

export interface HabitInsight {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface HeatmapDay {
  date: string;
  count: number;
}

interface HabitState {
  streak: number;
  longestStreak: number;
  peakHour: string;
  peakDays: string[];
  insights: HabitInsight[];
  heatmap: HeatmapDay[];
  notificationsEnabled: boolean;
  autoBookEnabled: boolean;
  toggleNotifications: () => void;
  toggleAutoBook: () => void;
}

const generateHeatmap = (): HeatmapDay[] => {
  const days: HeatmapDay[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const rand = Math.random();
    days.push({ date: dateStr, count: rand < 0.55 ? 0 : Math.floor(rand * 4) });
  }
  return days;
};

export const useHabitStore = create<HabitState>((set) => ({
  streak: 7,
  longestStreak: 21,
  peakHour: '17:00',
  peakDays: ['Tuesday', 'Thursday', 'Saturday'],
  insights: [
    { id: '1', label: 'Best Day',       value: 'Tuesday',  icon: '🏆' },
    { id: '2', label: 'Favorite Type',  value: 'Strength', icon: '💪' },
    { id: '3', label: 'Avg Duration',   value: '52 min',   icon: '⏱️' },
  ],
  heatmap: generateHeatmap(),
  notificationsEnabled: true,
  autoBookEnabled: false,
  toggleNotifications: () => set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
  toggleAutoBook:      () => set((s) => ({ autoBookEnabled: !s.autoBookEnabled })),
}));
