import React from "react";
import { AuthProvider } from "./AuthContext";
import { NoticeProvider } from "./NoticeContext";
import { ApplicationProvider } from "./ApplicationContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <NoticeProvider>
        <ApplicationProvider>{children}</ApplicationProvider>
      </NoticeProvider>
    </AuthProvider>
  );
};
