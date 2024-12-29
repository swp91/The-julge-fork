'use client';

import React from 'react';
import useMouseDrag from '@/app/_hooks/useMouseDrag';
import PostCard from '@/app/_components/PostCard/PostCard';

const UserNotice = () => {
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
    useMouseDrag();

  return (
    <section className='w-full h-[381px] md:h-[535px] bg-red-10 flex justify-center items-center py-10 md:py-[60px] px-3'>
      <div className='w-full max-w-screen-xl flex flex-col items-center'>
        {/* 제목 */}
        <div className='w-full max-w-[521px] md:max-w-[964px] flex justify-start mb-4'>
          <h2 className='text-20b md:text-28b'>맞춤 공고</h2>
        </div>

        {/* 카드 리스트 */}
        <div
          ref={scrollRef}
          className='w-full max-w-[521px] md:max-w-[964px] overflow-x-auto no-scrollbar cursor-grab'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}>
          <div className='flex space-x-4'>
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNotice;
