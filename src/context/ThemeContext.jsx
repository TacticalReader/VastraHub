import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'VastraHub_theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch { /* ignore */ }
    // Respect OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Sync across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
};
