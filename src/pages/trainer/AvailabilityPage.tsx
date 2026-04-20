// === FILE: src/pages/trainer/AvailabilityPage.tsx ===
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTrainerStore } from '../../store/trainerStore';
import { Toast, useToast } from '../../components/ui/Toast';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00',
               '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];

export const AvailabilityPage: React.FC = () => {
  const { availability, toggleSlot, saveAvailability } = useTrainerStore();
  const { toast, show, hide } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    saveAvailability();
    setSaving(false);
    show('success', 'Availability saved successfully!');
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="page-title mb-2" style={{ fontSize: '2.5rem' }}>Set Availability</h1>
          <p className="text-text-secondary font-inter text-sm">Click time slots to toggle your working hours.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden" hover={false}>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 bg-bg-section border-b border-border">
              <div className="p-4 border-r border-border" />
              {DAYS.map(day => (
                <div key={day} className="p-4 text-center border-r border-border last:border-0">
                  <p className="font-barlow font-bold text-lg text-text-primary uppercase">{day}</p>
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="divide-y divide-border">
              {HOURS.map(hour => (
                <div key={hour} className="grid grid-cols-8 group">
                  <div className="p-3 flex items-center justify-center border-r border-border bg-bg-section/30">
                    <span className="font-inter font-bold text-xs text-text-light">{hour}</span>
                  </div>
                  {DAYS.map(day => {
                    const slot = availability.find(s => s.day === day && s.hour === hour);
                    const isAvailable = slot?.status === 'available';
                    return (
                      <button
                        key={`${day}-${hour}`}
                        onClick={() => toggleSlot(day, hour)}
                        className={`p-3 h-14 border-r border-border last:border-0 transition-all relative overflow-hidden group/slot ${
                          isAvailable ? 'bg-accent-light' : 'hover:bg-bg-section'
                        }`}
                      >
                        {isAvailable && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-full h-full bg-accent/10 absolute inset-0" />
                            <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-lg">
                               <Check size={16} strokeWidth={3} />
                            </div>
                          </motion.div>
                        )}
                        {!isAvailable && (
                          <div className="opacity-0 group-hover/slot:opacity-100 flex items-center justify-center h-full">
                            <span className="text-[10px] font-bold text-accent uppercase">Open Slot</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-60 right-0 bg-white border-t border-border p-4 px-8 flex justify-between items-center z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-accent" />
            <span className="text-xs font-inter font-bold text-text-primary uppercase">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-bg-section border border-border" />
            <span className="text-xs font-inter font-bold text-text-secondary uppercase">Unavailable</span>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleSave} 
          loading={saving}
          className="min-w-[200px] justify-center"
        >
          <Save size={18} /> Save Availability
        </Button>
      </div>

      <Toast 
        visible={toast.visible} 
        type={toast.type} 
        message={toast.message} 
        onClose={hide} 
      />
    </div>
  );
};
