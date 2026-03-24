import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: '0%', transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { x: '100%', transition: { duration: 0.25 } },
};

export default function CartDrawer({ isOpen, onClose }) {
  const { items } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[var(--z-navbar)] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 z-[var(--z-dropdown)] w-[min(90vw,420px)] flex flex-col shadow-2xl"
            style={{ background: 'var(--color-bg)', borderLeft: '1px solid var(--color-border)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor: 'var(--color-border)' }}>
              <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Your Cart {items.length > 0 && `(${items.length})`}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                style={{ color: 'var(--color-text)' }}
              >
                <HiX size={22} />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
                <img
                  src={import.meta.env.BASE_URL + 'assets/illustrations/empty-cart.svg'}
                  alt="Empty cart"
                  width={200}
                  height={200}
                  className="mx-auto mb-6"
                />
                <p className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>Your cart is empty</p>
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                  Looks like you haven't added anything yet.
                </p>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-85"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <FiShoppingCart size={16} /> Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map(item => (
                  <CartItem key={item.key} item={item} />
                ))}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t shrink-0 p-4" style={{ borderColor: 'var(--color-border)' }}>
                <CartSummary onClose={onClose} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
