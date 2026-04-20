// === FILE: src/store/bookingStore.ts ===
import { create } from 'zustand';
import { mockBookings } from '../data/mockData';

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Booking {
  id: string;
  userId: string;
  trainerId: string;
  trainerName: string;
  workoutType: string;
  date: string;
  time: string;
  duration: number;
  status: BookingStatus;
  createdAt: string;
}

export interface WizardState {
  step: number;
  selectedTrainerId: string | null;
  workoutType: string;
  selectedDate: string;
  selectedTime: string;
}

interface BookingState {
  bookings: Booking[];
  pendingRequests: Booking[];
  wizard: WizardState;
  setWizardStep: (step: number) => void;
  setWizardField: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void;
  resetWizard: () => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  rescheduleBooking: (id: string, date: string, time: string) => void;
}

const initialWizard: WizardState = {
  step: 1,
  selectedTrainerId: null,
  workoutType: '',
  selectedDate: '',
  selectedTime: '',
};

export const useBookingStore = create<BookingState>((set) => ({
  bookings: mockBookings,
  pendingRequests: mockBookings.filter((b) => b.status === 'PENDING'),
  wizard: initialWizard,
  setWizardStep: (step) => set((s) => ({ wizard: { ...s.wizard, step } })),
  setWizardField: (key, value) => set((s) => ({ wizard: { ...s.wizard, [key]: value } })),
  resetWizard: () => set({ wizard: initialWizard }),
  addBooking: (booking) =>
    set((s) => ({
      bookings: [booking, ...s.bookings],
      pendingRequests:
        booking.status === 'PENDING'
          ? [booking, ...s.pendingRequests]
          : s.pendingRequests,
    })),
  updateBookingStatus: (id, status) =>
    set((s) => ({
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
      pendingRequests: s.pendingRequests.filter((b) => b.id !== id),
    })),
  rescheduleBooking: (id, date, time) =>
    set((s) => ({
      bookings: s.bookings.map((b) =>
        b.id === id ? { ...b, date, time, status: 'PENDING' } : b
      ),
      pendingRequests: s.pendingRequests.map((b) =>
        b.id === id ? { ...b, date, time } : b
      ),
    })),
}));
