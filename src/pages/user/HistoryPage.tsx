// === FILE: src/pages/user/HistoryPage.tsx ===
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Loader2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuthStore } from '../../store/authStore';

const FILTERS = ['All', 'Strength', 'Cardio', 'Bulking', 'Cutting'];

export const HistoryPage: React.FC = () => {
  const { currentUser } = useAuthStore();
  const bookings = useQuery(api.bookings.getUserBookings, currentUser ? { userId: currentUser.id as any } : "skip");
  const [activeFilter, setActiveFilter] = useState('All');

  if (!bookings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  const filteredBookings = activeFilter === 'All' 
    ? bookings 
    : bookings.filter(b => b.workoutType === activeFilter);

  const acceptedBookings = bookings.filter(b => b.status === 'ACCEPTED');

  const stats = [
    { label: 'Total Sessions', value: acceptedBookings.length },
    { label: 'Total Hours', value: Math.floor(acceptedBookings.reduce((acc, b) => acc + (b.duration || 60), 0) / 60) },
    { label: 'Trainers Met', value: new Set(bookings.map(b => b.trainerId)).size },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title mb-2" style={{ fontSize: '2.5rem' }}>Workout History</h1>
        <p className="text-text-secondary font-inter text-sm">Review your journey and track your progress over time.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={stat.label} animate delay={i * 0.1} className="p-6">
            <p className="card-label mb-2">{stat.label}</p>
            <p className="font-barlow font-extrabold text-6xl text-accent">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <Card className="overflow-hidden border-border bg-bg-surface" hover={false}>
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={activeFilter === f ? 'pill-active' : 'pill-inactive'}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
             <div className="flex items-center gap-2 bg-bg-section px-3 py-2 rounded-lg border border-border/50">
                <Search size={16} className="text-text-light" />
                <input type="text" placeholder="Search sessions..." className="bg-transparent border-none outline-none text-sm font-inter w-32 text-text-primary" />
             </div>
             <button className="p-2 bg-bg-section rounded-lg text-text-secondary hover:text-accent transition-colors border border-border/50">
                <Download size={18} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter">
            <thead className="bg-bg-section/50 text-[10px] uppercase tracking-widest text-text-secondary font-bold">
              <tr>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Trainer</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5">Duration</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-20 text-text-secondary italic">No sessions found for this filter.</td>
                </tr>
              ) : (
                filteredBookings.map((booking, i) => (
                  <motion.tr 
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-bg-section transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-text-primary text-sm">{booking.date}</p>
                      <p className="text-[10px] text-text-light uppercase tracking-tighter">{booking.time}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-tight">
                      {booking.trainerName}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-1 bg-bg-section rounded-md text-text-secondary border border-border/30 uppercase tracking-wider">
                        {booking.workoutType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-secondary">
                      {booking.duration || 60} min
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={booking.status} />
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
