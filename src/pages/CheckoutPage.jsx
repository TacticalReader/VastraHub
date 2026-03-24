// src/pages/CheckoutPage.jsx
// Step 3 (order placed) shows order-success.svg illustration

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCheckCircle, HiOutlineLockClosed } from 'react-icons/hi';

const STEPS = ['Cart', 'Delivery', 'Payment'];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        {/* order-success.svg — celebration illustration */}
        <img
          src={import.meta.env.BASE_URL + 'assets/illustrations/order-success.svg'}
          alt="Order placed successfully"
          width={300}
          height={280}
          loading="eager"
          className="mx-auto"
        />
        <div>
          <HiOutlineCheckCircle size={36} className="mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Your order has been placed!
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Thank you for shopping at VastraHub. You'll receive a confirmation soon.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-85"
          style={{ background: 'var(--color-primary)' }}
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container max-w-2xl py-12">
      <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        Checkout
      </h1>

      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
              style={{
                background: i <= step ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                color: i <= step ? '#fff' : 'var(--color-text-muted)',
              }}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className="text-sm font-medium" style={{ color: i === step ? 'var(--color-text)' : 'var(--color-text-muted)' }}>{s}</span>
            {i < STEPS.length - 1 && <div className="h-px w-8 mx-1" style={{ background: 'var(--color-border)' }} />}
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-light)' }}>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          {step === 0 && 'Review your cart items before proceeding.'}
          {step === 1 && 'Enter your delivery address.'}
          {step === 2 && 'Review your order and confirm payment.'}
        </p>

        <div className="flex gap-3 mt-4">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="rounded-full border px-6 py-2.5 text-sm font-medium transition hover:opacity-75"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 rounded-full py-2.5 text-sm font-semibold text-white transition hover:opacity-85"
              style={{ background: 'var(--color-primary)' }}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={() => setPlaced(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white transition hover:opacity-85"
              style={{ background: 'var(--color-primary)' }}
            >
              <HiOutlineLockClosed size={16} /> Place Order
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
