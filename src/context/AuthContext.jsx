import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'VastraHub_user';

const FAKE_USER = {
  id: 'ui-demo-user',
  name: 'Guest User',
  email: 'demo@VastraHub.in',
  avatar: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage in sync
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback((email, _password) => {
    // UI-only auth — accepts any credentials
    // Note: This is a UI-only auth simulation for portfolio purposes
    const loggedInUser = { ...FAKE_USER, email, name: email.split('@')[0] };
    setUser(loggedInUser);
    return { success: true };
  }, []);

  const signup = useCallback((name, email, _password) => {
    // UI-only signup — no real backend
    const newUser = { ...FAKE_USER, name, email };
    setUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
