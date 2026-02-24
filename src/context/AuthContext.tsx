import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  department: 'HR' | 'IT' | 'Finance' | 'Production' | 'Sales' | null;
  role: 'admin' | 'manager' | 'employee';
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, department: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading user from localStorage / token
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock users (in real app → call your backend)
    const mockUsers = [
      { id: '1', name: 'Suyog Sutar', email: 'suyog@company.com', password: '123456', department: 'IT', role: 'employee' },
      { id: '2', name: 'Admin User', email: 'admin@company.com', password: 'admin123', department: null, role: 'admin' },
      { id: '3', name: 'HR Manager', email: 'hr@company.com', password: 'hr123', department: 'HR', role: 'manager' },
    ];

    const found = mockUsers.find(u => u.email === email && u.password === password);

    if (found) {
      const userData = { ...found, password: undefined }; // don't store password
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData as User);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, department: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // In real app → send to backend
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      department: department as any,
      role: 'employee',
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser as User);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};