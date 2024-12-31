"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { encryptData, decryptData } from "./util/authEncryption";

interface ApplicationContextType {
  appliedNotices: string[];
  addApplication: (noticeId: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appliedNotices, setAppliedNotices] = useState<string[]>([]);

  useEffect(() => {
    const restoreNotices = async () => {
      const encryptedData = localStorage.getItem("appliedNotices");
      if (encryptedData) {
        try {
          const decryptedData = await decryptData(encryptedData);
          setAppliedNotices(decryptedData as string[]);
        } catch (err) {
          console.error("복호화 실패:", err);
          setAppliedNotices([]);
        }
      }
    };

    restoreNotices();
  }, []);

  const addApplication = async (noticeId: string) => {
    const updatedNotices = [...appliedNotices, noticeId];
    setAppliedNotices(updatedNotices);

    try {
      const encryptedData = await encryptData(updatedNotices);
      localStorage.setItem("appliedNotices", encryptedData);
    } catch (err) {
      console.error("암호화 실패:", err);
    }
  };

  return (
    <ApplicationContext.Provider value={{ appliedNotices, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationProvider"
    );
  }
  return context;
};
