// === FILE: src/components/layout/TopBar.tsx ===
import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useHabitStore } from '../../store/habitStore';
import { motion } from 'framer-motion';

interface TopBarProps {
  title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const { currentUser } = useAuthStore();
  const { streak } = useHabitStore();
  const [notifOpen, setNotifOpen] = useState(false);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="h-16 bg-white border-b border-border flex items-center px-6 gap-4 sticky top-0 z-20">
      <div className="flex-1">
        {title ? (
          <h1 className="font-barlow font-extrabold text-2xl text-text-primary uppercase">{title}</h1>
        ) : (
          <div className="flex items-center gap-3">
            <p className="font-inter font-medium text-text-primary">
              {greeting}, <span className="font-semibold text-text-primary">{currentUser?.name?.split(' ')[0]} 💪</span>
            </p>
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                className="flex items-center gap-1.5 bg-accent-light text-accent px-3 py-1 rounded-full text-xs font-inter font-semibold"
              >
                🔥 {streak} Day Streak
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-bg-section rounded-lg px-3 py-2 w-56">
        <Search size={15} className="text-text-light" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm font-inter text-text-primary placeholder-text-light outline-none w-full"
        />
      </div>

      {/* Bell */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen((o) => !o)}
          className="relative w-9 h-9 rounded-lg bg-bg-section flex items-center justify-center hover:bg-accent-light transition-colors"
        >
          <Bell size={18} className="text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
        </button>
        {notifOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-card-hover border border-border z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="font-barlow font-bold text-base text-text-primary uppercase">Notifications</p>
            </div>
            {[
              { msg: 'Marcus Reid confirmed your session', time: '2h ago' },
              { msg: 'Session tomorrow at 17:00 — reminder', time: '5h ago' },
              { msg: 'New trainer available: Lena Fischer', time: '1d ago' },
            ].map((n, i) => (
              <div key={i} className="px-4 py-3 hover:bg-bg-section transition-colors border-b border-border last:border-0">
                <p className="text-sm font-inter text-text-primary">{n.msg}</p>
                <p className="text-xs text-text-light mt-0.5">{n.time}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
};
