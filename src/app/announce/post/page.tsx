'use client';

import { useRouter } from 'next/navigation';
import { useModal } from '@/app/_hooks/useModal';
import { useForm } from 'react-hook-form';
import Button from '@/app/_components/Button';
import Header from '@/app/_components/header';
import { Input } from '@/app/_components/Input';
import { Modal } from '@/app/_components/Modal';
import clsx from 'clsx';
import Footer from '@/app/_components/footer';

const PostAnnounce = () => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const now = new Date();
  const localDateTime = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 16);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      hourlyPay: '',
      startsAt: localDateTime,
      workhour: '',
      description: '',
    },
  });

  const onSubmit = (data: Record<string, any>) => {
    const localDate = new Date(data.startsAt);
    const utcDate = localDate.toISOString();

    const payload = {
      ...data,
      startsAt: utcDate,
    };

    console.log('Payload to submit:', payload);

    openModal();
  };

  return (
    <>
      <Header />
      <div className='bg-gray-50'>
        <div className='w-full bg-gray-50'>
          <div
            className={clsx(
              'mx-auto pt-10 pb-[80px] md:py-28 lg:py-36',
              'px-4 md:px-0',
              'max-w-[90%] sm:max-w-[680px] lg:max-w-[964px]',
              'pb-[80px] md:pb-[60px]',
            )}>
            <div className='flex justify-between mb-6'>
              <div className='text-20b'>공고 등록</div>
              <p
                className='cursor-pointer text-18m hover:text-red-40'
                onClick={() => window.history.back()}>
                ✖
              </p>
            </div>

            <div
              className={clsx(
                'relative z-10 grid gap-5 gap-y-7',
                'grid-cols-1 md:grid-cols-2',
                'lg:grid-cols-[1fr_1fr_1fr]',
              )}>
              <Input
                label='시급*'
                rightAddon='원'
                className='relative'
                error={errors.hourlyPay?.message}
                {...register('hourlyPay', {
                  required: '기본 시급을 입력해 주세요.',
                  validate: (value) =>
                    parseInt(value, 10) >= 10030 ||
                    '시급은 10,030원 이상만 입력할 수 있어요.',
                  pattern: {
                    value: /^\d+$/,
                    message: '시급은 숫자만 입력할 수 있어요.',
                  },
                })}
              />
              <Input
                label='시작 일시*'
                type='datetime-local'
                error={errors.startsAt?.message}
                {...register('startsAt', {
                  required: '시작 일시를 입력해 주세요.',
                })}
              />
              <Input
                label='업무 시간*'
                rightAddon='시간'
                className='relative'
                error={errors.workhour?.message}
                {...register('workhour', {
                  required: '업무 시간을 입력해 주세요.',
                  pattern: {
                    value: /^\d+$/,
                    message: '업무 시간은 숫자만 입력할 수 있어요.',
                  },
                })}
              />
              <div className='col-span-1 md:col-span-2 flex flex-col gap-2 w-full lg:col-[span_3]'>
                <div>공고 설명</div>
                <textarea
                  className={clsx(
                    'h-[153px] w-full border rounded-md pt-4 pl-5 resize-none',
                    'focus:border-black focus:outline-none',
                  )}
                  placeholder='입력'
                  {...register('description')}
                />
              </div>
              <div className='col-span-1 md:col-span-2 lg:col-span-3 flex justify-center lg:justify-center'>
                <Button
                  size='md'
                  type='button'
                  onClick={handleSubmit(onSubmit)}
                  className='mt-4'>
                  등록하기
                </Button>
              </div>
            </div>

            <Modal
              isOpen={isOpen}
              type='success'
              content='등록이 완료되었습니다.'
              onClose={() => {
                closeModal();
                router.push('/announce/detail/123');
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostAnnounce;
