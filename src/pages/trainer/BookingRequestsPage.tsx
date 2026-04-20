// === FILE: src/pages/trainer/BookingRequestsPage.tsx ===
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Calendar, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { useBookingStore } from '../../store/bookingStore';

const TABS = ['Pending', 'Accepted', 'Rejected'];

export const BookingRequestsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useBookingStore();
  const [activeTab, setActiveTab] = useState('Pending');

  const filtered = bookings.filter(b => {
    if (activeTab === 'Pending') return b.status === 'PENDING';
    if (activeTab === 'Accepted') return b.status === 'ACCEPTED';
    if (activeTab === 'Rejected') return b.status === 'REJECTED';
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title mb-2" style={{ fontSize: '2.5rem' }}>Booking Requests</h1>
        <p className="text-text-secondary font-inter text-sm">Manage incoming session requests and schedule.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-8">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-inter font-bold uppercase tracking-wider transition-all relative ${
              activeTab === tab ? 'text-accent' : 'text-text-light hover:text-text-secondary'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="w-16 h-16 bg-bg-section rounded-full flex items-center justify-center mx-auto mb-4 text-text-light">
                <Calendar size={32} />
              </div>
              <p className="text-text-secondary font-inter">No {activeTab.toLowerCase()} requests found.</p>
            </motion.div>
          ) : (
            filtered.map((request) => (
              <motion.div
                key={request.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: request.status === 'ACCEPTED' ? 300 : -300 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Badge status={request.status} />
                    <span className="text-[10px] font-inter font-bold text-text-light uppercase tracking-widest">
                      ID: {request.id}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar initials={request.userId.slice(-2)} size="lg" variant="navy" />
                    <div>
                      <h3 className="font-barlow font-bold text-xl text-text-primary uppercase truncate max-w-[150px]">
                        Client {request.userId}
                      </h3>
                      <p className="text-xs text-accent font-bold uppercase tracking-wide">{request.workoutType}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-center gap-3 text-sm text-text-secondary font-inter">
                      <Calendar size={16} className="text-text-light" />
                      <span>{request.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-secondary font-inter">
                      <Clock size={16} className="text-text-light" />
                      <span>{request.time} ({request.duration} min)</span>
                    </div>
                  </div>

                  {activeTab === 'Pending' && (
                    <div className="flex gap-2">
                      <Button 
                        variant="primary" 
                        className="flex-1 justify-center bg-success hover:bg-green-600"
                        onClick={() => updateBookingStatus(request.id, 'ACCEPTED')}
                      >
                        <Check size={18} /> Accept
                      </Button>
                      <Button 
                        variant="danger" 
                        className="flex-1 justify-center"
                        onClick={() => updateBookingStatus(request.id, 'REJECTED')}
                      >
                        <X size={18} /> Reject
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
