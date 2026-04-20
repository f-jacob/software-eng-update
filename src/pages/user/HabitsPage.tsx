// === FILE: src/pages/user/HabitsPage.tsx ===
import React from 'react';
import { Zap, Bell } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { useHabitStore } from '../../store/habitStore';

export const HabitsPage: React.FC = () => {
  const { peakHour, peakDays, insights, heatmap, notificationsEnabled, autoBookEnabled, toggleNotifications, toggleAutoBook } = useHabitStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title mb-2" style={{ fontSize: '2.5rem' }}>Habit Intelligence</h1>
        <p className="text-text-secondary font-inter text-sm">Master your routine with AI-powered habit tracking.</p>
      </div>

      {/* Hero Insight Banner */}
      <Card className="bg-accent text-white p-8 relative overflow-hidden border-none" hover={false}>
        <div className="absolute inset-0 bg-hero-grain opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              AI Insight
            </div>
            <h2 className="font-barlow font-extrabold text-4xl uppercase leading-tight mb-2">
              You peak at <span className="text-accent-2">{peakHour}</span>
            </h2>
            <p className="text-orange-100 font-inter max-w-md">
              Your most consistent sessions occur on {peakDays.join(', ')}. Training during these windows increases your habit success rate by 42%.
            </p>
          </div>
          <div className="shrink-0">
             <ProgressRing value={85} label="85%" sublabel="Habit Score" size={140} strokeWidth={10} />
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <Card key={insight.id} animate delay={i * 0.1} className="flex flex-col items-center text-center p-6">
            <span className="text-4xl mb-3">{insight.icon}</span>
            <p className="card-label mb-1">{insight.label}</p>
            <p className="font-barlow font-extrabold text-3xl text-text-primary uppercase">{insight.value}</p>
          </Card>
        ))}
      </div>

      {/* Heatmap Section */}
      <Card className="p-8" hover={false}>
        <div className="section-divider mb-6">
          <h2 className="section-title text-xl">Consistency Heatmap</h2>
        </div>
        <div className="flex flex-wrap gap-1">
          {heatmap.map((day, i) => {
            const opacity = day.count === 0 ? 'bg-bg-section' : day.count === 1 ? 'bg-orange-200' : day.count === 2 ? 'bg-orange-400' : 'bg-accent';
            return (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-sm ${opacity}`} 
                title={`${day.date}: ${day.count} sessions`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-6 text-xs font-inter text-text-light">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-bg-section rounded-sm" />
            <div className="w-3 h-3 bg-orange-200 rounded-sm" />
            <div className="w-3 h-3 bg-orange-400 rounded-sm" />
            <div className="w-3 h-3 bg-accent rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </Card>

      {/* Auto-Book & Notifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card accent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="font-barlow font-bold text-lg text-text-primary uppercase">Auto-Book Based on Habit</h3>
                <p className="text-xs text-text-secondary font-inter">Automatically reserve slots during your peak hours.</p>
              </div>
            </div>
            <button 
              onClick={toggleAutoBook}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${autoBookEnabled ? 'bg-accent' : 'bg-bg-section'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${autoBookEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg-section text-text-secondary flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="font-barlow font-bold text-lg text-text-primary uppercase">Smart Notifications</h3>
                <p className="text-xs text-text-secondary font-inter">Reminders timed to your behavioral patterns.</p>
              </div>
            </div>
            <button 
              onClick={toggleNotifications}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${notificationsEnabled ? 'bg-accent' : 'bg-bg-section'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${notificationsEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
