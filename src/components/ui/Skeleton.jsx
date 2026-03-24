import React from 'react';

export default function Skeleton({ className = '', variant = 'rectangular', ...props }) {
  // variant: 'rectangular' | 'circular' | 'text'
  const baseClasses = 'animate-pulse bg-zinc-200 dark:bg-zinc-800/80';
  
  const variants = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4',
  };

  return (
    <div 
      className={`skeleton-shimmer ${baseClasses} ${variants[variant]} ${className}`} 
      {...props}
    />
  );
}
