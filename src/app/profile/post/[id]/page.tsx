'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import Dropdown from '@/app/_components/Dropdown';
import Modal from '@/app/_components/Modal';
import { LOCATIONS } from '@/app/_constants/constants';
import { updateUserInfo } from '@/app/_api/worker_api';

interface FormData {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

const ProfilePost = (formData?: FormData) => {
  const router = useRouter();
  const { id } = useParams();
  const user_id = id as string;
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      bio: '',
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log('폼 데이터:', data); // 폼 데이터 확인
    try {
      const response = await updateUserInfo(user_id, {
        name: data.name,
        phone: data.phone,
        address: data.address,
        bio: data.bio,
      });
      console.log('응답 데이터:', response.data); // 응답 확인
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('프로필 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    router.push('/profile');
  };

  return (
    <div>
      <Header />
      <div className='max-w-full md:pt-[100px] h-[753px]'>
        <form
          className='max-w-screen-lg mx-auto p-6'
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%', maxWidth: '964px' }}>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-[20px] font-bold'>내 프로필</h1>
            <button type='button'>
              <Image
                src={'/image/closeBtn.svg'}
                alt='닫기버튼'
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6'>
            <Input
              label='이름*'
              placeholder='이름을 입력해주세요'
              value={formData?.name}
              error={errors.name?.message}
              {...register('name', { required: '이름은 필수 항목입니다.' })}
              className='w-full h-[92px] mt-2'
            />

            <Input
              label='연락처*'
              placeholder='연락처를 입력해주세요'
              value={formData?.phone}
              error={errors.phone?.message}
              {...register('phone', {
                required: '연락처는 필수 항목입니다.',
                pattern: {
                  value: /^[0-9-]+$/,
                  message: '올바른 연락처를 입력해주세요.',
                },
              })}
              className='w-full h-[92px] mt-2'
            />

            <Controller
              name='address'
              control={control}
              rules={{ required: '선호 지역을 선택해주세요.' }}
              render={({ field }) => (
                <Dropdown
                  label='선호 지역'
                  options={LOCATIONS}
                  value={formData ? formData.address : field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  className='w-full mt-2'
                />
              )}
            />
          </div>

          <div className='mb-6 mt-2'>
            <div className='flex flex-col'>
              <label
                htmlFor='introduction'
                className='mb-2 text-sm font-medium'>
                소개
              </label>
              <textarea
                id='introduction'
                placeholder='자기소개를 입력해주세요'
                value={formData?.bio}
                {...register('bio')}
                className='w-full h-[187px] border rounded p-2'></textarea>
            </div>
          </div>

          <div className='text-center'>
            <Button type='submit' size='xl'>
              등록하기
            </Button>
          </div>
        </form>
      </div>
      <Footer />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          type='success'
          content={<p>프로필이 성공적으로 등록되었습니다!</p>}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default ProfilePost;
