import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  fullWidth = false,
  onClick,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-glow bg-[color:var(--color-primary)] text-white hover:opacity-90 shadow-md focus:ring-[color:var(--color-primary)] hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white',
    outline: 'border-2 border-[color:var(--color-border)] text-[color:var(--color-text)] hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]',
    ghost: 'text-[color:var(--color-text)] hover:bg-zinc-100 dark:hover:bg-zinc-800',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-11 px-5 text-sm rounded-lg',
    lg: 'h-14 px-8 text-base rounded-xl',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button 
      className={classes} 
      disabled={disabled} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
