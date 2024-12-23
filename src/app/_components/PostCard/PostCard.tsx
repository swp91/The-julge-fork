'use client';
import React from 'react';
import clsx from 'clsx';
import Badge from '../Badge'; // Badge 컴포넌트 가져오기
import Image from 'next/image';

interface PostCardProps {
  name: string; // 이름
  startsAt?: string; // 시작하는 날짜
  workhour?: string; // 근무 시간
  address1: string; // 주소1
  imageUrl: string; // 이미지 URL
  originalHourlyPay?: number; // 시급
  percent?: number; // 시급 변화 비율
  isPast?: boolean //지난 공고 여부
}

const PostCard: React.FC<PostCardProps> = ({
  name,
  startsAt,
  workhour,
  address1,
  imageUrl,
  originalHourlyPay,
  percent, 
  isPast,
}) => {
  return (
    <div
      className={clsx(
        ' gap-3 p-3 border border-gray-200 rounded-[12px] opacity-100 relative shadow-md lg:w-[312px] lg:h-[348px] lg:p-4 lg:gap-5 ',
      )}>
      <div className='relative'>
      <img
        src={imageUrl}
        alt={name}
        className=' lg:w-[280px] lg:h-[160px] md:w-[300px] md:h-[171px}  gap-0 object-cover border rounded-[12px] '
      />
      {isPast && (
       <div className='absolute inset-0 flex justify-center items-center bg-opacity-70 bg-black'>
       <span className=' md:w-[112px] md:h-[34px] lg:w-[112px] lg:h[35px]  overflow-hidden text-gray-300 inset-0 object-cover text-20b md:text-28b lg:text-28b'>지난 공고</span>
      </div>
      )}
      </div>
      <div>
        <h2 className={clsx('w-[74px] h-[20px] md:w-[92px] md:h-[24px] lg-w[92px] md:h[25px] text-16b  mt-4 md:text-20b lg:text-20b ', isPast ? 'text-gray-300' : 'text-black' )}>{name}</h2>
       {startsAt && workhour && (
        <p className={clsx('flex items-center mt-2 font-family text-12 md:text-14 lg:text-14 ', isPast ? 'text-gray-300' : 'text-gray-500')}>
          <img
            src='./image/clock-icon.svg'
            alt='시계 아이콘'
            className='w-4 mr-1'
            
          />
          {startsAt} ({workhour}시간)
        </p>
       )}
        
        {address1 && (
        <p className= {clsx('flex items-center mt-2 font-family text-12 md:text-14 lg:text-14', isPast ? 'text-gray-300':'text-gray-500')}>
          <img
            src='./image/path11.svg'
            alt='주소 아이콘'
            className='w-4  mr-1'
          />
          {address1}
        </p>
        )}
        <div className='flex justify-between items-center gap-2 mt-6'>
          {originalHourlyPay !==undefined &&(
          <h2 className={clsx(' text-18b md:text-24b lg:text-24b', isPast ? 'text-gray-300'  : 'text-black')}>
            {originalHourlyPay.toLocaleString()}원
          </h2>
          )}
          {percent !== undefined && (
            <Badge percent={percent} isPast={isPast} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
