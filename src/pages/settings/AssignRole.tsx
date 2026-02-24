// src/pages/settings/AssignRole.tsx
import { useState } from 'react';
import Select from 'react-select';
import { Search, Check, X, User } from 'lucide-react';

// Mock data
const mockUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@company.com', employeeId: 'EMP001', roles: ['Employee'] },
  { id: 2, name: 'Priya Patel', email: 'priya.patel@company.com', employeeId: 'EMP002', roles: ['Manager', 'HR'] },
  { id: 3, name: 'Amit Kumar', email: 'amit.kumar@company.com', employeeId: 'EMP003', roles: ['Employee'] },
  { id: 4, name: 'Sneha Joshi', email: 'sneha.joshi@company.com', employeeId: 'EMP004', roles: ['HR'] },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@company.com', employeeId: 'EMP005', roles: ['Viewer'] },
];

const availableRoles = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'HR', label: 'HR' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Viewer', label: 'Viewer' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Support', label: 'Support' },
];

export default function AssignRole() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [bulkRoles, setBulkRoles] = useState<any[]>([]); // for bulk multi-select

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleRolesChange = (userId: number, selectedOptions: any) => {
    const newRoles = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, roles: newRoles } : user
      )
    );
  };

  const handleBulkAssign = () => {
    if (bulkRoles.length === 0) return alert('Please select at least one role');

    const newRoleValues = bulkRoles.map((r) => r.value);

    setUsers((prev) =>
      prev.map((user) =>
        selectedUsers.includes(user.id)
          ? { ...user, roles: [...new Set([...user.roles, ...newRoleValues])] } // append without duplicates
          : user
      )
    );

    setSelectedUsers([]);
    setBulkRoles([]);
    alert(`Selected roles assigned to ${selectedUsers.length} users`);
  };

  const isAllSelected = selectedUsers.length === filteredUsers.length && filteredUsers.length > 0;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Assign Roles
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Users can have multiple roles. Select one or more roles per user.
        </p>
      </div>

      {/* Search + Bulk Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>

        {selectedUsers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="w-full sm:w-64">
              <Select
                isMulti
                options={availableRoles}
                value={bulkRoles}
                onChange={setBulkRoles}
                placeholder="Select roles to assign..."
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'var(--tw-bg-opacity) white',
                    borderColor: '#d1d5db',
                    borderRadius: '0.5rem',
                    boxShadow: 'none',
                    '&:hover': { borderColor: '#3b82f6' },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
                    color: state.isSelected ? 'white' : '#1f2937',
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#3b82f6',
                    primary75: '#60a5fa',
                    primary50: '#93c5fd',
                    primary25: '#dbeafe',
                  },
                })}
              />
            </div>

            <button
              onClick={handleBulkAssign}
              disabled={bulkRoles.length === 0}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                bulkRoles.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              <Check size={16} />
              Assign to {selectedUsers.length}
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Roles
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assign Roles
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <User size={20} className="text-gray-500 dark:text-gray-300" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                          >
                            {role}
                          </span>
                        ))}
                        {user.roles.length === 0 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 italic">No roles</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Select
                        isMulti
                        options={availableRoles}
                        value={availableRoles.filter((opt) => user.roles.includes(opt.value))}
                        onChange={(selected) => handleRolesChange(user.id, selected)}
                        placeholder="Select roles..."
                        className="react-select-container text-sm"
                        classNamePrefix="react-select"
                        menuPortalTarget={document.body}
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: '36px',
                            borderColor: '#d1d5db',
                            borderRadius: '0.5rem',
                            boxShadow: 'none',
                            backgroundColor: 'white',
                            '&:hover': { borderColor: '#3b82f6' },
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 9999,
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
                            color: state.isSelected ? 'white' : '#1f2937',
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: '#dbeafe',
                            borderRadius: '9999px',
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: '#1e40af',
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: '#1e40af',
                            ':hover': { backgroundColor: '#bfdbfe', color: '#1e3a8a' },
                          }),
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
          <Check size={16} />
          Save All Changes
        </button>
      </div>
    </div>
  );
}