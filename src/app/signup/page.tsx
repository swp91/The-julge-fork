'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Input } from '../_components/Input';
import Logo from '../_components/Logo';
import Image from 'next/image';
import Button from '../_components/Button';

const SignUpForm = () => {
  const [userType, setUserType] = useState<'employer' | 'employee'>('employee');

  return (
    <div className='max-w-[350px] mx-auto flex flex-col items-center mt-16 md:mt-36'>
      <Logo width={248} height={45} />
      <div className='w-full mt-10'>
        <Input label='이메일' placeholder='입력' className='w-full' />

        <Input
          label='비밀번호'
          type='password'
          placeholder='입력'
          className='w-full mt-7'
        />

        <Input
          label='비밀번호 확인'
          type='password'
          placeholder='입력'
          className='w-full mt-7'
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
              onClick={() => setUserType('employee')}>
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
              onClick={() => setUserType('employer')}>
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

        <Button className='mt-7' size='xl' type='submit'>
          가입하기
        </Button>
      </div>

      <div className='mt-4 text-16'>
        이미 가입하셨나요?
        <Link href='' className='text-[#5534DA] underline ml-2'>
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
