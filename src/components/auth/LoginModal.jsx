import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    // Call the mock context login function
    const result = login(email, password);
    if (result.success) {
      setEmail('');
      setPassword('');
      onClose(); // Close modal upon successful UI login
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome Back">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-sm font-semibold text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Email</label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl pl-11 pr-4 py-3 border transition-shadow focus:outline-none focus:ring-2"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }}
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl pl-11 pr-4 py-3 border transition-shadow focus:outline-none focus:ring-2"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }}
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="py-3 mt-2 flex items-center justify-center gap-2" fullWidth>
          <FiLogIn size={18} /> Login
        </Button>
      </form>

      <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Don't have an account?{' '}
        <button onClick={onSwitchToSignup} className="font-bold hover:underline transition-all" style={{ color: 'var(--color-primary)' }}>
          Sign up here
        </button>
      </div>
    </Modal>
  );
}
