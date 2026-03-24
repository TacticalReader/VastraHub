import React from 'react';

export default function Badge({ children, variant = 'new', className = '' }) {
  const baseStyles = 'inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded shadow-sm z-10';
  
  const variants = {
    new: 'bg-blue-600 text-white',
    sale: 'bg-red-600 text-white',
    hot: 'bg-orange-500 text-white',
    discount: 'bg-green-600 text-white',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.new} ${className}`}>
      {children}
    </span>
  );
}
