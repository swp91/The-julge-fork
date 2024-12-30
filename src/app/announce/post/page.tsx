'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Header from '@/app/_components/Header/Header';
import Footer from '@/app/_components/Footer';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import Modal from '@/app/_components/Modal';

import useModal from '@/app/_hooks/useModal';
import { createShopNotice } from '@/app/_api/owner_api';
import Loading from '@/app/_components/Loding';
import { useAuth } from '@/app/_hooks/useAuth';

const PostAnnounce = () => {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const shopId = searchParams.get('shopId');
  const { isOpen, openModal, closeModal } = useModal();
  const [noticeId, setNoticeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ownerNoticeRequest>({
    mode: 'all',
  });

  if (user?.shop?.item && user.shop.item.id !== shopId) router.replace('/');

  const onSubmit = async (data: ownerNoticeRequest) => {
    if (!shopId) {
      alert('가게 정보를 찾을 수 없어요.');
      return;
    }

    if (Number(data.workhour) < 1 || Number(data.workhour) > 24) {
      alert('근무시간은 1시간 이상 24시간 이하여야 합니다.');
      return;
    }

    const localDate = new Date(data.startsAt);
    const now = new Date();

    if (localDate < now) {
      alert('과거 시간으로 설정할 수 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      const utcDate = localDate.toISOString();

      const postData = {
        ...data,
        startsAt: utcDate,
      };

      const response = await createShopNotice(shopId, postData);
      setNoticeId(response.data.item.id);

      openModal();
    } catch (err) {
      console.log('공고를 등록하는데 오류가 발생했어요:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
            <div className='flex justify-between mb-8'>
              <div className='text-20b'>공고 등록</div>
              <p
                className='cursor-pointer text-18m hover:text-red-40'
                onClick={() =>
                  window.confirm(
                    '공고 등록을 취소하시겠습니까?\n\n작성된 데이터가 사라질 수 있습니다.',
                  ) && router.back()
                }>
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
                type='number'
                error={errors.hourlyPay?.message}
                {...register('hourlyPay', {
                  required: '기본 시급을 입력해 주세요.',
                  validate: (value) =>
                    value >= 10030 ||
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
                if (noticeId) {
                  router.replace(`/announce/detail/${noticeId}`);
                }
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
