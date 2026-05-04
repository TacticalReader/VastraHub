// src/hooks/useAddToCartAnimation.js
// Returns a wrapped addToCart that:
//   1. Calls the real addToCart
//   2. Fires a 'cart:added' DOM event (picked up by AddToCartToast)
//   3. Returns { animating } state so buttons can show a success indicator

import { useState, useCallback } from 'react';
import { useCart } from './useCart';

/**
 * @returns {{ wrappedAddToCart, animating }}
 *   wrappedAddToCart(product, size, qty) — drop-in replacement for addToCart
 *   animating — boolean, true for ~800 ms after the last call
 */
export function useAddToCartAnimation() {
  const { addToCart } = useCart();
  const [animating, setAnimating] = useState(false);

  const wrappedAddToCart = useCallback(
    (product, size, qty = 1) => {
      addToCart(product, size, qty);

      // fire toast event
      window.dispatchEvent(
        new CustomEvent('cart:added', {
          detail: {
            name: product?.name,
            image: product?.images?.[0] ?? null,
          },
        })
      );

      // trigger button success state
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 900);
      return () => clearTimeout(t);
    },
    [addToCart]
  );

  return { wrappedAddToCart, animating };
}
