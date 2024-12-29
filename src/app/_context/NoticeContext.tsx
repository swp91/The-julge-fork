'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation'; // usePathname 사용
import { getNotices } from '../_api/announce_api';

interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: {
      id: string;
      name: string;
      category: string;
      address1: string;
      address2: string;
      description: string;
      imageUrl: string;
      originalHourlyPay: number;
    };
    href: string;
  };
}

interface NoticeContextProps {
  notices: Notice[];
  totalCount: number;
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

  console.log(notices);

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

    setNotices(allNotices);
    setTotalCount(allNotices.length);
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      fetchAllNotices();
    }
  }, [pathname, fetchAllNotices]);

  return (
    <NoticeContext.Provider value={{ notices, totalCount }}>
      {children}
    </NoticeContext.Provider>
  );
};
