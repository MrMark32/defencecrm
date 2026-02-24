// src/pages/project/tasks/TaskManagement.tsx
import { useState } from 'react';
import {
  Plus,
  Download,
  Search,
  ChevronDown,
  Calendar,
  MoreVertical,
  X,
} from 'lucide-react';

// Mock data for tasks (now mutable via state)
const initialTasks = [
  {
    id: 1,
    code: 'T001',
    task: 'Design CRM Dashboard UI',
    completedOn: '14-02-2026',
    startDate: '01-02-2026',
    dueDate: '20-02-2026',
    estimatedTime: '40h',
    hoursLogged: '28h',
    assignedTo: 'Suyog Sutar',
    status: 'In Progress',
  },
  {
    id: 2,
    code: 'T002',
    task: 'Implement Authentication Flow',
    completedOn: '--',
    startDate: '05-02-2026',
    dueDate: '15-03-2026',
    estimatedTime: '60h',
    hoursLogged: '12h',
    assignedTo: 'Amit Kumar',
    status: 'To Do',
  },
  {
    id: 3,
    code: 'T003',
    task: 'API Integration - User Module',
    completedOn: '--',
    startDate: '10-02-2026',
    dueDate: '28-02-2026',
    estimatedTime: '35h',
    hoursLogged: '0h',
    assignedTo: 'Sneha Joshi',
    status: 'Not Started',
  },
  {
    id: 4,
    code: 'T004',
    task: 'Testing & QA - Mobile View',
    completedOn: '10-02-2026',
    startDate: '01-02-2026',
    dueDate: '10-02-2026',
    estimatedTime: '20h',
    hoursLogged: '20h',
    assignedTo: 'Priya Patel',
    status: 'Completed',
  },
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks); // ← now mutable
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    taskName: '',
    project: '',
    assignedTo: '',
    startDate: '',
    dueDate: '',
    estimatedTime: '',
    priority: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const filteredTasks = tasks.filter(
    (task) =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status options (same order as your earlier request)
  const statusOptions = [
    'Not Started',
    'To Do',
    'Doing',
    'In Progress',
    'Waiting Approval',
    'Completed',
  ];

  // Status color styles (same as your badge colors)
  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Progress':
      case 'Doing':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200';
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200';
      case 'To Do':
      case 'Not Started':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      case 'Waiting Approval':
        return 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  // Update task status function
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Optional: Here you can add API call to save the change
    // Example:
    // await api.updateTaskStatus(taskId, newStatus);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskName.trim()) newErrors.taskName = 'Required';
    if (!formData.project) newErrors.project = 'Required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Required';
    if (!formData.startDate) newErrors.startDate = 'Required';
    if (!formData.dueDate) newErrors.dueDate = 'Required';
    if (!formData.estimatedTime.trim()) newErrors.estimatedTime = 'Required';
    if (!formData.priority) newErrors.priority = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Submitted new task:', formData);
    setIsModalOpen(false);
    // Reset form after submit if needed
    setFormData({
      taskName: '',
      project: '',
      assignedTo: '',
      startDate: '',
      dueDate: '',
      estimatedTime: '',
      priority: '',
      description: '',
    });
  };

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Task Management
        </h1>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
          >
            <Plus size={18} className="mr-2" />
            New Task
          </button>

          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search task or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Scrollable TABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-900 px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700 min-w-[220px]"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="sticky left-[220px] z-10 bg-gray-50 dark:bg-gray-900 px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700 min-w-[300px]"
                >
                  Task
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[160px]"
                >
                  Completed On
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[160px]"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[160px]"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]"
                >
                  Est. Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]"
                >
                  Hours Logged
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]"
                >
                  Assigned To
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[160px]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[100px]"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                    No tasks found
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    {/* Code – sticky */}
                    <td className="sticky left-0 z-10 bg-white dark:bg-gray-800 px-6 py-5 border-r border-gray-200 dark:border-gray-700 min-w-[220px]">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {task.code}
                      </div>
                    </td>

                    {/* Task – sticky next to code */}
                    <td className="sticky left-[220px] z-10 bg-white dark:bg-gray-800 px-6 py-5 border-r border-gray-200 dark:border-gray-700 min-w-[300px]">
                      <div className="text-gray-900 dark:text-gray-100">
                        {task.task}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {task.completedOn}
                    </td>

                    <td className="px-6 py-5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {task.startDate}
                    </td>

                    <td className="px-6 py-5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {task.dueDate}
                    </td>

                    <td className="px-6 py-5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {task.estimatedTime}
                    </td>

                    <td className="px-6 py-5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {task.hoursLogged}
                    </td>

                    <td className="px-6 py-5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {task.assignedTo}
                    </td>

                    {/* Status Dropdown – clickable & editable */}
                    <td className="px-6 py-2 whitespace-nowrap">
                      <select
                        value={task.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setTasks(prevTasks =>
                            prevTasks.map(t =>
                              t.id === task.id ? { ...t, status: newStatus } : t
                            )
                          );
                          // Optional: Call API here to save change
                          // updateTaskStatusAPI(task.id, newStatus);
                        }}
                        className={`w-full px-3 py-1 rounded-full text-xs font-medium cursor-pointer border-none focus:ring-2 focus:ring-blue-500 focus:outline-none ${getStatusStyle(task.status)}`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-5 text-right whitespace-nowrap">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          Show
          <select className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          entries
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-4">
          <div className="hidden sm:block">
            Showing 1 to {filteredTasks.length} of {filteredTasks.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-3 py-1.5 bg-blue-600 text-white rounded min-w-[2rem] text-center">
              1
            </span>
            <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Create New Task
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Task Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="taskName"
                    value={formData.taskName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.taskName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g. Design CRM Dashboard UI"
                  />
                  {errors.taskName && <p className="mt-1.5 text-sm text-red-600">{errors.taskName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Project <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.project ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select project</option>
                    <option value="CRM Siliconia Tech">CRM Siliconia Tech</option>
                    <option value="ELC Sales & Lettings">ELC Sales & Lettings</option>
                    <option value="Handa Realtor">Handa Realtor</option>
                    {/* Add more */}
                  </select>
                  {errors.project && <p className="mt-1.5 text-sm text-red-600">{errors.project}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Assigned To <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.assignedTo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select assignee</option>
                    <option value="Suyog Sutar">Suyog Sutar</option>
                    <option value="Amit Kumar">Amit Kumar</option>
                    <option value="Sneha Joshi">Sneha Joshi</option>
                  </select>
                  {errors.assignedTo && <p className="mt-1.5 text-sm text-red-600">{errors.assignedTo}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.startDate && <p className="mt-1.5 text-sm text-red-600">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.dueDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.dueDate && <p className="mt-1.5 text-sm text-red-600">{errors.dueDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Estimated Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.estimatedTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g. 40h"
                  />
                  {errors.estimatedTime && <p className="mt-1.5 text-sm text-red-600">{errors.estimatedTime}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.priority ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.priority && <p className="mt-1.5 text-sm text-red-600">{errors.priority}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Description / Notes
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[100px] dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                  placeholder="Describe the task details..."
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}