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
  isPast?: boolean; //지난 공고 여부
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
        'w-[171px] h-[261px] md:w-[332px] md:h-[360px] lg:w-[312px] lg:h-[349px] gap-3 p-3 border border-gray-200 rounded-xl',
      )}>
      
      <div className='relative w-[147px] h-[84px] md:w-[300px] md:h-[171px] lg:w-[280px] lg:h-[160px] rounded-xl overflow-hidden'>
       <Image src={imageUrl} alt={name} layout='fill' objectFit='cover' />
        {isPast && (
          <div className='absolute inset-0 flex justify-center items-center bg-opacity-70 bg-black'>
             <span className='text-gray-300 inset-0 text-20b md:text-28b'>
              지난 공고
            </span>
          </div>
        )}
      </div>
      <div>
        <h2
          className={clsx(
            'mt-4 md:mt-5 text-16b md:text-20b line-clamp-1',
            isPast ? 'text-gray-300' : 'text-black',
          )}>
          {name}
        </h2>
         {startsAt && workhour && (
          <p
            className={clsx(
              'flex items-center mt-2 text-12 md:text-14',
              isPast ? 'text-gray-300' : 'text-gray-500',
            )}>
            <Image
              src={
                isPast ? '/image/clock-icon-off.svg' : '/image/clock-icon.svg'
              }
              alt='시계 아이콘'
              width={20}
              height={20}
              className='mr-1'
            />
            {startsAt} ({workhour}시간)
          </p>
        )}
          {address1 && (
          <p
            className={clsx(
              'flex items-center mt-2 font-family text-12 md:text-14',
              isPast ? 'text-gray-300' : 'text-gray-500',
            )}>
            <Image
              src={isPast ? '/image/path11-off.svg' : '/image/path11.svg'}
              alt='주소 아이콘'
              width={16}
              height={20}
              className='mr-1'
            />

            {address1}
          </p>
        )}
         <div className='flex flex-col md:flex-row justify-between mt-3 md:mt-4'>
          {originalHourlyPay !== undefined && (
            <>
              <h2
                className={clsx(
                  ' text-18b md:text-24b lg:text-24b',
                  isPast ? 'text-gray-300' : 'text-black',
                )}>
                {originalHourlyPay.toLocaleString()}원
              </h2>
              <p className='flex md:hidden text-12 text-red-30'>
                기존 시급보다 {percent}{' '}
                <Image
                  src='/image/arrow-up-bold-red.svg'
                  alt='화살표 아이콘'
                  width={10}
                  height={10}
                  priority
                />
              </p>
            </>
          )}
          {percent !== undefined && (
            <div className='hidden md:block'>
              <Badge percent={percent} isPast={isPast} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
