// === FILE: src/components/ui/Card.tsx ===
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;   // orange left border
  hover?: boolean;    // enable hover lift
  animate?: boolean;  // fade+slide on mount
  delay?: number;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  accent = false,
  hover = true,
  animate = false,
  delay = 0,
  onClick,
}) => {
  const base = clsx(
    'bg-white rounded-xl border border-border shadow-card p-6 transition-all duration-200',
    hover && 'hover:shadow-card-hover hover:border-accent',
    accent && 'border-l-4 border-l-accent',
    onClick && 'cursor-pointer',
    className
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className={base}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={base} onClick={onClick}>
      {children}
    </div>
  );
};
