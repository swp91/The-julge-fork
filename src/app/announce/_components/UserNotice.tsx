'use client';

import React from 'react';
import useMouseDrag from '@/app/_hooks/useMouseDrag';
import PostCard from '@/app/_components/PostCard/PostCard';
import { useFilteredNotices } from '@/app/_hooks/useFilteredNotices';
import Link from 'next/link';

const UserNotice = () => {
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
    useMouseDrag();

  const filters = {
    selectedOptions: [],
    amount: '',
    startDate: '',
    sortOption: '가까운순',
  };

  const filteredNotices = useFilteredNotices(filters);
  const displayNotices = filteredNotices.slice(0, 3);

  return (
    <section className='w-full h-[381px] md:h-[535px] bg-red-10 flex justify-center items-center py-10 md:py-[60px] px-3 md:px-8'>
      <div className='w-full max-w-screen-xl flex flex-col items-center'>
        <div className='w-full max-w-[521px] md:max-w-[964px] flex justify-start mb-4'>
          <h2 className='text-20b md:text-28b'>맞춤 공고</h2>
        </div>

        <div
          ref={scrollRef}
          className='w-full max-w-[521px] md:max-w-[964px] overflow-x-auto no-scrollbar cursor-grab'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}>
          <div className='flex gap-1 md:gap-[14px]'>
            {displayNotices.map((notice) => (
              <Link href={`/announce/detail/${notice.id}`} key={notice.id}>
                <PostCard
                  name={notice.shop.item.name}
                  address1={notice.shop.item.address1}
                  startsAt={notice.startsAt}
                  imageUrl={notice.shop.item.imageUrl}
                  originalHourlyPay={notice.shop.item.originalHourlyPay}
                  hourlyPay={notice.hourlyPay}
                  workhour={notice.workhour}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNotice;
