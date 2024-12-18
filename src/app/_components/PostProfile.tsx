'use client';

import Button from '@/app/_components/Button';

interface PostProps {
  isExist: boolean;
  type: keyof typeof POST_TYPE_CONFIG;
}

const POST_TYPE_CONFIG = {
  myStore: {
    title: '내 가게',
    navigateTo: '',
    buttonLabel: '가게 등록하기',
    description: '내 가게를 소개하고 공고도 등록해 보세요.',
  },
  announcement: {
    title: '등록된 공고',
    navigateTo: '',
    buttonLabel: '공고 등록하기',
    description: '공고를 등록해 보세요.',
  },
  profile: {
    title: '내 프로필',
    navigateTo: '',
    buttonLabel: '내 프로필 등록하기',
    description: '내 프로필을 등록하고 원하는 가게에 지원해 보세요.',
  },
  application: {
    title: '신청 내역',
    navigateTo: '',
    buttonLabel: '공고 보러가기',
    description: '아직 신청 내역이 없어요.',
  },
} as const;

const PostProfile = ({ isExist, type }: PostProps) => {
  if (isExist) return null;

  const { title, navigateTo, buttonLabel, description } =
    POST_TYPE_CONFIG[type];

  return (
    <div className='flex justify-center items-center'>
      <div className='lg:w-[1440px] md:w-[744px] w-[375px] lg:h-[395px] md:h-[395px] h-[315px] px-3 py-10'>
        <div className='mx-auto text-2xl font-bold mb-4 text-left lg:w-[965px] md:w-[680px] sm:w-[351px]'>
          {title}
        </div>
        <div
          className='flex flex-col items-center justify-center border border-gray-200 rounded-[10px] 
                          lg:w-[965px] lg:h-[217px] 
                          md:w-[680px] md:h-[217px] 
                          sm:w-[351px] sm:h-[195px] 
                          mx-auto'>
          <p className='text-gray-500 mb-6 text-sm md:text-base text-center'>
            {description}
          </p>
          <Button
            size='lg'
            onClick={() => {
              window.location.href = navigateTo;
            }}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostProfile;
