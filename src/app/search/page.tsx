'use client';
import { useContext, useMemo, useState } from 'react';
import Dropdown from '../_components/Dropdown';
import Footer from '../_components/Footer';
import Header from '../_components/Header';
import { NoticeContext } from '@/app/_context/NoticeContext';
import DetailFilter from '../_components/DetailFilter/DetailFilter';
import Pagination from '../_components/Pagination';
import PostCard from '../_components/PostCard/PostCard';

const options = [
  '마감임박순',
  '시급많은순',
  '시간적은순',
  '가까운순',
  '가나다순',
];

const SearchPage = () => {
  const context = useContext(NoticeContext);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    selectedOptions: [] as string[],
    amount: '',
    startDate: '',
  });

  if (!context) {
    return <p>로딩</p>;
  }

  const { notices } = context;

  const filteredNotices = useMemo(() => {
    let result = [...notices];

    if (filters.selectedOptions.length > 0) {
      result = result.filter((notice) =>
        filters.selectedOptions.some((option) =>
          notice.shop.item.address1.includes(option),
        ),
      );
    }

    if (filters.amount) {
      result = result.filter(
        (notice) => notice.hourlyPay >= parseInt(filters.amount, 10),
      );
    }

    if (filters.startDate) {
      result = result.filter(
        (notice) =>
          new Date(notice.startsAt).getTime() >=
          new Date(filters.startDate).getTime(),
      );
    }

    switch (selectedOption) {
      case '마감임박순':
        return result.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
        );
      case '시급많은순':
        return result.sort((a, b) => b.hourlyPay - a.hourlyPay);
      case '시간적은순':
        return result.sort((a, b) => a.workhour - b.workhour);
      case '가나다순':
        return result.sort((a, b) =>
          a.shop.item.name.localeCompare(b.shop.item.name),
        );
      default:
        return result;
    }
  }, [notices, selectedOption, filters]);

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
    <div>
      <Header />
      <div className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
        <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col items-center'>
          <div className='w-full flex flex-col md:flex-row justify-between mb-4 relative'>
            <h1 className='text-20b md:text-28b'>{}에 대한 공고 목록</h1>
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
      </div>
      <Footer />
    </div>
  );
};
export default SearchPage;
