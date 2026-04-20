// === FILE: src/store/adminStore.ts ===
import { create } from 'zustand';

export interface KPI {
  label: string;
  value: string;
  trend: number;
  unit?: string;
}

export interface ChartPoint {
  date: string;
  bookings: number;
  revenue: number;
}

export interface LeaderboardEntry {
  rank: number;
  trainerId: string;
  name: string;
  sessions: number;
  revenue: number;
  rating: number;
  initials: string;
}

export interface ActivityItem {
  id: string;
  type: 'booking' | 'register' | 'cancel' | 'payment';
  message: string;
  time: string;
}

interface AdminState {
  kpis: KPI[];
  chartData: ChartPoint[];
  leaderboard: LeaderboardEntry[];
  activityFeed: ActivityItem[];
  dateRange: '7d' | '30d' | '90d';
  setDateRange: (r: '7d' | '30d' | '90d') => void;
}

const generateChartData = (): ChartPoint[] => {
  const data: ChartPoint[] = [];
  const now = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      bookings: Math.floor(Math.random() * 30) + 10,
      revenue: Math.floor(Math.random() * 5000) + 2000,
    });
  }
  return data;
};

export const useAdminStore = create<AdminState>((set) => ({
  kpis: [
    { label: 'Total Users',      value: '2,847', trend: 12.4 },
    { label: 'Active Trainers',  value: '184',   trend: 5.2 },
    { label: 'Bookings Today',   value: '63',    trend: 8.1 },
    { label: 'Monthly Revenue',  value: '$48,290', trend: 18.7, unit: '$' },
  ],
  chartData: generateChartData(),
  leaderboard: [
    { rank: 1, trainerId: 't1', name: 'Marcus Reid',    sessions: 142, revenue: 14200, rating: 4.9, initials: 'MR' },
    { rank: 2, trainerId: 't2', name: 'Sofia Reyes',    sessions: 128, revenue: 12800, rating: 4.8, initials: 'SR' },
    { rank: 3, trainerId: 't3', name: 'Jake Torres',    sessions: 115, revenue: 11500, rating: 4.8, initials: 'JT' },
    { rank: 4, trainerId: 't4', name: 'Priya Sharma',   sessions: 98,  revenue: 9800,  rating: 4.7, initials: 'PS' },
    { rank: 5, trainerId: 't5', name: 'Chris Okafor',   sessions: 87,  revenue: 8700,  rating: 4.7, initials: 'CO' },
  ],
  activityFeed: [
    { id: 'a1', type: 'booking',  message: 'Andi booked Marcus Reid for Strength',      time: '2 min ago' },
    { id: 'a2', type: 'register', message: 'New user: Jordan Lee signed up',             time: '8 min ago' },
    { id: 'a3', type: 'cancel',   message: 'Booking #B-4421 cancelled by user',          time: '15 min ago' },
    { id: 'a4', type: 'payment',  message: 'Payment of $120 received from Sofia M.',     time: '22 min ago' },
    { id: 'a5', type: 'booking',  message: 'Carlos booked Priya Sharma for Cardio',      time: '31 min ago' },
    { id: 'a6', type: 'register', message: 'New trainer: Dae-Jung Kim approved',         time: '45 min ago' },
    { id: 'a7', type: 'payment',  message: 'Payment of $95 received from Tyler R.',      time: '1 hr ago' },
    { id: 'a8', type: 'cancel',   message: 'Booking #B-4418 rescheduled to next week',   time: '1.5 hr ago' },
  ],
  dateRange: '30d',
  setDateRange: (r) => set({ dateRange: r }),
}));
