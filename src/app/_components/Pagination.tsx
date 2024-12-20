'use client';

import { useState } from 'react';
import ArrowButton from './ArrowButton';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesPerGroup = 7;

  const getPageGroup = () => {
    const start =
      Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
    const end = Math.min(start + pagesPerGroup - 1, totalPages);
    return { start, end };
  };

  const { start, end } = getPageGroup();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex items-center justify-center space-x-1'>
      <ArrowButton
        direction='first'
        onClick={() => goToPage(1)}
        isDisabled={start === 1}
      />

      <ArrowButton
        direction='prev'
        onClick={() => goToPage(start - 1)}
        isDisabled={start <= 1}
      />
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-2 md:px-3 py-2 rounded-md text-12 md:text-14 ${
            currentPage === page ? 'bg-red-30 text-white' : 'hover:bg-red-10'
          }`}>
          {page}
        </button>
      ))}

      <ArrowButton
        direction='next'
        onClick={() => goToPage(end + 1)}
        isDisabled={end >= totalPages}
      />

      <ArrowButton
        direction='last'
        onClick={() => goToPage(totalPages)}
        isDisabled={start + pagesPerGroup > totalPages}
      />
    </div>
  );
};

export default Pagination;
