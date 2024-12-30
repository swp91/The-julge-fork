'use client';

import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Header from '@/app/_components/Header/Header';
import Footer from '@/app/_components/Footer';
import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import Dropdown from '@/app/_components/Dropdown';
import Modal from '@/app/_components/Modal';
import ImageUploader from '@/app/_components/ImageUploader';

import useModal from '@/app/_hooks/useModal';
import { CATEGORIES, LOCATIONS } from '@/app/_constants/constants';
import { getShopInfo, updateShopInfo } from '@/app/_api/owner_api';
import Loading from '@/app/_components/Loding';

const EditStore = () => {
  const router = useRouter();
  const { id } = useParams();
  const shopId = id as string;
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShopRequest>({
    mode: 'all',
  });

  const imageUrl: string = watch('imageUrl');

  useEffect(() => {
    if (!shopId) return;

    const fetchShopInfo = async () => {
      try {
        const response = await getShopInfo(shopId);
        reset(response.data.item);
      } catch (err) {
        console.error('가게 정보를 불러오는데 실패했어요:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopInfo();
  }, [reset, shopId]);

  const onImageChange = (image: string) => {
    setValue('imageUrl', image, { shouldValidate: true });
  };

  const onImageDelete = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setValue('imageUrl', '', { shouldValidate: true });
  };

  const onSubmit = async (data: ShopRequest) => {
    try {
      if (!shopId) {
        alert('가게 정보를 찾을 수 없어요.');
        return;
      }
      await updateShopInfo(shopId, data);
      openModal();
    } catch (err) {
      console.error('가게 정보를 수정하는데 오류가 발생했어요:', err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className='bg-gray-50'>
        <div
          className={clsx(
            'mx-auto pt-10 px-4 sm:px-6 lg:px-8',
            'w-full max-w-[90%] sm:max-w-[680px] lg:max-w-[964px]',
            'pb-[80px] md:pb-[60px]',
          )}>
          <div className='flex justify-between mb-8'>
            <div className='text-20b'>가게 정보</div>
            <p
              className='cursor-pointer text-18m hover:text-red-40'
              onClick={() =>
                window.confirm(
                  '가게 정보 수정을 취소하시겠습니까?\n\n작성된 데이터가 사라질 수 있습니다.',
                ) && router.back()
              }>
              ✖
            </p>
          </div>

          <div
            className={clsx(
              'relative z-10 grid gap-5 md:gap-y-5',
              'grid-cols-1 md:grid-cols-2',
            )}>
            <Input
              label='가게 이름*'
              error={errors.name?.message}
              {...register('name', {
                required: '가게 이름을 입력해 주세요.',
              })}
            />

            <div className='relative'>
              <Controller
                name='category'
                control={control}
                rules={{ required: '분류를 선택해 주세요.' }}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    label='분류*'
                    options={CATEGORIES}
                    error={errors.category?.message}
                    className='relative'
                  />
                )}
              />
            </div>

            <div className='relative'>
              <Controller
                name='address1'
                control={control}
                rules={{ required: '주소를 선택해 주세요.' }}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    label='주소*'
                    options={LOCATIONS}
                    error={errors.address1?.message}
                    className='relative'
                  />
                )}
              />
            </div>

            <Input
              label='상세 주소*'
              error={errors.address2?.message}
              {...register('address2', {
                required: '상세 주소를 입력해 주세요.',
              })}
            />

            <Input
              label='기본 시급*'
              rightAddon='원'
              className='relative'
              error={errors.originalHourlyPay?.message}
              {...register('originalHourlyPay', {
                required: '기본 시급을 입력해 주세요.',
                pattern: {
                  value: /^\d+$/,
                  message: '시급은 숫자만 입력할 수 있어요.',
                },
              })}
            />

            <ImageUploader
              image={imageUrl}
              label='가게 이미지'
              onImageChange={onImageChange}
              onImageDelete={onImageDelete}
              mode='edit'
            />

            <div className='col-span-1 md:col-span-2 flex flex-col gap-2'>
              <div>가게 설명</div>
              <textarea
                className={clsx(
                  'h-[153px] w-full border rounded-md pt-4 pl-5 resize-none',
                  'focus:border-black focus:outline-none',
                )}
                placeholder='입력'
                {...register('description')}
              />
            </div>

            <div className='col-span-1 md:col-span-2 flex justify-center'>
              <Button
                size='md'
                type='button'
                onClick={handleSubmit(onSubmit)}
                className='mt-4'>
                수정하기
              </Button>
            </div>
          </div>

          <Modal
            isOpen={isOpen}
            type='success'
            content='수정이 완료되었습니다.'
            onClose={() => {
              closeModal();
              router.replace(`/store/detail/${shopId}`);
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditStore;
