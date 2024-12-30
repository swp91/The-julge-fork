'use client';
import Image from 'next/image';
import Badge from '../Badge';
import Button from '../Button';
import clsx from 'clsx';
import useAlbaTimeFormat from '@/app/_hooks/useAlbaTimeFormat';

interface DetailPostCard {
  type?: 'store' | 'notice';
  name: string;
  startsAt?: string;
  workhour?: number;
  address1: string;
  imageUrl: string;
  hourlyPay?: number;
  shopDescription: string;
  noticeDescription?: string;
  originalHourlyPay?: number;
  closed?: boolean;
  shopId?: string;
  userId?: string;
}

const DetailPostCard: React.FC<DetailPostCard> = ({
  type = 'notice',
  name,
  address1,
  imageUrl,
  shopDescription,
  noticeDescription,
  hourlyPay,
  workhour,
  originalHourlyPay,
  startsAt,
  closed,
  shopId,
  userId,
}) => {
  const TimeFormat = useAlbaTimeFormat(startsAt, (workhour ?? 0).toString());
  const percent =
    hourlyPay !== undefined && originalHourlyPay !== undefined
      ? Math.round(((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100)
      : undefined;

  return (
    <>
      <div>
        {/* 카드 제목 */}
        {type === 'notice' ? (
          <div>
            <h2 className='text-primary text-14b md:text-16b mb-2'>식당</h2>
            <span className='text-20b md:text-28b'>{name}</span>
          </div>
        ) : (
          <h2 className='text-20b md:text-28b'>내 가게</h2>
        )}
        {/* 카드 부분 */}
        <div
          className={clsx(
            'w-[345px] h-auto md:w-[680px] md:h-auto lg:w-[964px] lg:h-[356px] rounded-xl border p-5 md:p-6 flex flex-col lg:flex-row justify-between mt-4 md:mt-6',
            { 'bg-red-10': type === 'store' },
          )}>
          <div className='w-[311px] h-[177px] md:w-[632px] md:h-[361px] lg:w-[539px] lg:h-[308px] relative flex-shrink-0 rounded-xl overflow-hidden'>
            <Image src={imageUrl} alt='가게 사진' className='object-cover' />
            {closed && (
              <div className='absolute bg-black inset-0 opacity-70 flex justify-center items-center'>
                <span className='text-20b md:text-28b text-gray-300'>
                  마감 완료
                </span>
              </div>
            )}
          </div>
          <div className='flex flex-col justify-between w-[311px] h-[251px] md:w-[632px] md:h-[276px] lg:w-[346px] lg:h-[308px] mt-4 lg:mt-0'>
            <div>
              <h2 className='text-primary text-14b md:text-16b mb-2'>
                {type === 'notice' ? '시급' : '식당'}
              </h2>
              {type === 'notice' ? (
                <div className='flex items-center gap-2 mb-3'>
                  <span className='text-24b md:text-28b'>{hourlyPay}원</span>
                  <Badge percent={percent} />
                </div>
              ) : (
                <h2 className='text-24b md:text-28b'>{name}</h2>
              )}
              {type === 'notice' && (
                <div className='flex mb-3 gap-2'>
                  <div className='inline w-4 h-4 md:w-5 md:h-5'>
                    <Image
                      src='/image/clock-icon.svg'
                      alt='근무시간'
                      width={20}
                      height={20}
                      className='w-4 h-4 md:w-5 md:h-5'
                    />
                  </div>
                  <p className='text-14 md:text-16 text-gray-500'>
                    {TimeFormat} ({workhour}시간)
                  </p>
                </div>
              )}

              <div className='flex mb-3 gap-2'>
                <div className='inline w-4 h-4 md:w-5 md:h-5 flex justify-center'>
                  <Image
                    src='/image/path11.svg'
                    alt='주소'
                    width={16}
                    height={16}
                    className='w-[13px] h-4 md:w-4 md:h-5'
                  />
                </div>
                <p className='text-14 md:text-16 text-gray-500'>{address1}</p>
              </div>
              <div className='line-clamp-3 text-14 md:text-16 md:line-clamp-2 lg:line-clamp-3'>
                {shopDescription}
              </div>
            </div>
            {type === 'notice' && (
              <div>
                {closed ? (
                  <Button size='full' disabled>
                    신청 불가
                  </Button>
                ) : userId === shopId ? (
                  <Button size='full' style='bordered'>
                    공고 편집하기
                  </Button>
                ) : (
                  <Button size='full'>신청하기</Button>
                )}
              </div>
            )}
            {type === 'store' && (
              <div className='flex gap-2'>
                <Button size='full' style='bordered'>
                  편집하기
                </Button>
                <Button size='full'>공고 등록하기</Button>
              </div>
            )}
          </div>
        </div>
        {/* 카드 설명부분 */}
        {type === 'notice' && (
          <div className='mt-6 w-[345px] md:w-[680px] lg:w-[964px] h-auto rounded-xl bg-gray-100 p-5 md:p-8'>
            <h3 className='text-14b md:text-16b'>공고 설명</h3>
            <p className='text-14 md:text-16 mt-2'>{noticeDescription}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPostCard;
