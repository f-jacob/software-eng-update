// === FILE: src/pages/user/UserDashboard.tsx ===
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Heart, Clock, Zap, ChevronRight } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ActivityBarChart } from '../../components/charts/ActivityBarChart';
import { weeklyBarData, upcomingSession, mockBookings } from '../../data/mockData';

const QUICK_ACTIONS = [
  { label:'Book Trainer', icon:<BookOpen size={22}/>,  path:'/user/booking',  color:'bg-accent-light text-accent' },
  { label:'My Schedule',  icon:<Calendar size={22}/>,  path:'/user/schedule', color:'bg-blue-50 text-blue-600'   },
  { label:'My Habits',    icon:<Heart size={22}/>,     path:'/user/habits',   color:'bg-green-50 text-green-600' },
  { label:'History',      icon:<Clock size={22}/>,     path:'/user/history',  color:'bg-amber-50 text-amber-600' },
];

export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const accepted  = mockBookings.filter(b => b.status === 'ACCEPTED').length;
  const thisWeek  = mockBookings.filter(b => {
    const d = new Date(b.date); const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 86400000;
    return diff <= 7 && b.status === 'ACCEPTED';
  }).length;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Sessions"  value={accepted}   numeric={accepted}  trend={8.2}   delay={0}    />
        <StatCard label="This Week"        value={thisWeek}   numeric={thisWeek}  trend={15}    delay={0.07} />
        <StatCard label="Current Streak"   value="7 days"                         trend={40}    delay={0.14} />
        <StatCard label="Next Session"     value="Tue 17:00"                                    delay={0.21} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly chart */}
        <Card animate className="lg:col-span-2 p-6" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="section-divider">
              <h2 className="section-title text-xl">Weekly Activity</h2>
            </div>
            <span className="text-xs text-text-secondary font-inter">Apr 14 – 20</span>
          </div>
          <ActivityBarChart data={weeklyBarData} xKey="day" dataKey="sessions" height={220} />
        </Card>

        {/* Upcoming session */}
        <Card accent animate delay={0.1} className="flex flex-col gap-4">
          <p className="card-label">Upcoming Session</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white font-barlow font-bold text-lg">MR</div>
            <div>
              <p className="font-barlow font-bold text-lg text-text-primary leading-tight">{upcomingSession.trainerName}</p>
              <p className="text-xs text-accent font-semibold">{upcomingSession.specialty}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm font-inter text-text-secondary">
            <div className="flex justify-between"><span>Date</span><span className="font-medium text-text-primary">Tue, Apr 22</span></div>
            <div className="flex justify-between"><span>Time</span><span className="font-medium text-text-primary">{upcomingSession.time}</span></div>
            <div className="flex justify-between"><span>Duration</span><span className="font-medium text-text-primary">{upcomingSession.duration} min</span></div>
          </div>
          <Badge status="ACCEPTED" />
          <button onClick={() => navigate('/user/schedule')}
            className="flex items-center gap-2 text-sm text-accent font-semibold hover:underline mt-auto">
            View Schedule <ChevronRight size={14}/>
          </button>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="section-divider mb-6">
          <h2 className="section-title text-xl">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((a, i) => (
            <motion.div key={a.label} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
              transition={{delay: i*0.07}} whileHover={{y:-4}}
              onClick={() => navigate(a.path)}
              className="card p-5 flex flex-col items-center gap-3 text-center cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.color}`}>{a.icon}</div>
              <span className="font-barlow font-bold text-base text-text-primary uppercase">{a.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent bookings */}
      <Card animate delay={0.2} hover={false}>
        <div className="flex items-center justify-between mb-5">
          <div className="section-divider">
            <h2 className="section-title text-xl">Recent Bookings</h2>
          </div>
          <button onClick={() => navigate('/user/history')} className="text-xs text-accent font-semibold hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {mockBookings.slice(0, 4).map(b => (
            <div key={b.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-bg-section transition-colors">
              <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center text-accent">
                <Zap size={16}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-inter font-semibold text-sm text-text-primary">{b.trainerName}</p>
                <p className="text-xs text-text-secondary">{b.workoutType} · {b.date} {b.time}</p>
              </div>
              <Badge status={b.status}/>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
