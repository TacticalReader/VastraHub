import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    signup(name, email, password);
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 pt-24" style={{ background: 'var(--color-bg)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md overflow-hidden rounded-2xl p-8 md:p-10 shadow-2xl"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Join VastraHub
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Create an account to track orders and save wishlists.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 block">
          <div>
            <label className="mb-1.5 block text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[color:var(--color-primary)] bg-transparent"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[color:var(--color-primary)] bg-transparent"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[color:var(--color-primary)] bg-transparent"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-xl py-3.5 text-sm font-bold shadow-md transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--color-primary)', color: '#fff' }}
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold transition-colors hover:text-[color:var(--color-primary)]" style={{ color: 'var(--color-text)' }}>
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
