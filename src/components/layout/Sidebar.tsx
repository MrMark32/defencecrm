// src/components/layout/Sidebar.tsx
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tags,
  FolderKanban,
  Package,
  Warehouse,
  ListTodo,
  Factory,
  CheckCircle,
  Wrench,
  RefreshCw,
  Truck,
  BarChart3,
  ChevronDown,
  Clock,
  Calendar,
} from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

interface NavItem {
  to?: string;
  label: string;
  icon: any;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },

  {
    label: 'HRM',
    icon: Users,
    to: '/hrm',
    subItems: [
      { label: 'Attendance', to: '/hrm/attendance', icon: Clock },
      { label: 'Leave', to: '/hrm/leave', icon: Calendar },
    ],
  },

  {
    label: 'Project',
    icon: FolderKanban,
    to: '/projects/overview',
    subItems: [
      { label: 'Overview', to: '/projects/overview', icon: LayoutDashboard },
      { label: 'All Projects', to: '/projects/projects', icon: ListTodo },
      { label: 'Tasks', to: '/projects/tasks', icon: ListTodo },
      { label: 'Team', to: '/projects/team', icon: Users },
      { label: 'Timesheet', to: '/projects/timesheet', icon: Clock },
      { label: 'Reports', to: '/projects/reports', icon: BarChart3 },
    ],
  },
  

  { to: '/product', label: 'Product', icon: Package },
  { to: '/inventory', label: 'Inventory', icon: Warehouse },
  { to: '/production', label: 'Production', icon: Factory },
  { to: '/quality', label: 'Quality', icon: CheckCircle },
  { to: '/fix', label: 'Fix', icon: Wrench },
  { to: '/re-test', label: 'Re-Test', icon: RefreshCw },
  { to: '/dispatch', label: 'Dispatch', icon: Truck },

  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/tags-fields', label: 'Tags & Fields', icon: Tags },
];

export default function Sidebar() {
  const { isOpen, isCollapsed, toggleCollapsed, close } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  // Single state: which section is open? null = all closed
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const isProjectSectionActive = location.pathname.startsWith('/projects/');
  const isHrmSectionActive     = location.pathname.startsWith('/hrm/');

  const handleMainClick = (item: NavItem) => {
    if (!item.to) return;

    navigate(item.to);

    // If clicking already open section → close it, else open it
    setOpenSection((prev) => (prev === item.label ? null : item.label));

    if (isMobile) close();
  };

  const handleChevronClick = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    setOpenSection((prev) => (prev === label ? null : label));
  };

  const isSectionOpen = (label: string) => openSection === label;

  const baseNavClasses = `
    group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium
    transition-all duration-200
  `;

  const activeNavClasses = 'bg-primary-700/70 text-white shadow-sm';
  const inactiveNavClasses = 'text-white/80 hover:bg-primary-700/40 hover:text-white';

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:sticky lg:top-0 z-40 h-dvh
          flex flex-col
          bg-gradient-to-b from-primary-900 to-primary-950
          border-r border-primary-800/40
          text-white
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed && !isMobile ? 'lg:w-20' : 'lg:w-72'}
          overflow-hidden
        `}
      >
        {/* Header – unchanged */}
        <div className="flex h-16 items-center justify-between border-b border-primary-800/50 px-5 shrink-0">
          <span
            className={`
              text-lg font-semibold tracking-tight transition-all duration-300
              ${isCollapsed && !isMobile ? 'opacity-0 w-0' : 'opacity-100'}
            `}
          >
            Defence CRM
          </span>

          <button
            onClick={toggleCollapsed}
            className={`
              hidden lg:flex items-center justify-center w-8 h-8
              rounded-full bg-primary-800/50 hover:bg-primary-700/70
              text-white/80 hover:text-white transition-colors
            `}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-primary-950">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const hasSubmenu = !!item.subItems;
              const Icon = item.icon;

              let isSectionActive = false;
              if (item.label === 'Project') isSectionActive = isProjectSectionActive;
              if (item.label === 'HRM')     isSectionActive = isHrmSectionActive;

              const isOpen = isSectionOpen(item.label);

              return (
                <li key={item.to || item.label}>
                  {hasSubmenu ? (
                    <>
                      <button
                        onClick={() => handleMainClick(item)}
                        className={`
                          ${baseNavClasses} w-full justify-between
                          ${isCollapsed && !isMobile ? 'justify-center px-0' : ''}
                          ${isSectionActive ? activeNavClasses : inactiveNavClasses}
                        `}
                        title={isCollapsed && !isMobile ? item.label : undefined}
                      >
                        <div className={`flex items-center gap-3 ${isCollapsed && !isMobile ? 'justify-center w-full' : ''}`}>
                          <Icon
                            size={isCollapsed && !isMobile ? 24 : 20}
                            strokeWidth={1.8}
                            className="shrink-0 group-hover:scale-110 transition-transform"
                          />
                          <span
                            className={`transition-all duration-300 ${
                              isCollapsed && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>

                        {!isCollapsed && (
                          <button
                            onClick={(e) => handleChevronClick(e, item.label)}
                            className={`
                              rounded p-1 transition-colors
                              ${isSectionActive ? 'hover:bg-primary-600/70' : 'hover:bg-primary-700/60'}
                            `}
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        )}
                      </button>

                      {isOpen && !isCollapsed && (
                        <ul className="mt-1 space-y-1 pl-11">
                          {item.subItems!.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <li key={sub.to}>
                                <NavLink
                                  to={sub.to!}
                                  onClick={() => isMobile && close()}
                                  className={({ isActive }) =>
                                    `${baseNavClasses} ${isActive ? activeNavClasses : inactiveNavClasses}`
                                  }
                                >
                                  <SubIcon size={18} strokeWidth={1.9} className="shrink-0" />
                                  {sub.label}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.to!}
                      onClick={() => isMobile && close()}
                      className={({ isActive }) =>
                        `${baseNavClasses} ${isCollapsed && !isMobile ? 'justify-center px-0' : ''} ${
                          isActive ? activeNavClasses : inactiveNavClasses
                        }`
                      }
                      title={isCollapsed && !isMobile ? item.label : undefined}
                    >
                      <div className={`flex items-center gap-3 ${isCollapsed && !isMobile ? 'justify-center w-full' : ''}`}>
                        <item.icon
                          size={isCollapsed && !isMobile ? 24 : 20}
                          strokeWidth={1.8}
                          className="shrink-0 group-hover:scale-110 transition-transform"
                        />
                        <span
                          className={`transition-all duration-300 ${
                            isCollapsed && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sign Out – unchanged */}
        <div className="mt-auto border-t border-primary-800/50 p-4 shrink-0">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to sign out?')) {
                navigate('/login');
              }
            }}
            className={`
              group flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium
              text-red-300 hover:bg-red-950/40 hover:text-red-100
              transition-all duration-200
              ${isCollapsed && !isMobile ? 'justify-center px-0' : ''}
            `}
            title={isCollapsed && !isMobile ? 'Sign out' : undefined}
          >
            <div className={`flex items-center gap-3 ${isCollapsed && !isMobile ? 'justify-center w-full' : ''}`}>
              <LogOut
                size={isCollapsed && !isMobile ? 24 : 20}
                strokeWidth={1.8}
                className="shrink-0 group-hover:scale-110 transition-transform"
              />
              <span
                className={`transition-all duration-300 ${
                  isCollapsed && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`}
              >
                Sign out
              </span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}