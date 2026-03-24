import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { FiTag, FiCheck } from 'react-icons/fi';

export default function CartSummary({ onClose }) {
  const { totalPrice } = useCart();
  const [coupon, setCoupon] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [error, setError] = useState('');

  const handleApply = () => {
    if (coupon.toUpperCase() === 'VASTRA10') {
      setIsApplied(true);
      setError('');
    } else {
      setError('Invalid coupon code');
      setIsApplied(false);
    }
  };

  const discount = isApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discount;

  return (
    <div 
      className="p-6 rounded-2xl shadow-lg bg-white dark:bg-zinc-900"
      style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
    >
      <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--color-text)' }}>Order Summary</h2>
      
      {/* Coupon Input */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-muted)' }}>
          Promo Code
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} size={14} />
            <input
              type="text"
              placeholder="Enter code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full rounded-xl border pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[color:var(--color-primary)]"
              style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>
          <button
            onClick={handleApply}
            disabled={isApplied}
            className="rounded-xl px-4 py-2 text-sm font-bold transition-all active:scale-95 disabled:opacity-50"
            style={{ 
              background: isApplied ? '#22c55e' : 'var(--color-text)', 
              color: '#fff' 
            }}
          >
            {isApplied ? <FiCheck size={18} /> : 'Apply'}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
        {isApplied && <p className="text-xs text-green-600 mt-1.5 font-medium">Coupon VASTRA10 applied!</p>}
      </div>

      <div className="space-y-4 mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium" style={{ color: 'var(--color-text)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
        {isApplied && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount (VASTRA10)</span>
            <span>-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        
        <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--color-border-light)' }} />
        
        <div className="flex justify-between items-center">
          <span className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Total</span>
          <span className="text-2xl font-extrabold" style={{ color: 'var(--color-text)' }}>₹{finalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      <Link
        to="/checkout"
        onClick={onClose}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-xl hover:opacity-90 transition active:scale-[0.98]"
        style={{ background: 'var(--color-primary)' }}
      >
        Checkout Securely
      </Link>
      
      <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
        Taxes calculated at checkout. Easy 30-day returns.
      </p>
    </div>
  );
}
