'use client';

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setGlobalToken } from '../_api/globaltoken';
import { encryptData, decryptData } from './util/authEncryption';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    const encryptedData = localStorage.getItem('julge');
    if (encryptedData) {
      decryptData(encryptedData).then((decrypted) => {
        const { token, user } = decrypted as { token: string; user: User };
        setToken(token);
        setUser(user);
        setGlobalToken(token);
      });
    }
  }, []);

  const loginSave = async (data: { token: string; user: User }) => {
    const decoded = jwtDecode<DecodedToken>(data.token);

    setToken(data.token);
    setUser({
      ...data.user,
      id: decoded.userId,
      iat: decoded.iat,
    });

    const encryptedData = await encryptData({
      token: data.token,
      user: {
        ...data.user,
        id: decoded.userId,
        iat: decoded.iat,
      },
    });

    localStorage.setItem('julge', encryptedData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('julge');
    localStorage.removeItem('Recently-view');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ token, user, loginSave, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
