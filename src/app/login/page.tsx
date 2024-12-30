'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Input from '../_components/Input';
import Logo from '../_components/Logo';
import Button from '../_components/Button';
import Modal from '../_components/Modal';
import { login } from '../_api/auth_api';
import { useRouter } from 'next/navigation';
import { useAuth } from '../_hooks/useAuth';
import Loading from '../_components/Loding';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginSave, user } = useAuth();

  if (user) router.replace('/');

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      loginSave({
        token: response.data.item.token,
        user: response.data.item.user.item,
      });
      router.push('/');
    } catch (error: any) {
      let errorMessage = '로그인에 실패했습니다 잠시 후 다시 시도해주세요.';
      if (error.status === 404) {
        errorMessage = '비밀번호가 일치하지 않습니다.';
      }
      setModalState({
        isOpen: true,
        content: errorMessage,
      });
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  if (loading) {
    return <Loading />;
  }

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
                message: '비밀번호는 최소 8자 이상이어야 합니다.',
              },
            })}
            error={errors.password?.message}
          />

          <Button className='mt-7' size='xl' type='submit' disabled={loading}>
            {loading ? '로그인 중' : '로그인 하기'}
          </Button>
        </form>

        <div className='mt-5 text-16'>
          회원이 아니신가요?
          <Link href='/signup' className='text-[#5534DA] underline ml-2'>
            회원가입하기
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

export default Login;
