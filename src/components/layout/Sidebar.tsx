// === FILE: src/components/layout/Sidebar.tsx ===
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard, Calendar, CalendarCheck, Heart, Clock,
  Users, BookOpen, ClipboardList, BarChart2,
  LogOut, ChevronLeft, ChevronRight, Zap,
} from 'lucide-react';

interface NavItem { label: string; path: string; icon: React.ReactNode; }

const userNav: NavItem[] = [
  { label: 'Dashboard',  path: '/user/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Book',       path: '/user/booking',   icon: <BookOpen size={18} />        },
  { label: 'Schedule',   path: '/user/schedule',  icon: <Calendar size={18} />        },
  { label: 'Habits',     path: '/user/habits',    icon: <Heart size={18} />           },
  { label: 'History',    path: '/user/history',   icon: <Clock size={18} />           },
];
const trainerNav: NavItem[] = [
  { label: 'Dashboard',    path: '/trainer/dashboard',    icon: <LayoutDashboard size={18} /> },
  { label: 'Requests',     path: '/trainer/requests',     icon: <ClipboardList size={18} />   },
  { label: 'Availability', path: '/trainer/availability', icon: <CalendarCheck size={18} />   },
  { label: 'Clients',      path: '/trainer/clients',      icon: <Users size={18} />           },
];
const adminNav: NavItem[] = [
  { label: 'Dashboard',  path: '/admin/dashboard',  icon: <LayoutDashboard size={18} /> },
  { label: 'Analytics',  path: '/admin/analytics',  icon: <BarChart2 size={18} />       },
];

export const Sidebar: React.FC = () => {
  const { currentUser, role, logout } = useAuthStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = role === 'admin' ? adminNav : role === 'trainer' ? trainerNav : userNav;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-sidebar-bg shadow-sidebar z-30 flex flex-col overflow-hidden"
      style={{ minWidth: collapsed ? 72 : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <Zap size={18} className="text-white" fill="white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="font-barlow font-extrabold text-xl text-white uppercase tracking-wide"
          >
            FitHabit
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="ml-auto text-sidebar-text hover:text-white transition-colors p-1 rounded"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <span className="inline-block bg-accent/20 text-accent text-xs font-inter font-semibold px-2 py-0.5 rounded uppercase tracking-widest">
            {role}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg font-inter font-medium text-sm transition-all duration-150 group relative',
                isActive
                  ? 'bg-accent text-white'
                  : 'text-sidebar-text hover:bg-white/10 hover:text-white'
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                  >
                    {item.label}
                  </motion.span>
                )}
                {isActive && !collapsed && (
                  <motion.span
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-white/10 px-3 py-4">
        {!collapsed && currentUser && (
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-barlow font-bold shrink-0">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-xs font-semibold truncate">{currentUser.name}</p>
              <p className="text-sidebar-text text-xs truncate">{currentUser.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-text hover:bg-danger/20 hover:text-red-400 transition-all duration-150 w-full text-sm font-inter"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};
