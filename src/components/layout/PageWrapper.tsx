import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <main className={`max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] ${className}`}>
      {children}
    </main>
  );
}
