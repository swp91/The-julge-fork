import React from 'react';
import { AuthProvider } from './AuthContext';
import { NoticeProvider } from './NoticeContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <NoticeProvider>{children}</NoticeProvider>
    </AuthProvider>
  );
};
