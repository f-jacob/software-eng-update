// === FILE: src/pages/admin/AnalyticsPage.tsx ===
import React, { useState } from 'react';
import { Download, Send } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ActivityBarChart } from '../../components/charts/ActivityBarChart';
import { WorkoutDonutChart } from '../../components/charts/WorkoutDonutChart';
import { analyticsSessionData, workoutTypeData, inactiveUsers } from '../../data/mockData';

const RANGES = ['7d', '30d', '90d', '1y'];

export const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState('30d');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="page-title mb-2" style={{ fontSize: '2.5rem' }}>Platform Analytics</h1>
          <p className="text-text-secondary font-inter text-sm">Deep dive into user behavior and session distribution.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-border shadow-sm">
           {RANGES.map(r => (
             <button
               key={r}
               onClick={() => setRange(r)}
               className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                 range === r ? 'bg-accent text-white shadow-md' : 'text-text-light hover:text-text-secondary'
               }`}
             >
               {r}
             </button>
           ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sessions per day */}
        <Card className="lg:col-span-2 p-6" hover={false}>
          <div className="flex items-center justify-between mb-8">
            <div className="section-divider">
              <h2 className="section-title text-xl">Sessions Per Day</h2>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest hover:underline">
               <Download size={14} /> Export Report
            </button>
          </div>
          <ActivityBarChart data={analyticsSessionData} xKey="date" dataKey="sessions" height={320} />
        </Card>

        {/* Workout Type Breakdown */}
        <Card className="p-6" hover={false}>
          <div className="section-divider mb-6">
            <h2 className="section-title text-xl">Workout Distribution</h2>
          </div>
          <WorkoutDonutChart data={workoutTypeData} height={300} />
          <div className="mt-6 space-y-3">
             {workoutTypeData.map(item => (
               <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-sm font-inter font-medium text-text-secondary">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary">{item.value}%</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
         {/* User Engagement Heatmap (Simulated) */}
         <Card className="p-6" hover={false}>
            <div className="section-divider mb-6">
               <h2 className="section-title text-xl">User Activity Heatmap</h2>
            </div>
            <div className="grid grid-cols-24 gap-1 h-48">
               {Array.from({ length: 24 * 7 }).map((_, i) => {
                  const intensity = Math.random();
                  const color = intensity > 0.8 ? 'bg-accent' : intensity > 0.5 ? 'bg-orange-400' : intensity > 0.2 ? 'bg-orange-200' : 'bg-bg-section';
                  return <div key={i} className={`rounded-sm ${color} transition-all hover:scale-110 cursor-pointer`} title={`Hour: ${i % 24}, Day: ${Math.floor(i / 24)}`} />
               })}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-text-light uppercase tracking-widest">
               <span>12 AM</span>
               <span>12 PM</span>
               <span>11 PM</span>
            </div>
         </Card>

         {/* Inactive Users Table */}
         <Card className="p-6 overflow-hidden flex flex-col" hover={false}>
            <div className="section-divider mb-6">
               <h2 className="section-title text-xl">Retention Risk</h2>
            </div>
            <div className="overflow-x-auto flex-1">
               <table className="w-full text-left font-inter">
                  <thead className="text-[10px] uppercase text-text-light font-bold border-b border-border">
                     <tr>
                        <th className="pb-4">User</th>
                        <th className="pb-4">Last Active</th>
                        <th className="pb-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                     {inactiveUsers.map((user) => (
                        <tr key={user.id} className="group">
                           <td className="py-4">
                              <p className="text-sm font-bold text-text-primary">{user.name}</p>
                              <p className="text-[10px] text-text-light uppercase">{user.sessions} Total Sessions</p>
                           </td>
                           <td className="py-4 text-xs text-text-secondary">
                              {user.lastActive}
                           </td>
                           <td className="py-4 text-right">
                              <button className="p-2 text-accent bg-accent-light rounded-lg hover:bg-accent hover:text-white transition-all">
                                 <Send size={14} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>
      </div>
    </div>
  );
};
