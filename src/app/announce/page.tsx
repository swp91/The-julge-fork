'use client';

import React, { useState } from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { AuthProvider } from '@/app/_context/AuthContext';
import PostCard from '@/app/_components/PostCard/PostCard';
import DetailFilter from '@/app/_components/DetailFilter/DetailFilter';
import Pagination from '@/app/_components/Pagination';
import Dropdown from '@/app/_components/Dropdown';
import Button from '@/app/_components/Button';
import Link from 'next/link'; // Link 컴포넌트 추가

const JobListPage = () => {
  const [sortOption, setSortOption] = useState('마감임박순');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailFilterVisible, setIsDetailFilterVisible] = useState(false); // 상세 필터 상태
  const totalPages = 7;

  const handleSortChange = (option: string) => {
    setSortOption(option); // 선택된 옵션 업데이트
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 페이지 업데이트
  };

  const toggleDetailFilter = () => {
    setIsDetailFilterVisible((prev) => !prev); // 상세 필터 토글
  };

  const closeDetailFilter = () => {
    setIsDetailFilterVisible(false); // 상세 필터 닫기
  };

  return (
    <AuthProvider>
      <div className='flex flex-col'>
        <Header />
        <main className='flex-grow'>
          <div className='container mx-auto py-8 px-4'>
            {/* 맞춤 공고 */}
            <section className='mb-12 bg-red-10 p-6 rounded-md'>
              {' '}
              {/* 맞춤 공고 배경색 */}
              <h2 className='text-28b text-black mb-6'>맞춤 공고</h2>
              <div className='grid grid-cols-3 gap-4'>
                {[1, 2, 3].map((id) => (
                  <Link key={id} href={`/announce/detail/${id}`}>
                    {' '}
                    {/* 맞춤 공고 상세 페이지로 이동 */}
                    <PostCard
                      name={`맞춤 공고 ${id}`}
                      address1='서울시 강남구'
                      imageUrl='/image/default.jpg'
                      originalHourlyPay={15000}
                      hourlyPay={0}
                    />
                  </Link>
                ))}
              </div>
            </section>

            {/* 전체 공고 */}
            <section className='bg-white p-6 rounded-md'>
              {' '}
              {/* 전체 공고 배경색 */}
              <div className='flex justify-between items-center mb-6 gap-4'>
                <Dropdown
                  options={['마감임박순', '최신순', '높은가격순', '낮은가격순']}
                  value={sortOption}
                  label=''
                  onChange={handleSortChange}
                  placeholder='정렬 기준 선택'
                />

                <Button style='bordered' size='lg' onClick={toggleDetailFilter}>
                  상세 필터
                </Button>
              </div>
              {/* 상세 필터 */}
              {isDetailFilterVisible && (
                <div className='mb-6'>
                  <DetailFilter
                    isVisible={isDetailFilterVisible}
                    onClose={closeDetailFilter}
                  />
                </div>
              )}
              <h2 className='text-28b text-black mb-6'>전체 공고</h2>
              <div className='grid grid-cols-3 gap-4'>
                {Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
                  <Link key={id} href={`/announce/detail/${id}`}>
                    {' '}
                    {/* 전체 공고 상세 페이지로 이동 */}
                    <PostCard
                      name={`전체 공고 ${id}`}
                      address1='서울시 송파구'
                      imageUrl='/image/default.jpg'
                      originalHourlyPay={10000}
                      hourlyPay={0}
                    />
                  </Link>
                ))}
              </div>
              {/* 페이지 네이션 중앙 정렬 */}
              <div className='mt-8 flex justify-center'>
                <Pagination
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  currentPage={0}
                />
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default JobListPage;
