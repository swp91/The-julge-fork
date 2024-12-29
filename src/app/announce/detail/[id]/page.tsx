'use client';

import React, { useContext } from 'react';
import { useParams } from 'next/navigation';
import { NoticeContext } from '@/app/_context/NoticeContext';
import DetailPostCard from '@/app/_components/PostCard/DetailPostCard';

const page = () => {
  const { id } = useParams();
  const noticeContext = useContext(NoticeContext);

  if (!noticeContext) {
    return <p>로딩중</p>;
  }
  const { notices } = noticeContext;
  const currentNotice = notices.find((notice) => notice.id === id);

  console.log(currentNotice);

  return (
    <>
      <div className='flex justify-center py-10'>
        {currentNotice && (
          <DetailPostCard
            name={currentNotice?.shop.item.name}
            noticeDescription={currentNotice.description}
            shopDescription={currentNotice.shop.item.description}
            hourlyPay={currentNotice.hourlyPay}
            imageUrl={currentNotice.shop.item.imageUrl}
            address1={currentNotice.shop.item.address1}
            originalHourlyPay={currentNotice.shop.item.originalHourlyPay}
            startsAt={currentNotice.startsAt}
            workhour={currentNotice.workhour}
          />
        )}
      </div>
    </>
  );
};

export default page;
