// === FILE: src/pages/user/BookingPage.tsx ===
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { TrainerCard } from '../../components/booking/TrainerCard';
import { TimeSlotGrid } from '../../components/booking/TimeSlotGrid';
import { WeekCalendar } from '../../components/booking/WeekCalendar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useBookingStore } from '../../store/bookingStore';
import { useTrainerStore } from '../../store/trainerStore';
import type { Trainer } from '../../store/trainerStore';
import { useAuthStore } from '../../store/authStore';

const STEPS = ['Choose Trainer', 'Set Details', 'Confirm'];
const TYPES = ['Strength','Cardio','Bulking','Cutting'];
const FILTERS = ['All','Cardio','Strength','Bulking','Cutting'];

export const BookingPage: React.FC = () => {
  const { trainers } = useTrainerStore();
  const { wizard, setWizardField, setWizardStep, addBooking, resetWizard } = useBookingStore();
  const { currentUser } = useAuthStore();
  const [filter, setFilter] = useState('All');
  const [confirmed, setConfirmed] = useState(false);

  const filtered = filter === 'All' ? trainers : trainers.filter(t => t.specialty === filter);
  const selectedTrainer = trainers.find(t => t.id === wizard.selectedTrainerId);

  const handleConfirm = () => {
    if (!selectedTrainer) return;
    addBooking({
      id: `b-${Date.now()}`,
      userId: currentUser?.id ?? 'u1',
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      workoutType: wizard.workoutType || selectedTrainer.specialty,
      date: wizard.selectedDate,
      time: wizard.selectedTime,
      duration: 55,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setConfirmed(true);
  };

  const handleReset = () => { resetWizard(); setConfirmed(false); };

  if (confirmed) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} className="text-center max-w-md">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white"/>
          </div>
          <h2 className="font-barlow font-extrabold text-3xl text-text-primary uppercase mb-2">Booking Submitted!</h2>
          <p className="text-text-secondary font-inter mb-4">Your session with <strong>{selectedTrainer?.name}</strong> on <strong>{wizard.selectedDate}</strong> at <strong>{wizard.selectedTime}</strong> is pending confirmation.</p>
          <Badge status="PENDING" className="mb-6"/>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={handleReset}>Book Another</Button>
            <Button variant="ghost"   onClick={() => window.location.href='/user/schedule'}>View Schedule</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title mb-2" style={{fontSize:'2.5rem'}}>Book a Session</h1>
        <p className="text-text-secondary font-inter text-sm">Follow the steps to book your trainer.</p>
      </div>

      <StepIndicator steps={STEPS} current={wizard.step} />

      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {wizard.step === 1 && (
          <motion.div key="step1" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}>
            <div className="flex flex-wrap gap-2 mb-6">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={filter===f ? 'pill-active' : 'pill-inactive'}>{f}</button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(t => (
                <TrainerCard key={t.id} trainer={t}
                  selected={wizard.selectedTrainerId === t.id}
                  onSelect={(tr: Trainer) => setWizardField('selectedTrainerId', tr.id)} />
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button disabled={!wizard.selectedTrainerId} onClick={() => setWizardStep(2)}>
                Continue →
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {wizard.step === 2 && selectedTrainer && (
          <motion.div key="step2" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}
            className="grid lg:grid-cols-3 gap-6">
            {/* Selected trainer summary */}
            <Card accent className="lg:col-span-1 h-fit">
              <p className="card-label mb-3">Selected Trainer</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white font-barlow font-bold text-lg">
                  {selectedTrainer.initials}
                </div>
                <div>
                  <p className="font-barlow font-bold text-lg text-text-primary">{selectedTrainer.name}</p>
                  <p className="text-xs text-accent font-semibold">{selectedTrainer.specialty}</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-4">{selectedTrainer.bio}</p>
              <p className="font-barlow font-extrabold text-2xl text-accent">${selectedTrainer.rate}<span className="text-sm font-inter font-normal text-text-light">/hr</span></p>
            </Card>

            {/* Date + time */}
            <div className="lg:col-span-2 space-y-6">
              <Card hover={false}>
                <p className="card-label mb-3">Workout Type</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {TYPES.map(t => (
                    <button key={t} onClick={() => setWizardField('workoutType', t)}
                      className={wizard.workoutType===t ? 'pill-active' : 'pill-inactive'}>{t}</button>
                  ))}
                </div>
                <p className="card-label mb-3">Select Date</p>
                <WeekCalendar selectedDate={wizard.selectedDate} onSelect={d => setWizardField('selectedDate', d)} />
              </Card>
              {wizard.selectedDate && (
                <Card hover={false}>
                  <p className="card-label mb-4">Select Time</p>
                  <TimeSlotGrid selectedTime={wizard.selectedTime} onSelect={t => setWizardField('selectedTime', t)} />
                </Card>
              )}
            </div>

            <div className="lg:col-span-3 flex justify-between">
              <Button variant="ghost" onClick={() => setWizardStep(1)}>← Back</Button>
              <Button disabled={!wizard.selectedDate || !wizard.selectedTime} onClick={() => setWizardStep(3)}>
                Review Booking →
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {wizard.step === 3 && selectedTrainer && (
          <motion.div key="step3" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}
            className="max-w-lg mx-auto space-y-6">
            <Card accent>
              <h2 className="font-barlow font-bold text-2xl text-text-primary uppercase mb-6">Booking Summary</h2>
              <div className="space-y-4 text-sm font-inter">
                {[
                  { l:'Trainer',      v: selectedTrainer.name    },
                  { l:'Specialty',    v: selectedTrainer.specialty},
                  { l:'Workout Type', v: wizard.workoutType || selectedTrainer.specialty },
                  { l:'Date',         v: wizard.selectedDate      },
                  { l:'Time',         v: wizard.selectedTime      },
                  { l:'Duration',     v: '55 minutes'             },
                  { l:'Rate',         v: `$${selectedTrainer.rate}/hr` },
                ].map(row => (
                  <div key={row.l} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-text-secondary">{row.l}</span>
                    <span className="font-semibold text-text-primary">{row.v}</span>
                  </div>
                ))}
              </div>
            </Card>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setWizardStep(2)} className="flex-1 justify-center">← Back</Button>
              <Button onClick={handleConfirm} className="flex-1 justify-center" size="lg">Confirm Booking ✓</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
