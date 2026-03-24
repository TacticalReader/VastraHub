import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiCheckCircle } from 'react-icons/fi';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const COUPON_CODE = 'VASTRA10';

export default function CouponPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');

  useEffect(() => {
    // Only proceed if we are on mobile or tablet
    if (!isMobileOrTablet) {
      setIsVisible(false);
      return;
    }

    // Show after 5 seconds
    const timer = setTimeout(() => {
      // Only show if not dismissed in this session
      if (!sessionStorage.getItem('VastraHub_coupon_dismissed')) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isMobileOrTablet]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('VastraHub_coupon_dismissed', 'true');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-end justify-center p-4 sm:items-center sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl"
            style={{ 
              background: 'var(--color-bg-card)', 
              border: '1px solid var(--color-border)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            {/* Design elements */}
            <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'var(--color-primary)' }} />
            
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Close"
            >
              <FiX size={20} style={{ color: 'var(--color-text-muted)' }} />
            </button>

            <div className="p-8 text-center mt-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'var(--color-primary-light)' }}>
                <span className="text-3xl">🎁</span>
              </div>
              
              <h2 className="text-4xl font-normal tracking-wide mt-2" style={{ fontFamily: 'var(--font-bebas)', color: 'var(--color-primary)' }}>
                SPECIAL OFFER!
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Grab an extra <span className="font-bold text-[color:var(--color-primary)]">10% OFF</span> on your primary order.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <div 
                  className="flex items-center justify-between rounded-2xl border-2 border-dashed px-5 py-4"
                  style={{ borderColor: 'var(--color-primary)', background: 'var(--color-bg-secondary)' }}
                >
                  <span className="text-2xl font-bold tracking-[0.15em]" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-space)' }}>
                    {COUPON_CODE}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-bold uppercase transition-all active:scale-95"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {copied ? (
                      <>
                        <FiCheckCircle size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <FiCopy size={14} /> Copy
                      </>
                    )}
                  </button>
                </div>
                
                <button
                  onClick={handleClose}
                  className="mt-2 w-full rounded-2xl py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'var(--color-primary)' }}
                >
                  Apply & Shop Now
                </button>
                
                <p className="text-[10px] uppercase tracking-widest mt-2" style={{ color: 'var(--color-text-muted)' }}>
                  * Valid on all formal and seasonal collections
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
