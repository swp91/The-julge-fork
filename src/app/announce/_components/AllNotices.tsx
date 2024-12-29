'use client';

import React, { useContext, useState } from 'react';
import PostCard from '@/app/_components/PostCard/PostCard';
import Pagination from '@/app/_components/Pagination';
import { NoticeContext } from '@/app/_context/NoticeContext';

const AllNotices = () => {
  const context = useContext(NoticeContext);
  const [currentPage, setCurrentPage] = useState(1);

  if (!context) {
    return <p>로딩바만들예정</p>;
  }

  const { notices } = context;

  const postsPerPage = 6;
  const totalPages = Math.ceil(notices.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = notices.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
      <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col items-center'>
        <div className='w-full flex justify-between mb-4'>
          <h2 className='text-20b md:text-28b'>전체 공고</h2>
          <button className='text-blue-500 hover:underline'>전체 보기</button>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-3 w-full gap-1 md:gap-[14px]'>
          {currentPosts.map((post) => (
            <PostCard
              key={post.id}
              name={post.shop.item.name}
              startsAt={post.startsAt}
              workhour={post.workhour.toString()}
              address1={post.shop.item.address1}
              imageUrl={post.shop.item.imageUrl}
              hourlyPay={post.hourlyPay}
              originalHourlyPay={post.shop.item.originalHourlyPay}
              isPast={post.closed}
            />
          ))}
        </div>

        <div className='mt-6'>
          <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </section>
  );
};

export default AllNotices;
