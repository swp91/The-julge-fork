// components/Table.tsx
'use client';

import { useState } from 'react';

interface Applicant {
  id: number;
  name: string;
  introduction: string;
  phone: string;
  status: '대기' | '거절' | '승인 완료';
}

const dummyData: Applicant[] = [
  {
    id: 1,
    name: '김어흥',
    introduction: '최선을 다해 열심히 일합니다.',
    phone: '010-0000-0000',
    status: '대기',
  },
  {
    id: 2,
    name: '서야옹',
    introduction: '열심히 하겠습니다!',
    phone: '010-0000-0000',
    status: '거절',
  },
  {
    id: 3,
    name: '박크앙',
    introduction: '성실한 자세로 일합니다.',
    phone: '010-0000-0000',
    status: '승인 완료',
  },
  {
    id: 4,
    name: '장멍멍',
    introduction: '일을 꼼꼼하게 하는 성격입니다.',
    phone: '010-0000-0000',
    status: '승인 완료',
  },
  {
    id: 5,
    name: '고기훈',
    introduction: '최선을 다해서 일하겠습니다.',
    phone: '010-0000-0000',
    status: '승인 완료',
  },
];

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='p-6'>
      <table className='w-full table-auto border-collapse border border-gray-200'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border p-3 text-left'>신청자</th>
            <th className='border p-3 text-left'>소개</th>
            <th className='border p-3 text-left'>전화번호</th>
            <th className='border p-3 text-left'>상태</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className='even:bg-gray-50'>
              <td className='border p-3'>{item.name}</td>
              <td className='border p-3 truncate'>{item.introduction}</td>
              <td className='border p-3'>{item.phone}</td>
              <td className='border p-3'>버튼</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
