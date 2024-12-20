'use client';

import React, { createContext, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
  role: 'employer' | 'employee';
}

interface User {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (data: { token: string; user: User }) => {
    const decoded = jwtDecode<DecodedToken>(data.token);

    setToken(data.token);
    // 디코딩 데이터 부분은 추후에 디코딩해보고 변경될수있습니다.
    setUser({
      ...data.user,
      id: decoded.userId,
      email: decoded.email,
      type: decoded.role,
    });
  };

  //로그아웃 로직도 추후 변경될수있습니다 일단 임시입니다.
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
