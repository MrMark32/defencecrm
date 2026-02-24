import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export default function ProtectedRoute({ allowedDepartments }: { allowedDepartments?: string[] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Department restriction (optional)
  if (allowedDepartments && user.department && !allowedDepartments.includes(user.department)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          You don't have permission to access this section.
          Your department: <strong>{user.department}</strong>
        </p>
      </div>
    );
  }

  return <Outlet />;
}