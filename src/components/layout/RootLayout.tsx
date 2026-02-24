// src/components/layout/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

export default function RootLayout() {
  const { toggleOpen } = useSidebar();

  return (
    <div className="flex h-dvh bg-gray-50 dark:bg-gray-950">
      {/* Sidebar - visible on lg+, drawer on smaller */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-gray-950">
        {/* Mobile/Tablet Header with Hamburger */}
        <header className="lg:hidden h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 shadow-sm">
          <button
            onClick={toggleOpen}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <div className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {/* My Awesome App */}
          </div>
        </header>

        {/* Desktop header - hidden on mobile */}
        <header className="hidden lg:flex h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 items-center px-6 font-medium text-gray-900 dark:text-gray-100 shadow-sm">
          {/* <div className="text-lg font-semibold">My Awesome App</div> */}
          <div className="ml-auto flex items-center gap-4">
            <button className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Profile
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}