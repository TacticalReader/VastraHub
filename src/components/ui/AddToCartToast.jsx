// src/components/ui/AddToCartToast.jsx
// Global "Added to cart" toast — mount once in App.jsx or layout root
// Listens to a custom 'cart:added' DOM event dispatched by useAddToCartAnimation

import { useState, useEffect, useRef } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

export default function AddToCartToast() {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const handler = (e) => {
      const { name, image } = e.detail ?? {};
      const id = ++counterRef.current;

      setToasts((prev) => [...prev, { id, name, image }]);

      // auto-dismiss after 3 s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    window.addEventListener('cart:added', handler);
    return () => window.removeEventListener('cart:added', handler);
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="cart-toast-portal"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="cart-toast animate-toast-in">
          {/* green check badge */}
          <span className="cart-toast__icon">
            <FiCheck size={14} strokeWidth={3} />
          </span>

          {/* product thumbnail */}
          {toast.image && (
            <img
              src={toast.image}
              alt=""
              width={44}
              height={44}
              className="cart-toast__img"
            />
          )}

          {/* text */}
          <div className="cart-toast__body">
            <p className="cart-toast__title">Added to cart!</p>
            {toast.name && (
              <p className="cart-toast__name">{toast.name}</p>
            )}
          </div>

          {/* close */}
          <button
            onClick={() => dismiss(toast.id)}
            aria-label="Dismiss"
            className="cart-toast__close"
          >
            <FiX size={14} />
          </button>

          {/* progress bar */}
          <span className="cart-toast__progress" />
        </div>
      ))}
    </div>
  );
}
