// === FILE: src/pages/admin/AdminDashboard.tsx ===
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, Award, Zap } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { ActivityBarChart } from '../../components/charts/ActivityBarChart';
import { Avatar } from '../../components/ui/Avatar';
import { useAdminStore } from '../../store/adminStore';

export const AdminDashboard: React.FC = () => {
  const { kpis, chartData, leaderboard, activityFeed } = useAdminStore();

  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <StatCard 
            key={kpi.label} 
            label={kpi.label} 
            value={kpi.value} 
            numeric={parseFloat(kpi.value.replace(/[^0-9.]/g, ''))}
            trend={kpi.trend}
            delay={i * 0.1}
            icon={i === 0 ? <Users /> : i === 1 ? <UserCheck /> : i === 2 ? <Calendar /> : <DollarSign />}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <Card className="lg:col-span-2 p-6" hover={false}>
          <div className="flex items-center justify-between mb-8">
            <div className="section-divider">
              <h2 className="section-title text-xl">Revenue Growth</h2>
            </div>
            <div className="flex gap-2">
               {['7d', '30d', '90d'].map(d => (
                 <button key={d} className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${d === '30d' ? 'bg-accent text-white' : 'bg-bg-section text-text-light hover:text-text-secondary'}`}>
                    {d}
                 </button>
               ))}
            </div>
          </div>
          <ActivityBarChart data={chartData.slice(-14)} xKey="date" dataKey="revenue" height={300} />
        </Card>

        {/* Activity Feed */}
        <Card className="p-6 overflow-hidden flex flex-col" hover={false}>
          <div className="section-divider mb-6">
            <h2 className="section-title text-xl">Recent Activity</h2>
          </div>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-hide">
            {activityFeed.map((item, i) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 relative last:pb-0 pb-6 before:absolute before:left-5 before:top-10 before:bottom-0 before:w-px before:bg-border last:before:hidden"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  item.type === 'booking' ? 'bg-accent-light text-accent' : 
                  item.type === 'payment' ? 'bg-green-50 text-success' : 
                  item.type === 'cancel' ? 'bg-red-50 text-danger' : 'bg-blue-50 text-blue-600'
                }`}>
                  {item.type === 'booking' ? <Calendar size={18} /> : 
                   item.type === 'payment' ? <DollarSign size={18} /> : 
                   item.type === 'cancel' ? <Zap size={18} /> : <Users size={18} />}
                </div>
                <div>
                  <p className="text-sm font-inter text-text-primary leading-snug">{item.message}</p>
                  <p className="text-[10px] font-bold text-text-light uppercase tracking-wider mt-1">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trainer Leaderboard */}
        <Card className="p-6" hover={false}>
          <div className="section-divider mb-6">
            <h2 className="section-title text-xl">Top Trainers</h2>
          </div>
          <div className="space-y-4">
            {leaderboard.map((entry) => (
              <div key={entry.trainerId} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent transition-all group">
                <div className="w-8 h-8 flex items-center justify-center font-barlow font-extrabold text-2xl text-text-light group-hover:text-accent transition-colors">
                  {entry.rank === 1 ? <Award className="text-accent-2" /> : entry.rank}
                </div>
                <Avatar initials={entry.initials} size="md" variant="navy" />
                <div className="flex-1">
                   <p className="font-bold text-text-primary uppercase tracking-tight">{entry.name}</p>
                   <p className="text-xs text-text-secondary font-inter">{entry.sessions} Sessions · {entry.rating} Rating</p>
                </div>
                <div className="text-right">
                   <p className="font-barlow font-extrabold text-xl text-text-primary">${entry.revenue.toLocaleString()}</p>
                   <p className="text-[10px] font-bold text-success uppercase tracking-widest">+12%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health / Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
           <Card className="bg-accent text-white border-none p-6 relative overflow-hidden" hover={true}>
              <div className="absolute inset-0 bg-hero-grain opacity-10" />
              <div className="relative z-10">
                 <p className="card-label !text-orange-200 mb-1">Success Rate</p>
                 <p className="font-barlow font-extrabold text-5xl">98.4<span className="text-2xl opacity-60">%</span></p>
                 <div className="mt-4 flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-widest">
                    <TrendingUp size={14} /> Peak Performance
                 </div>
              </div>
           </Card>
           <Card className="bg-sidebar-bg text-white border-none p-6 relative overflow-hidden" hover={true}>
              <div className="relative z-10">
                 <p className="card-label !text-sidebar-text mb-1">Active Bookings</p>
                 <p className="font-barlow font-extrabold text-5xl">412</p>
                 <div className="mt-4 flex items-center gap-2 text-xs font-bold text-sidebar-text uppercase tracking-widest">
                    <Calendar size={14} /> Current Capacity
                 </div>
              </div>
           </Card>
           <Card className="col-span-2 p-6 flex items-center justify-between">
              <div>
                 <h4 className="font-barlow font-bold text-lg text-text-primary uppercase">Trainer Onboarding</h4>
                 <p className="text-sm text-text-secondary font-inter">12 trainers awaiting verification.</p>
              </div>
              <button className="bg-accent text-white px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-accent-hover transition-all">
                 Review All
              </button>
           </Card>
        </div>
      </div>
    </div>
  );
};
