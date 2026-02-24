// src/pages/project/overview/Overview.tsx
import { useState } from 'react';
import { 
  BarChart3, Clock, CheckCircle2, AlertCircle, 
  Calendar, Users, TrendingUp, MoreVertical, 
  Plus
} from 'lucide-react';

// Mock stats
const dashboardStats = {
  totalProjects: 12,
  active: 7,
  completed: 3,
  overdue: 2,
  totalHours: '1,240h',
  avgProgress: 68,
};

// Mock recent activity
const recentActivity = [
  { id: 1, user: 'Suyog Sutar', action: 'logged 4.5h on', task: 'CRM Dashboard UI', time: '2 hours ago' },
  { id: 2, user: 'Amit Kumar', action: 'completed', task: 'API User Auth', time: '5 hours ago' },
  { id: 3, user: 'Sneha Joshi', action: 'updated status to', task: 'Mobile Testing', time: 'Yesterday' },
  { id: 4, user: 'Priya Patel', action: 'raised issue in', task: 'Payment Integration', time: '2 days ago' },
];

// Mock upcoming deadlines
const upcomingDeadlines = [
  { project: 'CRM Siliconia Tech', task: 'Final UI Delivery', due: '20-02-2026', status: 'In Progress' },
  { project: 'ELC Sales & Lettings', task: 'Beta Testing Phase', due: '25-02-2026', status: 'To Do' },
  { project: 'Handa Realtor', task: 'Frontend Deployment', due: '28-02-2026', status: 'In Progress' },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Project Overview
        </h1>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors">
            <Plus size={18} className="mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {dashboardStats.totalProjects}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {dashboardStats.active}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {dashboardStats.completed}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
          <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
            {dashboardStats.overdue}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Hours</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {dashboardStats.totalHours}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Progress</p>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            {dashboardStats.avgProgress}%
          </p>
        </div>
      </div>

      {/* Two-column layout: Progress Overview + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Progress Overview
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <MoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BarChart3 size={48} className="mx-auto mb-3 opacity-50" />
              <p>Progress donut chart / breakdown goes here</p>
              <p className="text-sm mt-2">(Use Recharts or ApexCharts)</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">On Track</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">5</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">At Risk</p>
              <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">3</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delayed</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">2</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">3</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Activity
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium flex-shrink-0">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium">{activity.task}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Upcoming Deadlines
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {upcomingDeadlines.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {item.task}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {item.due}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}