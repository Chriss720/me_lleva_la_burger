import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  id_cliente?: number;
  email: string;
  role: string; // 'gerente', 'encargado', 'empleado', 'cajero'
  cargo?: string;
  nombre?: string;
  apellido?: string;
  nombre_cliente?: string;
  apellido_cliente?: string;
  correo_cliente?: string;
  telefono_cliente?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = React.useCallback((newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('clienteActual', JSON.stringify(newUser)); // Also set for authService
    setToken(newToken);
    setUser(newUser);
  }, []);

  const updateUser = React.useCallback((updatedUser: User) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    // Also update clienteActual for compatibility with authService
    localStorage.setItem('clienteActual', JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Limpiar el flag de bienvenida para que se muestre en el próximo login
    if (user) {
      sessionStorage.removeItem(`welcomeShown_${user.id}`);
    }
    setToken(null);
    setUser(null);
    // Opcional: llamar al endpoint de logout del backend si es necesario
    // client.post('/auth/logout').catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
