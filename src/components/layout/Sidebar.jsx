import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import ProductFilters from '../product/ProductFilters';

/**
 * Mobile filter drawer — slides up from the bottom on small screens.
 * Wraps <ProductFilters /> with a backdrop, close button, and scroll-lock.
 */
export default function Sidebar({
  isOpen,
  onClose,
  selectedGenders,
  setSelectedGenders,
  selectedCategories,
  setSelectedCategories,
  maxPrice,
  setMaxPrice,
}) {
  /* Lock body scroll while the drawer is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleApply = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark backdrop */}
          <motion.div
            key="sidebar-backdrop"
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-up drawer */}
          <motion.aside
            key="sidebar-drawer"
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl shadow-2xl"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              maxHeight: '85vh',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h2
                className="text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text)',
                }}
              >
                Filters
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text)',
                }}
                aria-label="Close filters"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Scrollable filter content */}
            <div
              className="overflow-y-auto px-6 py-5"
              style={{ maxHeight: 'calc(85vh - 65px)' }}
            >
              <ProductFilters
                selectedGenders={selectedGenders}
                setSelectedGenders={setSelectedGenders}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onApply={handleApply}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
