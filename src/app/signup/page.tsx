'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import clsx from 'clsx';
import { Input } from '../_components/Input';
import Logo from '../_components/Logo';
import Image from 'next/image';
import Button from '../_components/Button';
import { register as registerApi } from '../_api/auth_api';
import { Modal } from '../_components/Modal';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterRequest>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      type: 'employee',
    },
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: '',
    redirectToLogin: false,
  });
  const userType = watch('type');
  const password = watch('password');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    setLoading(true);
    try {
      const { email, password, type } = data;
      await registerApi({ email, password, type });
      setModalState({
        isOpen: true,
        content: '가입이 완료되었습니다!',
        redirectToLogin: true,
      });
    } catch (error: any) {
      let errorMessage = '회원가입에 실패했습니다 잠시 후 다시 이용해 주세요.';
      if (error.status === 409) {
        errorMessage = '이미 사용중인 이메일입니다.';
      }
      setModalState({
        isOpen: true,
        content: errorMessage,
        redirectToLogin: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
    if (modalState.redirectToLogin) {
      router.push('/login');
    }
  };

  return (
    <>
      <div className='max-w-[350px] mx-auto flex flex-col items-center mt-16 md:mt-36'>
        <Logo width={248} height={45} />
        <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-10'>
          <Input
            label='이메일'
            placeholder='입력'
            className='w-full'
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '유효한 이메일 형식이 아닙니다.',
              },
            })}
            error={errors.email?.message}
          />

          <Input
            label='비밀번호'
            type='password'
            placeholder='입력'
            className='w-full mt-7'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 6자 이상이어야 합니다.',
              },
            })}
            error={errors.password?.message}
          />

          <Input
            label='비밀번호 확인'
            type='password'
            placeholder='입력'
            className='w-full mt-7'
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
            error={errors.confirmPassword?.message}
          />

          <div className='w-full mt-6'>
            <p className='text-16 mb-2'>회원 유형</p>
            <div className='flex gap-4'>
              <button
                type='button'
                className={clsx(
                  'flex-1 flex items-center justify-center gap-2 py-[13px] rounded-full border border-gray-30 text-center text-14',
                  userType === 'employee' ? 'border-primary' : '',
                )}
                onClick={() => setValue('type', 'employee')}>
                <Image
                  src={
                    userType === 'employee'
                      ? '/image/icon-checked.svg'
                      : '/image/icon-unchecked.svg'
                  }
                  alt={userType === 'employee' ? '체크' : '체크안함'}
                  width={20}
                  height={20}
                />
                알바님
              </button>

              <button
                type='button'
                className={clsx(
                  'flex-1 flex items-center justify-center gap-2 py-[13px] rounded-full border border-gray-30 text-center text-14',
                  userType === 'employer' ? 'border-primary' : '',
                )}
                onClick={() => setValue('type', 'employer')}>
                <Image
                  src={
                    userType === 'employer'
                      ? '/image/icon-checked.svg'
                      : '/image/icon-unchecked.svg'
                  }
                  alt={userType === 'employer' ? '체크' : '체크안함'}
                  width={20}
                  height={20}
                />
                사장님
              </button>
            </div>
          </div>

          <Button className='mt-7' size='xl' type='submit' disabled={loading}>
            {loading ? '가입 중' : '가입하기'}
          </Button>
        </form>

        <div className='mt-4 text-16'>
          이미 가입하셨나요?
          <Link href='/login' className='text-[#5534DA] underline ml-2'>
            로그인하기
          </Link>
        </div>
      </div>
      <Modal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type='success'
        content={modalState.content}
      />
    </>
  );
};

export default SignUpForm;
