import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({ children, content, position = 'top', delay = 0.2, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  let timeout;

  const showTooltip = () => {
    if (!content) return;
    timeout = setTimeout(() => setIsVisible(true), delay * 1000);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setIsVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className={`relative inline-flex ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 whitespace-nowrap rounded-md shadow-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 pointer-events-none ${positionStyles[position]}`}
          >
            {content}
            {position === 'top' && <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"></div>}
            {position === 'bottom' && <div className="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-zinc-900 dark:border-b-zinc-100"></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
