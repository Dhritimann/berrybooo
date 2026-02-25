import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  login: (phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('plant_haven_auth') === 'true';
  });
  const [phoneNumber, setPhoneNumber] = useState<string | null>(() => {
    return localStorage.getItem('plant_haven_phone');
  });

  const login = (phone: string) => {
    setIsAuthenticated(true);
    setPhoneNumber(phone);
    localStorage.setItem('plant_haven_auth', 'true');
    localStorage.setItem('plant_haven_phone', phone);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPhoneNumber(null);
    localStorage.removeItem('plant_haven_auth');
    localStorage.removeItem('plant_haven_phone');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, phoneNumber, login, logout }}>
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
