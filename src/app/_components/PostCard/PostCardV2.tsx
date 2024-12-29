'use client';
import React from 'react';
import Badge from '../Badge';
import Image from 'next/image';
import Button from '../Button';
import clsx from 'clsx';
import { useWindowWidth } from '../../_hooks/useWindowWidth'; // useWindowWidth 가져오기
import { useRouter } from 'next/navigation'; // next/navigation 라우팅 사용

interface PostCardProps {
  name: string; // 이름
  startsAt?: string; // 시작하는 날짜
  workhour?: string; // 근무 시간
  address1: string; // 주소1
  imageUrl: string; // 이미지 URL
  originalHourlyPay?: number; // 시급
  percent?: number; // 시급 변화 비율
  description: string; // 설명
}

const PostCard: React.FC<PostCardProps> = ({
  name,
  startsAt,
  workhour,
  address1,
  imageUrl,
  originalHourlyPay,
  percent,
  description,
}) => {
  const windowWidth = useWindowWidth(); // 현재 창 너비 가져오기
  const isDesktop = windowWidth >= 964; // 데스크톱 여부 판단
  const router = useRouter();

  if (isDesktop) {
    // 데스크톱 레이아웃
    return (
      <div
        className={clsx(
          'w-full max-w-[964px] p-6 bg-white border border-gray-200 rounded-xl shadow-md flex flex-row'
        )}
      >
        {/* 이미지 */}
        <div className='relative w-[539px] h-[308px] flex-shrink-0 rounded-xl overflow-hidden'>
          <Image src={imageUrl} alt={name} layout='fill' objectFit='cover' />
        </div>

        {/* 텍스트 */}
        <div className='flex-1 flex flex-col justify-between '>
          <div>
            {/* 시급 */}
            <h1 className='text-16b text-primary'>시급</h1>
            <div className='flex items-center mt-2'>
              {originalHourlyPay !== undefined && (
                <h2 className='text-24b text-black mr-2'>
                  {originalHourlyPay.toLocaleString()}원
                </h2>
              )}
              {percent !== undefined && <Badge percent={percent} />}
            </div>

            {/* 시간 */}
            {startsAt && workhour && (
              <p className='flex items-center mt-2 text-14 text-gray-500'>
                <Image
                  src='/public/image/clock-icon.svg'
                  alt='시계 아이콘'
                  width={16}
                  height={16}
                  className='mr-1'
                />
                {startsAt} ({workhour}시간)
              </p>
            )}

            {/* 주소 */}
            {address1 && (
              <p className='flex items-center mt-2 text-14 text-gray-500'>
                <Image
                  src='/public/image/clock-icon.svg'
                  alt='주소 아이콘'
                  width={16}
                  height={16}
                  className='mr-1'
                />
                {address1}
              </p>
            )}

            {/* 상세 설명 */}
            <p className='mt-4 line-clamp-3 text-black text-14 leading-relaxed'>
              {description}
            </p>
          </div>

          {/* 버튼 */}
          <div className='mt-4 flex'> {/* 버튼을 감싸는 div 추가 */}
            <Button
              style='bordered'
              size='lg'
              className='w-full py-2 text-14 ' // 여백을 줄임
              onClick={() => router.push('/edit')} // next/navigation의 router 사용
            >
              공고 편집하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 모바일 및 태블릿 레이아웃
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto'>
      <div
        className={clsx(
          'w-full max-w-[351px] h-auto p-3 bg-white border border-gray-200 rounded-xl shadow-md'
        )}
      >
        {/* 이미지 */}
        <div className='relative w-full h-[200px] md:h-[360px] rounded-xl overflow-hidden'>
          <Image src={imageUrl} alt={name} layout='fill' objectFit='cover' />
        </div>

        {/* 텍스트 */}
        <div className='mt-4'>
          {/* 시급 */}
          <h1 className='text-14b text-primary md:text-16b'>시급</h1>
          <div className='flex items-center mt-2'>
            {originalHourlyPay !== undefined && (
              <h2 className='text-24b text-black mr-2'>
                {originalHourlyPay.toLocaleString()}원
              </h2>
            )}
            {percent !== undefined && <Badge percent={percent} />}
          </div>

          {/* 시간 */}
          {startsAt && workhour && (
            <p className='flex items-center mt-2 text-14 text-gray-500'>
              <Image
                src='/public/image/clock-icon.svg'
                alt='시계 아이콘'
                width={16}
                height={16}
                className='mr-1'
              />
              {startsAt} ({workhour}시간)
            </p>
          )}

          {/* 주소 */}
          {address1 && (
            <p className='flex items-center mt-2 text-14 text-gray-500'>
              <Image
                src='/public/image/path11.svg'
                alt='주소 아이콘'
                width={16}
                height={16}
                className='mr-1'
              />
              {address1}
            </p>
          )}

          {/* 설명 */}
          <p className='mt-4 line-clamp-3 text-black text-14 md:text-16'>
            {description}
          </p>

          {/* 버튼 */}
          <div className='mt-4 flex justify-center'> {/* 버튼을 감싸는 div 추가 */}
            <Button
              style='bordered'
              size='lg'
              className='w-full py-2 mt-4 text-14b md:text-16b' // 여백을 줄임
              onClick={() => router.push('/edit')} // next/navigation의 router 사용
            >
              공고 편집하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
