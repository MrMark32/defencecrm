// src/components/ThemeToggle.tsx
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';

    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.remove('light', 'dark');
      root.classList.add(prefersDark ? 'dark' : 'light');
      localStorage.removeItem('theme');
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggle = () => {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'
    );
  };

  const currentIcon = theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />;

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                 text-gray-700 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-colors w-full justify-start"
      aria-label="Toggle theme"
    >
      {currentIcon}
      <span>
        {theme === 'light' ? 'Light Mode' : theme === 'dark' ? 'Dark Mode' : 'System'}
      </span>
    </button>
  );
}