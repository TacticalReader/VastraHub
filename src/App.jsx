import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import Router from './router';
import allProducts from './data/allProducts';

// Inline CustomCursor component so we don't create new files
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* 1. Inner solid dot for precise tracking */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{ backgroundColor: 'var(--color-primary)' }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering ? 0 : 1, // hides when hovering buttons
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.05 }}
      />
      
      {/* 2. Outer trailing ring that expands on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--color-primary)] pointer-events-none z-[9998]"
        style={{
          boxShadow: isHovering ? '0 0 10px var(--color-primary)' : 'none',
          backgroundColor: isHovering ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)' : 'transparent',
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 16),
          y: mousePosition.y - (isHovering ? 20 : 16),
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25, mass: 0.5 }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {/* allProducts passed so search typeahead works across all 144 product images */}
            <SearchProvider products={allProducts}>
              <CustomCursor />
              <Router />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 2500,
                  style: {
                    fontFamily: 'var(--font-body)',
                    background: 'var(--color-bg-card)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-md)',
                  },
                }}
              />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
