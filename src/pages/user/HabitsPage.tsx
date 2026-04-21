// === FILE: src/pages/user/HabitsPage.tsx ===
import React from 'react';
import { Zap, Bell, CloudUpload, Loader2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { useAuthStore } from '../../store/authStore';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { AnimatePresence } from 'framer-motion';

export const HabitsPage: React.FC = () => {
  const { currentUser } = useAuthStore();
  
  const habits = useQuery(api.habits.getHabits, currentUser ? { userId: currentUser.id as any } : "skip");
  const intelligence = useQuery(api.analytics.getUserHabitIntelligence, currentUser ? { userId: currentUser.id as any } : "skip");
  
  const updateSettings = useMutation(api.analytics.updateUserSettings);
  const runSeed = useMutation(api.seed.ensureDataIntegrity);

  const handleSeed = async () => {
    if (confirm('Lengkapi database dengan data demo yang valid? (Tanpa menghapus data Anda)')) {
      try {
        await runSeed();
        alert('Berhasil! Integritas data diverifikasi dan data pelengkap ditambahkan.');
      } catch (err) {
        alert('Error verifying system data');
      }
    }
  };

  const toggleNotifications = () => {
    if (!currentUser || !intelligence) return;
    updateSettings({ userId: currentUser.id as any, notificationsEnabled: !intelligence.notificationsEnabled });
  };

  const toggleAutoBook = () => {
    if (!currentUser || !intelligence) return;
    updateSettings({ userId: currentUser.id as any, autoBookEnabled: !intelligence.autoBookEnabled });
  };

  if (!intelligence) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  const { peakHour, peakDays, insights, heatmap, notificationsEnabled, autoBookEnabled, habitScore } = intelligence;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="page-title mb-2" style={{ fontSize: '2.5rem' }}>Habit Intelligence</h1>
          <p className="text-text-secondary font-inter text-sm">Master your routine with AI-powered habit tracking.</p>
        </div>
        <button 
          onClick={handleSeed}
          className="flex items-center gap-2 bg-bg-surface border border-border text-text-secondary px-4 py-2 rounded-xl text-sm font-semibold hover:text-text-primary transition-all shadow-sm"
        >
          <CloudUpload size={16} />
          Seed Data (Demo)
        </button>
      </div>

      {/* Hero Insight Banner */}
      <Card className="bg-bg-surface border border-border p-8 relative overflow-hidden" hover={false}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent mb-4">
              AI behavioral analysis
            </div>
            <h2 className="heading-xl uppercase mb-3">
              Peak performance at <span className="text-accent">{peakHour}</span>
            </h2>
            <p className="text-text-secondary font-inter max-w-lg leading-relaxed">
              Your most consistent sessions occur on {peakDays.join(', ')}. Training during ini meningkatkan tingkat keberhasilan habit Anda secara signifikan.
            </p>
          </div>
          <div className="shrink-0">
             <ProgressRing value={habitScore ?? 0} label={(habitScore ?? 0).toString()} sublabel="Habit Score" size={140} strokeWidth={8} />
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <Card key={insight.id} animate delay={i * 0.05} className="flex flex-col items-start p-6 bg-bg-surface">
            <div className="w-10 h-10 rounded-xl bg-bg-base border border-border flex items-center justify-center text-xl mb-4 shadow-inner">
              {insight.icon}
            </div>
            <p className="text-label mb-1 uppercase tracking-widest opacity-60">{insight.label}</p>
            <p className="font-barlow font-bold text-2xl text-text-primary uppercase tracking-tight">{insight.value}</p>
          </Card>
        ))}
      </div>

      {/* Heatmap Section */}
      <Card className="p-8 bg-bg-surface border-border" hover={false}>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-6 bg-accent rounded-full" />
          <h2 className="font-barlow font-bold text-lg uppercase tracking-tight">Consistency Heatmap (90 Days)</h2>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {heatmap.map((day, i) => {
            const color = day.count === 0 ? 'bg-bg-base/50' : day.count === 1 ? 'bg-accent/40' : day.count === 2 ? 'bg-accent/70' : 'bg-accent';
            return (
              <div 
                key={i} 
                className={`w-4 h-4 rounded-sm border border-border/10 ${color} transition-all hover:scale-125 cursor-help`} 
                title={`${day.date}: ${day.count} sessions`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-8 text-[9px] font-bold uppercase tracking-[0.2em] text-text-light opacity-50">
          <span>Inability</span>
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 bg-bg-base rounded-sm border border-border/10" />
            <div className="w-3.5 h-3.5 bg-accent/40 rounded-sm border border-border/10" />
            <div className="w-3.5 h-3.5 bg-accent/70 rounded-sm border border-border/10" />
            <div className="w-3.5 h-3.5 bg-accent rounded-sm border border-border/10" />
          </div>
          <span>Peak</span>
        </div>
      </Card>

      {/* Active Habits Section */}
      <div className="section-divider mb-6">
        <h2 className="section-title text-xl tracking-tight">Your Active Habits</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {habits?.map((habit, i) => (
            <Card key={habit._id} animate delay={i * 0.1} className="p-6 bg-bg-surface border-border relative group">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: habit.color }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-light">{habit.frequency}</span>
                  </div>
                  <h3 className="font-barlow font-bold text-xl text-text-primary uppercase leading-tight group-hover:text-accent transition-colors">{habit.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent border border-accent/10">
                   <Zap size={20} fill={habit.color} color={habit.color} className="opacity-80" />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                 <div className="text-[10px] text-text-light uppercase font-bold tracking-wider">Since {new Date(habit.createdAt).toLocaleDateString()}</div>
                 <button className="bg-bg-base border border-border text-text-primary px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all">Log</button>
              </div>
            </Card>
          ))}
        </AnimatePresence>

        <Card className="p-6 border-dashed border-2 border-border bg-transparent flex flex-col items-center justify-center text-text-light cursor-pointer hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-all group min-h-[160px]">
            <div className="w-10 h-10 rounded-full border border-dashed border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CloudUpload size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Create New Habit</span>
        </Card>
      </div>

      {/* Auto-Book & Notifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card accent className="p-8 bg-bg-surface border-border shadow-lg shadow-accent/5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="font-barlow font-bold text-xl text-text-primary uppercase tracking-tight">Auto-Book Slots</h3>
                <p className="text-xs text-text-secondary font-inter">Sync sessions to your peak behavior hours.</p>
              </div>
            </div>
            <button 
              onClick={toggleAutoBook}
              className={`w-14 h-7 rounded-full transition-all duration-300 relative border border-white/10 ${autoBookEnabled ? 'bg-accent' : 'bg-bg-base'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${autoBookEnabled ? 'left-8 bg-white' : 'left-1 bg-text-light'}`} />
            </button>
          </div>
        </Card>

        <Card className="p-8 bg-bg-surface border-border">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-bg-base text-text-light flex items-center justify-center border border-border">
                <Bell size={24} />
              </div>
              <div>
                <h3 className="font-barlow font-bold text-xl text-text-primary uppercase tracking-tight">Smart Alerts</h3>
                <p className="text-xs text-text-secondary font-inter">Reminders timed to activity patterns.</p>
              </div>
            </div>
            <button 
              onClick={toggleNotifications}
              className={`w-14 h-7 rounded-full transition-all duration-300 relative border border-white/10 ${notificationsEnabled ? 'bg-accent' : 'bg-bg-base'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${notificationsEnabled ? 'left-8 bg-white' : 'left-1 bg-text-light'}`} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
