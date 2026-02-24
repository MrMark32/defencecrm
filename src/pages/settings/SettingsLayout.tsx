// src/pages/settings/SettingsLayout.tsx
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { UserPlus, UserCog, Mail, FileText } from 'lucide-react';
import ThemeToggle from '../../components/layout/ThemeToggle';

const settingsNav = [
  { to: "add-user", label: "Add User", icon: UserPlus },
  { to: "assign-role", label: "Assign Role", icon: UserCog },
  { to: "email-setting", label: "Email Setting", icon: Mail },
  { to: "email-template", label: "Email Template", icon: FileText },
];

// src/pages/settings/SettingsLayout.tsx
export default function SettingsLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row h-full bg-gray-50 dark:bg-gray-950 gap-2">
      {/* Sub-sidebar – full width on mobile, fixed on desktop */}
      <aside className="
        w-full md:w-64 bg-white dark:bg-gray-900 
        border-b md:border-r border-gray-200 dark:border-gray-800 
        flex flex-col md:shrink-0 shadow-sm
      ">
        <div className="
          h-14 md:h-16 flex items-center justify-between md:justify-start px-4 md:px-6 
          border-b border-gray-200 dark:border-gray-800
          font-semibold text-base md:text-lg
        ">
          <span>Settings</span>
          {/* Optional mobile collapse if needed */}
        </div>

        <nav className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-3 md:p-4 gap-2 md:gap-1.5">
          {settingsNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap
                ${isActive
                  ? 'bg-primary-100 text-primary-900 dark:bg-primary-900/40 dark:text-primary-100 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <item.icon size={18} className="flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}

          <div className="mt-4 md:mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 px-2 md:px-0">
            <ThemeToggle />
          </div>
        </nav>
      </aside>

      {/* Content – full width on mobile */}
      <div className="flex-1 overflow-auto p-0 sm:p-0 lg:p-0">
        {/* <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
          {settingsNav.find(item => location.pathname.includes(item.to))?.label || 'Settings'}
        </h1> */}
        <Outlet />
      </div>
    </div>
  );
}