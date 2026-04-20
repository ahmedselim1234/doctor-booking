import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const styles = {
    primary: 'bg-[#1D9E75]/10 text-[#1D9E75]',
    gray: 'bg-[#F3F4F6] text-[#6B7280]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
