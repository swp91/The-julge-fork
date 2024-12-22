'use client';

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setGlobalToken } from '../_api/globaltoken';

interface AuthContextProps {
  token: string | null;
  user: User | null;
  loginSave: (data: { token: string; user: User }) => void;
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

  useEffect(() => {
    setGlobalToken(token);
  }, [token]);

  const loginSave = (data: { token: string; user: User }) => {
    const decoded = jwtDecode<DecodedToken>(data.token);

    setToken(data.token);
    // 디코딩 데이터 부분은 추후에 디코딩해보고 변경될수있습니다.
    setUser({
      ...data.user,
      id: decoded.userId,
      iat: decoded.iat,
    });
    console.log('디코딩정보', decoded);
  };

  //로그아웃 로직도 추후 변경될수있습니다 일단 임시입니다.
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginSave, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
