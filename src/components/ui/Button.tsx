// === FILE: src/components/ui/Button.tsx ===
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...rest
}) => {
  const base = 'inline-flex items-center gap-2 font-inter font-semibold rounded-lg transition-all duration-150 cursor-pointer';

  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    ghost:   'border-2 border-accent text-accent hover:bg-accent-light',
    danger:  'bg-danger text-white hover:bg-red-600',
    outline: 'border-2 border-border text-text-primary hover:border-accent hover:text-accent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={clsx(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)}
      disabled={disabled || loading}
      {...(rest as any)}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
};
