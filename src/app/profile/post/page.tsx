'use client';

import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import Image from 'next/image';
import { Input } from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { Dropdown } from '@/app/_components/Dropdown';
import LOCATIONS from '@/app/_constants/Location';
import { useState } from 'react';
import { Modal } from '@/app/_components/Modal';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  contact: string;
  location: string;
  introduction: string;
}

const ProfilePost = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    location: '',
    introduction: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
    console.log('Form Submitted:', formData);
  };

  const closeModal = () => {
    console.log('Modal closed');
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log('Navigating to /profile'); // 디버깅 로그 추가
    setIsModalOpen(false);
    router.push('/profile');
  };

  return (
    <div>
      <Header />
      <div className='max-w-full md:pt-[100px] h-[753px]'>
        <form
          className='max-w-screen-lg mx-auto p-6'
          onSubmit={handleSubmit}
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
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className='w-full h-[92px] mt-2'
            />
            <Input
              label='연락처*'
              placeholder='연락처를 입력해주세요'
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              className='w-full h-[92px] mt-2'
            />
            <Dropdown
              options={LOCATIONS}
              value={formData.location || undefined}
              onChange={(value) => handleChange('location', value)}
              className='w-full h-[92px] mt-2'
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
                value={formData.introduction}
                onChange={(e) => handleChange('introduction', e.target.value)}
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

      {/* 모달 */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          type='success'
          content={<p>프로필이 성공적으로 등록되었습니다!</p>}
          onClose={closeModal}
          onConfirm={handleConfirm} // 확인 버튼에 핸들러 추가
        />
      )}
    </div>
  );
};

export default ProfilePost;
