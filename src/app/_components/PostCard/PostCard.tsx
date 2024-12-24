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
      {/* 이미지 크기 설정하실땐 부모한테 설정하셔야됩니당 이미지태그에 설정하는거 아니에요! 그래서 의도한대로 사이즈가 안나오신거같아요 */}
      <div className='relative w-[147px] h-[84px] md:w-[300px] md:h-[171px] lg:w-[280px] lg:h-[160px] rounded-xl overflow-hidden'>
        {/* Image컴포넌트를 사용했습니다 fill = 부모한테 크기맞추겠다는거에요 objectFit=cover는 이미지비율 유지하면서 맞추겠다는거에요 */}
        {/* 만약 Image컴포넌트가 아니라 img 태그를 썼다면 className="w-full h-full object-cover" 이거랑 똑같은 설정입니다.*/}
        <Image src={imageUrl} alt={name} layout='fill' objectFit='cover' />
        {isPast && (
          <div className='absolute inset-0 flex justify-center items-center bg-opacity-70 bg-black'>
            {/*width, height값 설정해두신거 다 없앴습니다 텍스트 사용하는 태그들은 왠만하면 너비설정 하지 않습니다.*/}
            <span className='text-gray-300 inset-0 text-20b md:text-28b'>
              지난 공고
            </span>
          </div>
        )}
      </div>
      <div>
        {/* h2에도 width값 height값 설정하셨던데 h2같은 텍스트 문단에는 넣으시는거아니에요! 여긴 폰트크기만 설정해주시면 됩니다. */}
        {/* line-clamp-1 는 글자가 많으면 1줄에서 ... 처리로 잘라버리겠다는 뜻입니다. */}
        <h2
          className={clsx(
            'mt-4 md:mt-5 text-16b md:text-20b line-clamp-1',
            isPast ? 'text-gray-300' : 'text-black',
          )}>
          {name}
        </h2>
        {/* 시계랑 위치아이콘 회색아이콘 받아서 조건부로 적용되게 해놨습니다. */}
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
        {/* 반응형 텍스트 설정하실떄 md:text-14 lg:text-14 이런식으로 md랑 lg랑 같은 사이즈 입력을 하셨던데 */}
        {/* md: 라는게 md이상은 다 적용시키겠다는거라 lg랑 md랑 같다면 md만 쓰셔도됩니다! */}
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
        {/* flex로 자리배치 설정 모바일에선 세로정렬 태블릿이상에서는 가로정렬했습니다. 시급과 할인멘트 정렬입니다 */}
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
              {/* 뱃지 대신해서 보여줄 할인멘트입니다 모바일에서만 보입니다. */}
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
          {/* 뱃지는 모바일에서 안보이게 히든처리하고, 태블릿이상에서 보이게했습니다. */}
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
