// src/pages/re-test/ReTestManagement.tsx
import { useState } from 'react';
import {
  Plus,
  Download,
  Search,
  ChevronDown,
  MoreVertical,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

// Mock data for re-test requests
const mockReTests = [
  {
    id: 1,
    code: 'RET-2026-001',
    related: 'QC-2026-002 (Fail)',
    product: 'Ballistic Helmet NIJ III - Serial #H789',
    reason: 'Crack in shell - re-test after material replacement',
    requestedDate: '15-02-2026',
    priority: 'High',
    assignedTo: 'Priya Patel',
    status: 'In Testing',
  },
  {
    id: 2,
    code: 'RET-2026-002',
    related: 'FIX-2026-001',
    product: 'Tactical Vest Level IIIA - Batch #45',
    reason: 'Velcro re-test after repair',
    requestedDate: '12-03-2026',
    priority: 'Medium',
    assignedTo: 'Rahul Sharma',
    status: 'Pending',
  },
  {
    id: 3,
    code: 'RET-2026-003',
    related: 'QC-2026-003 (Pending)',
    product: 'Night Vision Goggles Gen 2+',
    reason: 'Repeat IR illuminator test in low-light',
    requestedDate: '20-03-2026',
    priority: 'High',
    assignedTo: 'Sneha Joshi',
    status: 'Passed',
  },
  {
    id: 4,
    code: 'RET-2026-004',
    related: 'QC-2026-004',
    product: 'Combat Boots Size 9 - Lot #C2026',
    reason: 'Sole adhesion re-test after adhesive change',
    requestedDate: '08-03-2026',
    priority: 'Medium',
    assignedTo: 'Amit Kumar',
    status: 'Closed',
  },
  {
    id: 5,
    code: 'RET-2026-005',
    related: 'FIX-2026-005',
    product: 'Tactical Backpack 40L',
    reason: 'Zipper durability re-test',
    requestedDate: '01-03-2026',
    priority: 'Low',
    assignedTo: 'Suyog Sutar',
    status: 'Failed',
  },
];

export default function ReTestManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    related: '',
    product: '',
    reason: '',
    requestedDate: '',
    priority: 'Medium',
    assignedTo: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const filteredReTests = mockReTests.filter(reTest => {
    const matchesSearch =
      reTest.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reTest.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reTest.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || reTest.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || reTest.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.related.trim()) newErrors.related = 'Related QC/Fix is required';
    if (!formData.product.trim()) newErrors.product = 'Product/item is required';
    if (!formData.reason.trim()) newErrors.reason = 'Re-test reason is required';
    if (!formData.requestedDate) newErrors.requestedDate = 'Requested date is required';
    if (!formData.assignedTo.trim()) newErrors.assignedTo = 'Assigned person is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('New re-test request created:', formData);
    alert('Re-test request logged successfully!');
    setIsModalOpen(false);

    // Reset form
    setFormData({
      related: '',
      product: '',
      reason: '',
      requestedDate: '',
      priority: 'Medium',
      assignedTo: '',
      notes: '',
    });
    setErrors({});
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Passed':
      case 'Closed':
        return 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200';
      case 'In Testing':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200';
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200';
      case 'Failed':
        return 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Re-Test Management
        </h1>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
          >
            <Plus size={18} className="mr-2" />
            New Re-Test Request
          </button>

          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        {/* Search */}
        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search re-test code, product or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Status
          </label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="All">All Status</option>
              <option>Pending</option>
              <option>In Testing</option>
              <option>Passed</option>
              <option>Failed</option>
              <option>Closed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Priority
          </label>
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="All">All Priorities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Product/Category (placeholder) */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Product / Category
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="All">All</option>
              <option>Tactical Vest Level IIIA</option>
              <option>Ballistic Helmet NIJ III</option>
              <option>Night Vision Goggles Gen 2+</option>
              <option>Combat Boots</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Re-Test Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="min-w-[1400px]">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Re-Test Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Related QC/Fix
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product / Item
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requested Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pr-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReTests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No re-test requests found
                  </td>
                </tr>
              ) : (
                filteredReTests.map((reTest) => (
                  <tr key={reTest.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {reTest.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {reTest.related}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {reTest.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {reTest.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {reTest.requestedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          reTest.priority === 'Critical' || reTest.priority === 'High'
                            ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
                            : reTest.priority === 'Medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200'
                            : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
                        }`}
                      >
                        {reTest.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {reTest.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          getStatusStyle(reTest.status)
                        }`}
                      >
                        {reTest.status === 'In Testing' && <Clock size={14} />}
                        {reTest.status === 'Passed' && <CheckCircle size={14} />}
                        {reTest.status === 'Pending' && <AlertCircle size={14} />}
                        {reTest.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
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
            Showing 1 to {filteredReTests.length} of {filteredReTests.length} entries
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

      {/* New Re-Test Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Create New Re-Test Request
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Related QC / Fix <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="related"
                    value={formData.related}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.related ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g. QC-2026-002 (Fail)"
                  />
                  {errors.related && <p className="mt-1.5 text-sm text-red-600">{errors.related}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Product / Item <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.product ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="e.g. Ballistic Helmet NIJ III - Serial #H789"
                  />
                  {errors.product && <p className="mt-1.5 text-sm text-red-600">{errors.product}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Re-Test Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.reason ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Describe why re-test is needed (e.g. after repair, material change, failed test...)"
                  />
                  {errors.reason && <p className="mt-1.5 text-sm text-red-600">{errors.reason}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Requested Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="requestedDate"
                    value={formData.requestedDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                      errors.requestedDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.requestedDate && <p className="mt-1.5 text-sm text-red-600">{errors.requestedDate}</p>}
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
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
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
                    <option value="">Select tester / inspector</option>
                    <option>Rahul Sharma</option>
                    <option>Priya Patel</option>
                    <option>Sneha Joshi</option>
                    <option>Amit Kumar</option>
                    <option>Suyog Sutar</option>
                  </select>
                  {errors.assignedTo && <p className="mt-1.5 text-sm text-red-600">{errors.assignedTo}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Additional Notes / Test Parameters
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[100px]"
                  placeholder="Specific test conditions, pass/fail criteria, equipment used, previous results..."
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
                  Create Re-Test Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}