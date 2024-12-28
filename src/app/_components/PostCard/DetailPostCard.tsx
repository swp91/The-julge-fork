import Image from 'next/image';
import clsx from 'clsx';
import Badge from '../Badge';
import Button from '../Button';

const DetailPostCard = () => {
  return (
    <>
      <div className='w-[345px] h-[450px] md:w-[680px] md:h-[677px] lg:w-[964px] lg:h-[356px] rounded-xl border p-5 md:p-6 flex flex-col lg:flex-row justify-between'>
        <div className='w-[311px] h-[177px] md:w-[632px] md:h-[361px] lg:w-[539px] lg:h-[308px] relative flex-shrink-0'>
          <Image
            src='https://images.unsplash.com/photo-1731778572747-315c9089bc69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8'
            alt=''
            fill
            className='object-cover'
          />
        </div>
        <div className='flex flex-col justify-between w-[311px] h-[251px] md:w-[632px] md:h-[276px] lg:w-[346px] lg:h-[308px]'>
          <div>
            <h2 className='text-primary text-14b md:text-16b mb-2'>가게</h2>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-24b md:text-28b'>15,000원</span>
              <Badge percent={50} />
            </div>
            <div className='flex mb-3'>
              <div className='inline w-4 h-4 md:w-5 md:h-5'>
                <Image
                  src='./image/clock-icon.svg'
                  alt='근무시간'
                  width={20}
                  height={20}
                  className='w-4 h-4 md:w-5 md:h-5'
                />
              </div>
              <p className='text-14 md:text-16 text-gray-500'>
                2023-01-02 15:00~18:00 (3시간)
              </p>
            </div>
            <div className='flex mb-3'>
              <div className='inline w-4 h-4 md:w-5 md:h-5 flex justify-center'>
                <Image
                  src='./image/path11.svg'
                  alt='주소'
                  width={16}
                  height={20}
                  className='w-[13px] h-4 md:w-4 md:h-5'
                />
              </div>
              <p className='text-14 md:text-16 text-gray-500'>서울시 송파구</p>
            </div>
            <div className='line-clamp-3 text-14 md:text-16'>
              알바하기 편한 너구리네 라면집! 라면 올려두고 끓이기만 하면 되어서
              쉬운 편에 속하는 가게입니다. 알바하기 편한 너구리네 라면집! 라면
              올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.
              알바하기 편한 너구리네 라면집! 라면 올려두고 끓이기만 하면 되어서
              쉬운 편에 속하는 가게입니다. 알바하기 편한 너구리네 라면집! 라면
              올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.
            </div>
          </div>
          <div>
            <Button size='full'>공고모집</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPostCard;
