'use client';

import React, { useContext } from 'react';
import useMouseDrag from '@/app/_hooks/useMouseDrag';
import { NoticeContext } from '@/app/_context/NoticeContext';
import PostCard from '@/app/_components/PostCard/PostCard';

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const UserNotice = () => {
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
    useMouseDrag();
  const context = useContext(NoticeContext);

  if (!context) {
    return <p>로딩바 만들예정</p>;
  }

  const { notices } = context;

  const randomNotices = shuffleArray(notices).slice(
    0,
    Math.min(3, notices.length),
  );

  return (
    <section className='w-full h-[381px] md:h-[535px] bg-red-10 flex justify-center items-center py-10 md:py-[60px] px-3'>
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
          <div className='flex space-x-4'>
            {randomNotices.map((notice) => (
              <PostCard
                key={notice.id}
                name={notice.shop.item.name}
                address1={notice.shop.item.address1}
                startsAt={notice.startsAt}
                imageUrl={notice.shop.item.imageUrl}
                originalHourlyPay={notice.shop.item.originalHourlyPay}
                hourlyPay={notice.hourlyPay}
                workhour={notice.workhour}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNotice;
