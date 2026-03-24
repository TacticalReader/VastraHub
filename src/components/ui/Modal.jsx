import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 'var(--z-modal)' }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl ${className}`}
            style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border-light)' }}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: 'var(--color-border-light)' }}>
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{title}</h2>
                <button 
                  onClick={onClose}
                  className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  aria-label="Close modal"
                >
                  <FiX size={20} style={{ color: 'var(--color-text-muted)' }} />
                </button>
              </div>
            )}
            
            {/* Close button if no title */}
            {!title && (
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full p-2 transition-colors bg-white/60 backdrop-blur hover:bg-white dark:bg-black/60 dark:hover:bg-black"
                aria-label="Close modal"
              >
                <FiX size={20} style={{ color: 'var(--color-text)' }} />
              </button>
            )}

            {/* Body */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
