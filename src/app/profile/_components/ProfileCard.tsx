import Button from '@/app/_components/Button';
import Image from 'next/image';

interface ProfileData {
  name: string;
  contact: string;
  location: string;
  introduction: string;
}

const ProfileCard = (profiledata: ProfileData) => {
  return (
    <div className='px-[245px] py-[60px]'>
      <div
        className='flex
        sm:w-[375px] sm:h-[316px]
        md:w-[744px] md:h-[434px]
        lg:w-[1440px] lg:h-[376px]'>
        <h1 className='text-black text-lg font-bold mb-6 sm:mb-4'>내 프로필</h1>
        <div
          className='
        bg-red-100 rounded-lg p-6
        flex flex-col justify-between
        shadow-md
      '>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <div className='text-red-500 text-sm font-medium mb-1'>이름</div>
              <div className='text-black text-xl font-bold'>
                {profiledata.name}
              </div>
            </div>
            <Button style='bordered' size='sm' className='ml-4'>
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
