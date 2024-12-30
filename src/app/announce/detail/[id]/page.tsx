'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeContext } from '@/app/_context/NoticeContext';
import DetailPostCard from '@/app/_components/PostCard/DetailPostCard';
import PostCard from '@/app/_components/PostCard/PostCard';
import {
  saveToRecentNotices,
  getRecentNotices,
} from '@/app/_context/util/recentNotices';
import Link from 'next/link';
import { useAuth } from '@/app/_hooks/useAuth';
import Loading from '@/app/_components/Loding';

const Page = () => {
  const { id } = useParams();
  const noticeContext = useContext(NoticeContext);
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth() || {};

  useEffect(() => {
    if (noticeContext) {
      setIsLoading(false);
    }
  }, [noticeContext]);

  const { notices } = noticeContext || {};
  const currentNotice = notices?.find((notice) => notice.id === id);

  useEffect(() => {
    const recentData = getRecentNotices();
    setRecentNotices(recentData);
  }, []);

  useEffect(() => {
    if (currentNotice) {
      saveToRecentNotices(currentNotice);
    }
  }, [currentNotice]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='flex justify-center py-10'>
        {currentNotice && (
          <DetailPostCard
            name={currentNotice?.shop.item.name}
            noticeDescription={currentNotice.description}
            shopDescription={currentNotice.shop.item.description}
            hourlyPay={currentNotice.hourlyPay}
            imageUrl={currentNotice.shop.item.imageUrl}
            address1={currentNotice.shop.item.address1}
            originalHourlyPay={currentNotice.shop.item.originalHourlyPay}
            startsAt={currentNotice.startsAt}
            workhour={currentNotice.workhour}
            shopId={currentNotice.id}
            userId={user ? user.id : undefined}
          />
        )}
      </div>

      {/* 최근 본 공고 */}
      <section className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
        <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col items-center'>
          <div className='w-full flex flex-col md:flex-row justify-between mb-4 relative'>
            <h2 className='text-20b md:text-28b'>최근에 본 공고</h2>
          </div>

          <div className='grid grid-cols-2 lg:grid-cols-3 w-full gap-1 md:gap-[14px]'>
            {recentNotices.map((post) => (
              <Link href={`/announce/detail/${post.id}`} key={post.id}>
                <PostCard
                  name={post.shop.item.name}
                  startsAt={post.startsAt}
                  workhour={post.workhour.toString()}
                  address1={post.shop.item.address1}
                  imageUrl={post.shop.item.imageUrl}
                  hourlyPay={post.hourlyPay}
                  originalHourlyPay={post.shop.item.originalHourlyPay}
                  isPast={post.closed}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
