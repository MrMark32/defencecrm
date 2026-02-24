// src/pages/project/reports/Reports.tsx
import { useState } from 'react';
import { 
  BarChart3, Clock, Calendar, Download, Filter, 
  TrendingUp, DollarSign, CheckCircle2, AlertCircle, 
  PieChart, Users, MoreVertical, 
  ChevronDown
} from 'lucide-react';

// Mock stats (replace with real calculations/API)
const reportStats = {
  totalProjects: 12,
  completed: 4,
  overdue: 2,
  avgCompletionDays: 45,
  totalHours: '2,180h',
  budgetUsed: '78%',
};

// Mock report types
const reportTypes = [
  { id: 'status', label: 'Project Status', icon: BarChart3 },
  { id: 'time', label: 'Time Tracking', icon: Clock },
  { id: 'team', label: 'Team Performance', icon: Users },
  { id: 'milestones', label: 'Milestone Progress', icon: Calendar },
  { id: 'budget', label: 'Budget vs Actual', icon: DollarSign },
];

export default function Reports() {
  const [activeReport, setActiveReport] = useState('status');
  const [timeRange, setTimeRange] = useState('This Month');
  const [projectFilter, setProjectFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Reports
        </h1>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors">
            <Download size={18} className="mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {reportStats.totalProjects}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {reportStats.completed}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
          <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
            {reportStats.overdue}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Completion</p>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            {reportStats.avgCompletionDays} days
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Hours</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {reportStats.totalHours}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Budget Used</p>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">
            {reportStats.budgetUsed}
          </p>
        </div>
      </div>

      {/* Filters & Report Type Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row lg:items-end gap-5">
          {/* Time Range */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Time Range
            </label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
                <option>Custom</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Project Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Project
            </label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option value="All">All Projects</option>
                <option>CRM Siliconia Tech</option>
                <option>ELC Sales & Lettings</option>
                <option>Handa Realtor</option>
                {/* ... */}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Status
            </label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option value="All">All Status</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Overdue</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-1 overflow-x-auto">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveReport(type.id)}
            className={`
              flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap
              ${activeReport === type.id 
                ? 'bg-white dark:bg-gray-800 border border-b-0 border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
            `}
          >
            <type.icon size={18} />
            {type.label}
          </button>
        ))}
      </div>

      {/* Active Report Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        {activeReport === 'status' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Project Status Summary
            </h2>
            <div className="h-80 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <PieChart size={64} className="mx-auto mb-4 opacity-50" />
                <p>Project status pie / bar chart goes here</p>
                <p className="text-sm mt-2">(Use Recharts or ApexCharts)</p>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'time' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Time Tracking Breakdown
            </h2>
            <div className="h-80 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Clock size={64} className="mx-auto mb-4 opacity-50" />
                <p>Hours per project / per team member chart</p>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'team' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Team Performance
            </h2>
            <div className="h-80 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Users size={64} className="mx-auto mb-4 opacity-50" />
                <p>Team member hours / tasks completed chart</p>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'milestones' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Milestone Progress
            </h2>
            <div className="h-80 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Calendar size={64} className="mx-auto mb-4 opacity-50" />
                <p>Milestone completion Gantt / progress bars</p>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'budget' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Budget vs Actual Spending
            </h2>
            <div className="h-80 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <DollarSign size={64} className="mx-auto mb-4 opacity-50" />
                <p>Budget usage bar/line chart</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}