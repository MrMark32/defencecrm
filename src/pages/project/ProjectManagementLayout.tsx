// src/pages/project/ProjectManagementLayout.tsx
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ListTodo, BarChart3, 
  Users, Calendar, FileText, Settings, 
  Menu, X 
} from 'lucide-react';

const projectNav = [
  { to: "overview",      label: "Overview",       icon: LayoutDashboard },
  { to: "projects",      label: "All Projects",   icon: ListTodo },
  { to: "tasks",         label: "Tasks",          icon: ListTodo },
  { to: "team",          label: "Team",           icon: Users },
  { to: "timesheet",      label: "Timesheet",       icon: Calendar },
  { to: "reports",       label: "Reports",        icon: BarChart3 },
  
];

export default function ProjectManagementLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get current page title dynamically
  const currentPage = projectNav.find(item => 
    location.pathname.includes(item.to)
  )?.label || 'Project Management';

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-950 gap-2">
      {/* Sidebar – drawer on mobile/tablet, fixed on desktop */}
      

      

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Toggle (visible only on < lg) */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 lg:px-6">
          {/* Hamburger - only on mobile/tablet */}
         

          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {currentPage}
          </h1>

          {/* Optional right-side actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* Add notifications, profile, etc. here if needed */}
          </div>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}