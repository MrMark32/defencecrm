// src/pages/hrm/HrmLayout.tsx
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  Users, Clock, CalendarDays, DollarSign, 
  UserPlus, BarChart3, Settings, Menu, X 
} from 'lucide-react';

const hrmNav = [
 
  { to: "attendance",   label: "Attendance",    icon: Clock },
  { to: "leave",        label: "Leave",         icon: CalendarDays },
  
];

export default function HrmLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get current page title
  const currentPage = hrmNav.find(item => 
    location.pathname.includes(item.to)
  )?.label || 'Attendance';

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-950 gap-2">
      {/* Mobile/Tablet Sidebar Drawer */}
      

      {/* Backdrop - only on mobile/tablet when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HRM Header with Toggle (visible only on < lg) */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 lg:px-6">
          {/* Hamburger - only on mobile/tablet */}
          

          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {currentPage}
          </h1>

          {/* Optional: right-side actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* You can add profile, notifications, etc. here */}
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}