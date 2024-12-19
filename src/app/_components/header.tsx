'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import clsx from 'clsx';
import { useLoginStatus } from '../_hooks/useLogrinStatus';
import { useWindowWidth } from '../_hooks/useWindowWidth';
import { useNotifications } from '../_hooks/useNotifications';

const Header = () => {
  const { isLogin, setIsLogin } = useLoginStatus();
  const windowWidth = useWindowWidth();
  const isNotification = useNotifications();

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLogin(false);
  };

  // 검색 Input 부분
  const Search = () => (
    <div
      className={`flex bg-gray-100 rounded-[10px] w-[335px] md:w-[450px] ${
        windowWidth >= 744 ? 'ml-5' : 'mx-auto justify-center'
      }`}>
      <Image
        src={'/image/search.svg'}
        alt='검색'
        width={20}
        height={20}
        className='ml-2'
      />
      <input
        type='text'
        className='min-w-[300px] lg:w-[430px] h-10 bg-gray-100 rounded-[10px] ml-1 p-1'
        placeholder='가게 이름으로 찾아보세요.'
      />
    </div>
  );

  // 우측 메뉴 부분
  const Menu = () => (
    <div>
      {isLogin ? (
        <div className='flex gap-4 lg:gap-10'>
          <Link href={'/store'}>내 가게</Link>
          <button onClick={handleLogout}>로그아웃</button>
          <button>
            <Image
              src={'/image/notification-active.svg'}
              alt='알람 활성화'
              width={24}
              height={24}
              className={`${clsx({ hidden: !isNotification })}`}
            />
            <Image
              src={'/image/notification-inactive.svg'}
              alt='알람 비활성화'
              width={24}
              height={24}
              className={`${clsx({ hidden: isNotification })}`}
            />
          </button>
        </div>
      ) : (
        <div className='flex gap-7 lg:gap-10'>
          <Link href={'/login'}>로그인</Link>
          <Link href={'/signup'}>회원가입</Link>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {windowWidth >= 744 ? (
        <div className='h-[102px] md:h-[70px] flex items-center justify-around'>
          <div className='flex items-center gap-9 lg:gap-20'>
            <Logo />
            <Search />
          </div>
          <Menu />
        </div>
      ) : (
        <div className='h-[102px] md:h-[70px] flex flex-col justify-center'>
          <div className='flex items-center gap-5 justify-around mt-2 mb-5'>
            <Logo />
            <Menu />
          </div>
          <Search />
        </div>
      )}
    </div>
  );
};

export default Header;
