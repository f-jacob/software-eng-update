// === FILE: src/components/layout/DashboardLayout.tsx ===
import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface DashboardLayoutProps {
  title?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title }) => {
  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-60 transition-all duration-250">
        <TopBar title={title} />
        <motion.main
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex-1 overflow-y-auto p-6 bg-bg-base"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};
