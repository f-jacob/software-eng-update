// === FILE: src/pages/trainer/ClientListPage.tsx ===
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SortAsc, MoreVertical, MessageSquare, Calendar, ChevronRight, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useTrainerStore } from '../../store/trainerStore';

export const ClientListPage: React.FC = () => {
  const { clients, selectedClientId, setSelectedClient } = useTrainerStore();
  const [search, setSearch] = useState('');
  
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedClient = clients.find(c => c.id === selectedClientId);

  return (
    <div className="relative h-full">
      <div className="space-y-8 h-full">
        <div>
          <h1 className="page-title mb-2" style={{ fontSize: '2.5rem' }}>My Clients</h1>
          <p className="text-text-secondary font-inter text-sm">Track progress and manage your roster.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3 bg-bg-section px-4 py-2 rounded-lg w-full md:w-96">
            <Search size={18} className="text-text-light" />
            <input 
              type="text" 
              placeholder="Search clients by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-inter w-full" 
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-light uppercase tracking-wider">Sort by:</span>
            <select className="bg-transparent text-sm font-bold text-text-primary font-inter outline-none cursor-pointer">
               <option>Consistency</option>
               <option>Total Sessions</option>
               <option>Recently Active</option>
            </select>
            <SortAsc size={16} className="text-accent" />
          </div>
        </div>

        {/* Clients Table */}
        <Card className="overflow-hidden" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter">
              <thead className="bg-bg-section text-[10px] uppercase tracking-widest text-text-secondary font-bold">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Sessions</th>
                  <th className="px-6 py-4">Last Visit</th>
                  <th className="px-6 py-4">Consistency</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClients.map((client) => (
                  <tr 
                    key={client.id}
                    onClick={() => setSelectedClient(client.id)}
                    className="hover:bg-bg-section transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <Avatar initials={client.initials} size="md" variant="orange" />
                        <div>
                          <p className="font-bold text-text-primary group-hover:text-accent transition-colors">{client.name}</p>
                          <p className="text-xs text-text-light">{client.workoutType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm font-semibold text-text-primary">
                      {client.sessions}
                    </td>
                    <td className="px-6 py-6 text-sm text-text-secondary">
                      {client.lastVisit}
                    </td>
                    <td className="px-6 py-6 w-48">
                       <div className="flex items-center gap-3">
                          <ProgressBar value={client.consistency} height="sm" className="flex-1" />
                          <span className="text-xs font-bold text-text-primary w-8">{client.consistency}%</span>
                       </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                       <button className="p-2 text-text-light hover:text-accent transition-colors">
                          <ChevronRight size={20} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Right Drawer */}
      <AnimatePresence>
        {selectedClientId && selectedClient && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-barlow font-extrabold text-2xl text-text-primary uppercase tracking-tight">Client Detail</h2>
                <button onClick={() => setSelectedClient(null)} className="p-2 text-text-light hover:text-text-primary">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center mb-8">
                 <Avatar initials={selectedClient.initials} size="xl" variant="orange" className="mb-4" />
                 <h3 className="font-barlow font-bold text-3xl text-text-primary uppercase leading-none">{selectedClient.name}</h3>
                 <p className="text-accent font-bold uppercase tracking-wider text-sm mt-2">{selectedClient.workoutType}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-bg-section p-4 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-text-secondary uppercase mb-1">Total Sessions</p>
                    <p className="font-barlow font-extrabold text-4xl text-text-primary">{selectedClient.sessions}</p>
                 </div>
                 <div className="bg-bg-section p-4 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-text-secondary uppercase mb-1">Consistency</p>
                    <p className="font-barlow font-extrabold text-4xl text-accent">{selectedClient.consistency}%</p>
                 </div>
              </div>

              <div className="space-y-6 flex-1">
                 <div className="section-divider">
                    <h4 className="section-title text-sm">Recent Activity</h4>
                 </div>
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-4 p-4 border border-border rounded-xl">
                         <div className="w-10 h-10 rounded-lg bg-accent-light text-accent flex items-center justify-center shrink-0">
                            <Calendar size={18} />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-text-primary uppercase">Strength Training</p>
                            <p className="text-xs text-text-secondary">Monday, April {10 + i} · 17:00</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="mt-8 flex gap-3">
                 <button className="flex-1 bg-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent-hover transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={18} /> Message
                 </button>
                 <button className="w-16 bg-bg-section text-text-primary py-4 rounded-xl font-bold flex items-center justify-center hover:bg-border transition-all">
                    <MoreVertical size={18} />
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
