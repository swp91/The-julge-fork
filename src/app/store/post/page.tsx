'use client';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import Button from '@/app/_components/Button';
import { Input } from '@/app/_components/Input';
import { Dropdown } from '@/app/_components/Dropdown';
import { Modal } from '@/app/_components/Modal';
import { useModal } from '@/app/_hooks/useModal';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CATEGORIES, LOCATIONS } from '@/app/_constants/constants';
import ImageUploader from '@/app/_components/ImageUploader';

const PostStore = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    detailAddress: '',
    wage: '',
    description: '',
    image: '',
  });

  const { isOpen, openModal, closeModal } = useModal();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (image: string) => {
    setFormData((prev) => ({ ...prev, image }));
  };

  const handleImageDelete = () => {
    if (formData.image) URL.revokeObjectURL(formData.image);
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const handleSubmit = () => {
    console.log('등록 데이터:', formData);
    openModal();
  };

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
              <Image
                src='/image/cancel-icon.svg'
                alt='닫기'
                width={18}
                height={18}
                className='cursor-pointer'
                onClick={() => console.log('폼 닫기')}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-y-6'>
              <Input
                label='가게 이름*'
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder='입력'
              />
              <Dropdown
                label='분류*'
                options={CATEGORIES}
                value={formData.category}
                onChange={(value) => handleChange('category', value)}
                placeholder='선택'
              />
              <Dropdown
                label='주소*'
                options={LOCATIONS}
                value={formData.address}
                onChange={(value) => handleChange('address', value)}
                placeholder='선택'
              />
              <Input
                label='상세 주소*'
                value={formData.detailAddress}
                onChange={(e) => handleChange('detailAddress', e.target.value)}
              />
              <Input
                label='기본 시급*'
                value={formData.wage}
                onChange={(e) => handleChange('wage', e.target.value)}
                rightAddon='원'
                className='relative'
              />
              <ImageUploader
                image={formData.image}
                onImageChange={handleImageChange}
                onImageDelete={handleImageDelete}
                mode='add'
              />
              <div className='col-span-1 md:col-span-2 flex flex-col gap-2'>
                <div>가게 설명</div>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className={clsx(
                    'h-[153px] w-full border rounded-md pt-4 pl-5 resize-none',
                    'focus:border-black focus:outline-none',
                  )}
                  placeholder='입력'
                />
              </div>
              <div className='col-span-1 md:col-span-2 flex justify-center'>
                <Button
                  size='md'
                  type='button'
                  onClick={handleSubmit}
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
                router.push('/');
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
