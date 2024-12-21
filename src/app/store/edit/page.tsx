'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/Header';
import Button from '@/app/_components/Button';
import { Input } from '@/app/_components/Input';
import { Dropdown } from '@/app/_components/Dropdown';
import { Modal } from '@/app/_components/Modal';
import ImageUploader from '@/app/_components/ImageUploader';
import { useModal } from '@/app/_hooks/useModal';
import { CATEGORIES, LOCATIONS } from '@/app/_constants/constants';

const PostStore = () => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '더줄게',
      category: '한식',
      address1: '서울시 강동구',
      address2: '추가 주소',
      originalHourlyPay: '12000',
      description: '시급 높음',
      imageUrl: '',
    },
  });

  const imageUrl: string = watch('imageUrl');

  const onImageChange = (image: string) => setValue('imageUrl', image);

  const onImageDelete = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setValue('imageUrl', '');
  };

  const onSubmit = () => {
    openModal();
  };

  register('category', {
    required: '분류를 선택해 주세요.',
  });

  register('address1', {
    required: '주소를 선택해 주세요.',
  });

  return (
    <>
      <Header />
      <div className='bg-gray-50'>
        <div>
          <div
            className={clsx(
              'mx-auto pt-10 px-4 sm:px-6 lg:px-8',
              'w-full max-w-[90%] sm:max-w-[680px] lg:max-w-[964px]',
              'pb-[80px] md:pb-[60px]',
            )}>
            <div className='flex justify-between mb-6'>
              <div className='text-20b'>가게 정보</div>
              <p
                className='cursor-pointer text-18m hover:text-red-40'
                onClick={() => window.history.back()}>
                ✖
              </p>
            </div>

            <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-5'>
              <Input
                label='가게 이름*'
                placeholder='입력'
                error={errors.name?.message}
                {...register('name', {
                  required: '가게 이름을 입력해 주세요.',
                })}
              />
              <div className='relative'>
                <Dropdown
                  label='분류*'
                  options={CATEGORIES}
                  placeholder='선택'
                  value={watch('category')}
                  onChange={(value) => {
                    setValue('category', value);
                    trigger('category');
                  }}
                  onBlur={() => trigger('category')}
                  error={errors.category?.message}
                  className='relative'
                />
              </div>
              <div className='relative'>
                <Dropdown
                  label='주소*'
                  options={LOCATIONS}
                  placeholder='선택'
                  value={watch('address1')}
                  onChange={(value) => {
                    setValue('address1', value);
                    trigger('address1');
                  }}
                  onBlur={() => trigger('address1')}
                  error={errors.address1?.message}
                  className='relative'
                />
              </div>
              <Input
                label='상세 주소*'
                placeholder='입력'
                error={errors.address2?.message}
                {...register('address2', {
                  required: '상세 주소를 입력해 주세요.',
                })}
              />
              <Input
                label='기본 시급*'
                placeholder='입력'
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
                router.push('/store/detail/123');
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostStore;
