'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { getNotices } from '../_api/announce_api';
import { encryptData, decryptData } from './util/authEncryption';

interface NoticeContextProps {
  notices: Notice[];
  totalCount: number;
  refreshNotices: () => Promise<void>;
}

export const NoticeContext = createContext<NoticeContextProps | undefined>(
  undefined,
);

export const NoticeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pathname = usePathname();

  const fetchAllNotices = useCallback(async () => {
    let allNotices: Notice[] = [];
    let offset = 0;
    const limit = 100;
    let hasNext = true;

    while (hasNext) {
      try {
        const response = await getNotices(offset, limit);
        const data = response.data;

        allNotices = [
          ...allNotices,
          ...data.items.map((item: any) => item.item),
        ];
        hasNext = data.hasNext;
        offset += limit;
      } catch (error) {
        console.error('공고 데이터 가져오기 실패:', error);
        break;
      }
    }

    return allNotices;
  }, []);

  const refreshNotices = useCallback(async () => {
    try {
      const latestNotices = await fetchAllNotices();

      const encryptedData = await encryptData({
        notices: latestNotices,
        totalCount: latestNotices.length,
      });
      localStorage.setItem('notices', encryptedData);

      setNotices(latestNotices);
      setTotalCount(latestNotices.length);
    } catch (error) {
      console.error('동기화 실패:', error);
    }
  }, [fetchAllNotices]);

  useEffect(() => {
    const encryptedData = localStorage.getItem('notices');

    if (encryptedData) {
      decryptData(encryptedData).then((decrypted) => {
        const { notices, totalCount } = decrypted as {
          notices: Notice[];
          totalCount: number;
        };
        setNotices(notices);
        setTotalCount(totalCount);
      });

      refreshNotices();
    } else if (pathname === '/') {
      refreshNotices();
    }
  }, [pathname, refreshNotices]);

  return (
    <NoticeContext.Provider value={{ notices, totalCount, refreshNotices }}>
      {children}
    </NoticeContext.Provider>
  );
};
