// src/pages/hrm/Employees.tsx
export default function Employees() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Employee Management</h2>
      <p className="text-gray-600 dark:text-gray-400">
        View, add, edit and manage all employees here.
      </p>
      {/* Table, search, add employee button, etc. will come here */}
    </div>
  );
}