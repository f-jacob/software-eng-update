// === FILE: src/store/trainerStore.ts ===
import { create } from 'zustand';
import { mockTrainers, mockClients } from '../data/mockData';

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  sessions: number;
  rate: number;
  bio: string;
  initials: string;
}

export interface Client {
  id: string;
  name: string;
  sessions: number;
  lastVisit: string;
  consistency: number;
  initials: string;
  workoutType: string;
}

export type SlotStatus = 'available' | 'unavailable';

export interface AvailabilitySlot {
  day: string;
  hour: string;
  status: SlotStatus;
}

interface TrainerState {
  trainers: Trainer[];
  clients: Client[];
  availability: AvailabilitySlot[];
  selectedClientId: string | null;
  filterSpecialty: string;
  setFilterSpecialty: (s: string) => void;
  setSelectedClient: (id: string | null) => void;
  toggleSlot: (day: string, hour: string) => void;
  saveAvailability: () => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00',
               '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];

const generateAvailability = (): AvailabilitySlot[] => {
  const slots: AvailabilitySlot[] = [];
  DAYS.forEach((day) => {
    HOURS.forEach((hour) => {
      const h = parseInt(hour);
      const available = h >= 7 && h <= 20 && Math.random() > 0.35;
      slots.push({ day, hour, status: available ? 'available' : 'unavailable' });
    });
  });
  return slots;
};

export const useTrainerStore = create<TrainerState>((set) => ({
  trainers: mockTrainers,
  clients: mockClients,
  availability: generateAvailability(),
  selectedClientId: null,
  filterSpecialty: 'All',
  setFilterSpecialty: (s) => set({ filterSpecialty: s }),
  setSelectedClient: (id) => set({ selectedClientId: id }),
  toggleSlot: (day, hour) =>
    set((s) => ({
      availability: s.availability.map((slot) =>
        slot.day === day && slot.hour === hour
          ? { ...slot, status: slot.status === 'available' ? 'unavailable' : 'available' }
          : slot
      ),
    })),
  saveAvailability: () => {},
}));
