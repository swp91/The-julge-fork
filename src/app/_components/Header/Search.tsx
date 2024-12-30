'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SearchProps {
  windowWidth: number;
}

const Search: React.FC<SearchProps> = ({ windowWidth }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keyword.trim()) {
      event.preventDefault();
      router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <div
      className={`flex bg-gray-100 rounded-[10px] w-[335px] md:w-[400px] lg:w-[450px] ${
        windowWidth >= 744 ? 'ml-5' : 'mx-auto justify-center'
      }`}>
      <Image
        src={'/image/search.svg'}
        alt='검색'
        width={20}
        height={20}
        className='ml-2'
      />
      <input
        type='text'
        className='min-w-[280px] lg:w-[430px] h-10 bg-gray-100 rounded-[10px] ml-1 p-1'
        placeholder='가게 이름으로 찾아보세요.'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
