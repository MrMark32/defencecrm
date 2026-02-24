// src/pages/dashboard/Dashboard.tsx
import { Link } from 'react-router-dom';
import {
  Users,
  FolderKanban,
  Package,
  Warehouse,
  Factory,
  CheckCircle,
  Wrench,
  RefreshCw,
  Truck,
  AlertTriangle,
  Clock,
  TrendingUp,
  BarChart3,
  ListTodo,
  Plus,
} from 'lucide-react';

// Mock stats (replace with real data later)
const stats = {
  totalUsers: 1482,
  activeProjects: 17,
  pendingTasks: 42,
  lowStockItems: 9,
  productionOrders: 23,
  qualityChecksPending: 6,
  openFixRequests: 11,
  dispatchesInTransit: 5,
};

// Mock recent activity
const recentActivity = [
  { id: 1, user: 'Suyog Sutar', action: 'created production order', module: 'PROD-2026-007', time: '1 hour ago' },
  { id: 2, user: 'Priya Patel', action: 'passed quality inspection', module: 'QC-2026-008', time: '3 hours ago' },
  { id: 3, user: 'Rahul Sharma', action: 'dispatched 450 units', module: 'DSP-2026-009', time: 'Yesterday' },
  { id: 4, user: 'Sneha Joshi', action: 'logged re-test request', module: 'RET-2026-004', time: '2 days ago' },
  { id: 5, user: 'Amit Kumar', action: 'updated inventory count', module: 'INV-010', time: '3 days ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors">
          <Plus size={18} className="mr-2" />
          Quick Action
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm text-center">
          <Users size={28} className="mx-auto mb-3 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {stats.totalUsers.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm text-center">
          <FolderKanban size={28} className="mx-auto mb-3 text-purple-600 dark:text-purple-400" />
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {stats.activeProjects}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm text-center">
          <ListTodo size={28} className="mx-auto mb-3 text-amber-600 dark:text-amber-400" />
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Tasks</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {stats.pendingTasks}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm text-center">
          <AlertTriangle size={28} className="mx-auto mb-3 text-red-600 dark:text-red-400" />
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Alerts</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {stats.lowStockItems}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm text-center">
          <Factory size={28} className="mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Production Orders</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {stats.productionOrders}
          </p>
        </div>
      </div>

      {/* Two-column layout: Recent Activity + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Activity
            </h2>
            <Link to="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-5">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium flex-shrink-0">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium text-blue-600 dark:text-blue-400">{activity.module}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
            Quick Access
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { to: '/projects/overview', label: 'Projects', icon: FolderKanban, color: 'purple' },
              { to: '/product', label: 'Products', icon: Package, color: 'indigo' },
              { to: '/inventory', label: 'Inventory', icon: Warehouse, color: 'amber' },
              { to: '/production', label: 'Production', icon: Factory, color: 'teal' },
              { to: '/quality', label: 'Quality', icon: CheckCircle, color: 'green' },
              { to: '/fix', label: 'Fix', icon: Wrench, color: 'orange' },
              { to: '/re-test', label: 'Re-Test', icon: RefreshCw, color: 'cyan' },
              { to: '/dispatch', label: 'Dispatch', icon: Truck, color: 'rose' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 group"
              >
                <link.icon size={32} className={`text-${link.color}-600 dark:text-${link.color}-400 mb-3 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trends / Charts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Business Trends
          </h2>
          <Link to="/reports" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            View Reports <BarChart3 size={16} />
          </Link>
        </div>

        <div className="h-80 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <TrendingUp size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Production vs Dispatch Trend</p>
            <p className="text-sm mt-2">Chart placeholder – integrate Recharts or ApexCharts here</p>
          </div>
        </div>
      </div>
    </div>
  );
}