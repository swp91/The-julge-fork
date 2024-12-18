'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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

  return (
    <div className='flex items-center justify-center space-x-1'>
      {currentPage > 1 && (
        <button onClick={() => goToPage(1)}>
          <Image
            src='/image/icon-pagearrow2.svg'
            alt='first'
            width={20}
            height={20}
            className='transform rotate-180'
          />
        </button>
      )}

      {start > 1 && (
        <button onClick={() => goToPage(start - 1)}>
          <Image
            src='/image/icon-pagearrow.svg'
            alt='previous'
            width={20}
            height={20}
            className='transform rotate-180'
          />
        </button>
      )}

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
        (page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-2 md:px-3 py-2 rounded-md text-12 md:text-14 ${
              currentPage === page
                ? 'bg-red-30 text-white'
                : 'hover:bg-gray-200'
            }`}>
            {page}
          </button>
        ),
      )}

      {end < totalPages && (
        <button onClick={() => goToPage(end + 1)}>
          <Image
            src='/image/icon-pagearrow.svg'
            alt='next'
            width={20}
            height={20}
          />
        </button>
      )}

      {currentPage < totalPages && (
        <button onClick={() => goToPage(totalPages)}>
          <Image
            src='/image/icon-pagearrow2.svg'
            alt='last'
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
};

export default Pagination;
