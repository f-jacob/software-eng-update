// === FILE: src/data/mockData.ts ===
import type { Booking } from '../store/bookingStore';
import type { Trainer, Client } from '../store/trainerStore';

// ─── TRAINERS ────────────────────────────────────────────────────
export const mockTrainers: Trainer[] = [
  { id: 't1',  name: 'Marcus Reid',    specialty: 'Strength', rating: 4.9, sessions: 342, rate: 100, initials: 'MR', bio: 'NSCA-certified strength coach with 8 years competitive powerlifting experience.' },
  { id: 't2',  name: 'Sofia Reyes',    specialty: 'Cardio',   rating: 4.8, sessions: 289, rate: 90,  initials: 'SR', bio: 'Marathon runner turned coach. Specializes in endurance and VO2 max improvement.' },
  { id: 't3',  name: 'Jake Torres',    specialty: 'Cutting',  rating: 4.8, sessions: 275, rate: 95,  initials: 'JT', bio: 'Body recomposition specialist. Helped 200+ clients achieve contest-ready physiques.' },
  { id: 't4',  name: 'Priya Sharma',   specialty: 'Bulking',  rating: 4.7, sessions: 198, rate: 85,  initials: 'PS', bio: 'Sports nutritionist & NASM trainer. Expert in hypertrophy programming.' },
  { id: 't5',  name: 'Chris Okafor',   specialty: 'Cardio',   rating: 4.7, sessions: 187, rate: 80,  initials: 'CO', bio: 'Former sprinter and HIIT specialist. Transforms fitness levels in 8 weeks.' },
  { id: 't6',  name: 'Lena Fischer',   specialty: 'Strength', rating: 4.6, sessions: 165, rate: 88,  initials: 'LF', bio: 'Olympic weightlifting coach. Specializes in clean, snatch, and jerk techniques.' },
  { id: 't7',  name: 'Dae-Jung Kim',   specialty: 'Bulking',  rating: 4.6, sessions: 154, rate: 82,  initials: 'DK', bio: 'Competitive bodybuilder with 6 national titles. Mass-gain protocol expert.' },
  { id: 't8',  name: 'Aisha Mensah',   specialty: 'Cutting',  rating: 4.5, sessions: 143, rate: 78,  initials: 'AM', bio: 'Precision fat-loss coaching with evidence-based nutrition protocols.' },
  { id: 't9',  name: 'Ryan Kowalski',  specialty: 'Strength', rating: 4.5, sessions: 132, rate: 75,  initials: 'RK', bio: 'Functional strength and mobility coach. Focus on injury prevention.' },
  { id: 't10', name: 'Mei Lin Zhou',   specialty: 'Cardio',   rating: 4.4, sessions: 121, rate: 72,  initials: 'ML', bio: 'Certified Pilates & HIIT instructor. Mind-body performance specialist.' },
  { id: 't11', name: 'Diego Morales',  specialty: 'Bulking',  rating: 4.4, sessions: 110, rate: 70,  initials: 'DM', bio: 'Certified personal trainer with background in sports biomechanics.' },
  { id: 't12', name: 'Yuki Tanaka',    specialty: 'Cutting',  rating: 4.3, sessions: 98,  rate: 68,  initials: 'YT', bio: 'Metabolic conditioning expert. Lean physique transformation specialist.' },
];

