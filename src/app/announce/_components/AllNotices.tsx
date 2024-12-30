'use client';

import React, { useState } from 'react';
import PostCard from '@/app/_components/PostCard/PostCard';
import Pagination from '@/app/_components/Pagination';
import Dropdown from '@/app/_components/Dropdown';
import DetailFilter from '@/app/_components/DetailFilter/DetailFilter';
import { useFilteredNotices } from '@/app/_hooks/useFilteredNotices';
import Link from 'next/link';

const options = [
  '마감임박순',
  '시급많은순',
  '시간적은순',
  '가까운순',
  '가나다순',
];

const AllNotices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    selectedOptions: [] as string[],
    amount: '',
    startDate: '',
  });

  const filteredNotices = useFilteredNotices({
    ...filters,
    sortOption: selectedOption,
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredNotices.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredNotices.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setCurrentPage(1);
  };

  const handleApplyFilters = (appliedFilters: {
    selectedOptions: string[];
    amount: string;
    startDate: string;
  }) => {
    setFilters(appliedFilters);

    const isReset =
      appliedFilters.selectedOptions.length === 0 &&
      !appliedFilters.amount &&
      !appliedFilters.startDate;

    if (!isReset) {
      setFilterVisible(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
      <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col items-center'>
        <div className='w-full flex flex-col md:flex-row justify-between mb-4 relative'>
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
            <div
              className='h-[34px] w-20 flex justify-center items-center cursor-pointer bg-red-30 text-white rounded-[5px]'
              onClick={() => setFilterVisible(true)}>
              상세 필터
            </div>
            <DetailFilter
              isVisible={filterVisible}
              onClose={() => setFilterVisible(false)}
              onApply={handleApplyFilters}
              className='absolute z-50 right-0 top-16'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-3 w-full gap-1 md:gap-[14px]'>
          {currentPosts.map((post) => (
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
