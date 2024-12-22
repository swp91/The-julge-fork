'use client';
import Button from '@/app/_components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileData {
  name: string;
  contact: string;
  location: string;
  introduction: string;
}

const ProfileCard = (profiledata: ProfileData) => {
  const router = useRouter();

  return (
    <div className='flex justify-center px-4 py-6'>
      <div
        className='
          flex flex-col lg:flex-row justify-between
          w-[343px] md:w-[665px] lg:w-[957px] h-auto
          md:py-[60px]
        '>
        <h1 className='text-black text-[28px] font-bold mb-6 text-left '>
          내 프로필
        </h1>
        <div
          className='
            bg-red-100 rounded-lg p-6
            flex flex-col justify-between
            shadow-md
            w-full max-w-[665px]
            h-auto
            lg:h-[256px] md:h-[256px] sm:h-[196px]
            md:mx-auto lg:mx-0
          '>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <div className='text-red-500 text-sm font-medium mb-1'>이름</div>
              <div className='text-black text-xl font-bold'>
                {profiledata.name}
              </div>
            </div>
            <Button
              style='bordered'
              size='sm'
              className='ml-4'
              onClick={() => router.push('/profile/post')}>
              편집하기
            </Button>
          </div>
          <div className='flex flex-col gap-4 mb-4'>
            <div className='flex items-center gap-2'>
              <Image
                src={'/image/phone.svg'}
                alt={'휴대전화'}
                width={20}
                height={20}
              />
              <span className='text-black text-sm'>{profiledata.contact}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Image
                src={'/image/location.svg'}
                alt={'위치'}
                width={20}
                height={20}
              />
              <span className='text-black text-sm'>
                선호 지역: {profiledata.location}
              </span>
            </div>
          </div>
          <div className='text-black text-sm'>{profiledata.introduction}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