// ─── CLIENTS ─────────────────────────────────────────────────────
export const mockClients: Client[] = [
  { id: 'c1', name: 'Andi Pratama',   sessions: 24, lastVisit: '2026-04-18', consistency: 87, initials: 'AP', workoutType: 'Strength' },
  { id: 'c2', name: 'Jordan Lee',     sessions: 18, lastVisit: '2026-04-19', consistency: 74, initials: 'JL', workoutType: 'Cardio'   },
  { id: 'c3', name: 'Sofia Martinez', sessions: 31, lastVisit: '2026-04-17', consistency: 92, initials: 'SM', workoutType: 'Cutting'  },
  { id: 'c4', name: 'Tyler Ramos',    sessions: 12, lastVisit: '2026-04-15', consistency: 61, initials: 'TR', workoutType: 'Bulking'  },
  { id: 'c5', name: 'Emma Watson',    sessions: 27, lastVisit: '2026-04-20', consistency: 83, initials: 'EW', workoutType: 'Strength' },
  { id: 'c6', name: 'Carlos Diaz',    sessions: 9,  lastVisit: '2026-04-12', consistency: 45, initials: 'CD', workoutType: 'Cardio'   },
  { id: 'c7', name: 'Nadia Osei',     sessions: 22, lastVisit: '2026-04-18', consistency: 79, initials: 'NO', workoutType: 'Cutting'  },
  { id: 'c8', name: 'Liam Chen',      sessions: 16, lastVisit: '2026-04-16', consistency: 68, initials: 'LC', workoutType: 'Bulking'  },
];

// ─── HELPER: generate past date ──────────────────────────────────
const pastDate = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

const TIMES = ['07:00','08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00','19:00'];
const TYPES = ['Strength', 'Cardio', 'Bulking', 'Cutting'];
const STATUSES: Array<'ACCEPTED' | 'PENDING' | 'REJECTED'> = ['ACCEPTED', 'ACCEPTED', 'ACCEPTED', 'PENDING', 'REJECTED'];

// ─── BOOKINGS (30 records) ────────────────────────────────────────
export const mockBookings: Booking[] = Array.from({ length: 30 }, (_, i) => {
  const trainer = mockTrainers[i % mockTrainers.length];
  return {
    id:          `b${i + 1}`,
    userId:      `u${(i % 8) + 1}`,
    trainerId:   trainer.id,
    trainerName: trainer.name,
    workoutType: TYPES[i % TYPES.length],
    date:        pastDate(Math.floor(Math.random() * 60)),
    time:        TIMES[i % TIMES.length],
    duration:    [45, 50, 55, 60][i % 4],
    status:      STATUSES[i % STATUSES.length],
    createdAt:   pastDate(Math.floor(Math.random() * 60) + 1),
  };
});

// ─── WEEKLY CHART DATA ────────────────────────────────────────────
export const weeklyBarData = [
  { day: 'Mon', sessions: 3 },
  { day: 'Tue', sessions: 5 },
  { day: 'Wed', sessions: 2 },
  { day: 'Thu', sessions: 6 },
  { day: 'Fri', sessions: 4 },
  { day: 'Sat', sessions: 7 },
  { day: 'Sun', sessions: 1 },
];

// ─── ANALYTICS PER-DAY DATA ──────────────────────────────────────
export const analyticsSessionData = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sessions: Math.floor(Math.random() * 40) + 10,
  };
});

// ─── WORKOUT TYPE BREAKDOWN ───────────────────────────────────────
export const workoutTypeData = [
  { name: 'Strength', value: 35, color: '#FF4D00' },
  { name: 'Cardio',   value: 28, color: '#FFB800' },
  { name: 'Cutting',  value: 22, color: '#FF7A3D' },
  { name: 'Bulking',  value: 15, color: '#FFC266' },
];

// ─── INACTIVE USERS ───────────────────────────────────────────────
export const inactiveUsers = [
  { id: 'u10', name: 'Blake Stone',   lastActive: '2026-03-01', sessions: 4 },
  { id: 'u11', name: 'Hana Kobayashi',lastActive: '2026-02-21', sessions: 2 },
  { id: 'u12', name: 'Ravi Patel',    lastActive: '2026-02-14', sessions: 6 },
  { id: 'u13', name: 'Chloe Dubois',  lastActive: '2026-01-30', sessions: 1 },
  { id: 'u14', name: 'Marco Vitale',  lastActive: '2026-03-10', sessions: 3 },
];

// ─── UPCOMING SESSION ─────────────────────────────────────────────
export const upcomingSession = {
  trainerId:   't1',
  trainerName: 'Marcus Reid',
  specialty:   'Strength',
  date:        '2026-04-22',
  time:        '17:00',
  duration:    55,
};
