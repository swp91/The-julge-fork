'use client';

import React, { useContext, useState, useMemo } from 'react';
import PostCard from '@/app/_components/PostCard/PostCard';
import Pagination from '@/app/_components/Pagination';
import { NoticeContext } from '@/app/_context/NoticeContext';
import Dropdown from '@/app/_components/Dropdown';

const options = ['마감임박순', '시급많은순', '시간적은순', '가나다순'];

const AllNotices = () => {
  const context = useContext(NoticeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setCurrentPage(1);
  };

  if (!context) {
    return <p>로딩바만들예정</p>;
  }

  const { notices } = context;

  const filteredNotices = useMemo(() => {
    switch (selectedOption) {
      case '마감임박순':
        return [...notices].sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
        );
      case '시급많은순':
        return [...notices].sort((a, b) => b.hourlyPay - a.hourlyPay);
      case '시간적은순':
        return [...notices].sort((a, b) => a.workhour - b.workhour);
      case '가나다순':
        return [...notices].sort((a, b) =>
          a.shop.item.name.localeCompare(b.shop.item.name),
        );
      default:
        return notices;
    }
  }, [notices, selectedOption]);

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredNotices.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredNotices.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
      <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col items-center'>
        <div className='w-full flex flex-col md:flex-row justify-between mb-4'>
          <h2 className='text-20b md:text-28b'>전체 공고</h2>
          <div className='flex gap-3 mt-3'>
            <div>
              <Dropdown
                options={options}
                label=''
                value={selectedOption}
                onChange={handleOptionChange}
                className='w-auto min-w-[120px] h-[54px] md:h-[66px] text-14b border-none'
              />
            </div>
            <div className='h-[34px] w-20 flex justify-center items-center cursor-pointer bg-red-30 text-white rounded-[5px]'>
              상세 필터
            </div>
          </div>
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default AllNotices;
