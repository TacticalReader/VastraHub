import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { validateSignup } from '../../utils/validateForm';
import { FiUser, FiMail, FiLock, FiCheckCircle, FiUserPlus } from 'react-icons/fi';

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return { width: '0%', color: 'transparent' };
    if (pass.length < 6) return { width: '33%', color: '#ef4444' }; // weak (red)
    if (pass.length < 10) return { width: '66%', color: '#eab308' }; // medium (yellow)
    return { width: '100%', color: '#22c55e' }; // strong (green)
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const validation = validateSignup(formData.name, formData.email, formData.password, formData.confirmPassword);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Call the mock context signup function
    const result = signup(formData.name, formData.email, formData.password);
    if (result.success) {
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      onClose(); // Close modal upon successful UI signup
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Name</label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} size={18} />
            <input
              type="text" name="name"
              value={formData.name} onChange={handleChange}
              className={`w-full rounded-xl pl-11 pr-4 py-2.5 border transition-shadow focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : ''}`}
              style={{ background: 'var(--color-bg-card)', borderColor: errors.name ? '#ef4444' : 'var(--color-border-light)' }}
              placeholder="John Doe"
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Email</label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} size={18} />
            <input
              type="email" name="email"
              value={formData.email} onChange={handleChange}
              className={`w-full rounded-xl pl-11 pr-4 py-2.5 border transition-shadow focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : ''}`}
              style={{ background: 'var(--color-bg-card)', borderColor: errors.email ? '#ef4444' : 'var(--color-border-light)' }}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} size={18} />
            <input
              type="password" name="password"
              value={formData.password} onChange={handleChange}
              className={`w-full rounded-xl pl-11 pr-4 py-2.5 border transition-shadow focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : ''}`}
              style={{ background: 'var(--color-bg-card)', borderColor: errors.password ? '#ef4444' : 'var(--color-border-light)' }}
              placeholder="••••••••"
            />
          </div>
          {/* Password Strength Visualizer */}
          <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1 overflow-hidden" style={{ background: 'var(--color-border)' }}>
            <div className="h-full transition-all duration-300 rounded-full" style={{ width: strength.width, background: strength.color }} />
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-0.5">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Confirm Password</label>
          <div className="relative">
            <FiCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} size={18} />
            <input
              type="password" name="confirmPassword"
              value={formData.confirmPassword} onChange={handleChange}
              className={`w-full rounded-xl pl-11 pr-4 py-2.5 border transition-shadow focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              style={{ background: 'var(--color-bg-card)', borderColor: errors.confirmPassword ? '#ef4444' : 'var(--color-border-light)' }}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-0.5">{errors.confirmPassword}</p>}
        </div>

        <Button type="submit" variant="primary" className="py-3 mt-2 flex items-center justify-center gap-2" fullWidth>
          <FiUserPlus size={18} /> Sign Up
        </Button>
      </form>

      <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-bold hover:underline transition-all" style={{ color: 'var(--color-primary)' }}>
          Log in
        </button>
      </div>
    </Modal>
  );
}
