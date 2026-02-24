// src/pages/Settings.tsx
import { useTheme } from '../context/ThemeContext';  // if using theme toggle
import { Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Appearance</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Choose your theme preference
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Add more sections later */}
    </div>
  );
}