// === FILE: src/pages/trainer/TrainerDashboard.tsx ===
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Clock, Users, DollarSign, Star, ChevronRight } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useBookingStore } from '../../store/bookingStore';

export const TrainerDashboard: React.FC = () => {
  const { pendingRequests, updateBookingStatus } = useBookingStore();

  const handleStatusUpdate = (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    updateBookingStatus(id, status);
  };

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Clients Today" value="8" numeric={8} icon={<Users />} />
        <StatCard label="Pending Requests" value={pendingRequests.length} numeric={pendingRequests.length} icon={<Clock />} />
        <StatCard label="Weekly Revenue" value="$2,450" numeric={2450} icon={<DollarSign />} trend={12} />
        <StatCard label="Avg Rating" value="4.9" numeric={4.9} icon={<Star />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Timeline */}
        <Card className="lg:col-span-2 p-6" hover={false}>
          <div className="section-divider mb-6">
            <h2 className="section-title text-xl">Today's Schedule</h2>
          </div>
          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
            {[
              { time: '08:00', client: 'Sofia Martinez', type: 'Cutting', status: 'Completed' },
              { time: '10:00', client: 'Andi Pratama', type: 'Strength', status: 'Current' },
              { time: '14:00', client: 'Jordan Lee', type: 'Cardio', status: 'Upcoming' },
              { time: '17:00', client: 'Tyler Ramos', type: 'Bulking', status: 'Upcoming' },
            ].map((session, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[25px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${session.status === 'Current' ? 'bg-accent' : 'bg-border'}`} />
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-xs font-inter font-bold text-accent uppercase tracking-wider">{session.time}</p>
                      <h3 className="font-barlow font-bold text-lg text-text-primary uppercase">{session.client}</h3>
                      <p className="text-sm text-text-secondary">{session.type}</p>
                   </div>
                   {session.status === 'Current' && (
                     <Badge status="ACCEPTED" className="animate-pulse" />
                   )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Requests */}
        <Card className="p-6 overflow-hidden flex flex-col" hover={false}>
          <div className="section-divider mb-6">
            <h2 className="section-title text-xl">Pending ({pendingRequests.length})</h2>
          </div>
          <div className="space-y-4 flex-1">
            <AnimatePresence>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-12 text-text-light font-inter text-sm">
                  No pending requests.
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="p-4 bg-bg-section rounded-xl border border-border group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar initials={request.trainerName.slice(0, 1) + request.userId.slice(-1)} size="sm" variant="navy" />
                      <div className="flex-1 overflow-hidden">
                        <p className="font-inter font-bold text-sm text-text-primary truncate">Client ID: {request.userId}</p>
                        <p className="text-xs text-text-secondary">{request.workoutType} · {request.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(request.id, 'ACCEPTED')}
                        className="flex-1 bg-success text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-1"
                      >
                        <Check size={14} /> Accept
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(request.id, 'REJECTED')}
                        className="flex-1 bg-danger text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-1"
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          <button className="text-accent text-sm font-bold uppercase tracking-wider mt-6 hover:underline flex items-center gap-1">
            View All Requests <ChevronRight size={16} />
          </button>
        </Card>
      </div>
    </div>
  );
};
