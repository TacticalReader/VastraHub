import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.HOME;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    navigate(from, { replace: true });
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
            Welcome Back
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Sign in to access your wishlist, cart, and profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 block">
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
            <label className="mb-1.5 flex items-center justify-between text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              <span>Password</span>
              <span className="cursor-pointer text-xs transition-colors hover:text-[color:var(--color-primary)] font-medium">
                Forgot password?
              </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Don't have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="font-semibold transition-colors hover:text-[color:var(--color-primary)]" style={{ color: 'var(--color-text)' }}>
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
