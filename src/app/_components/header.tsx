'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isLogin, setIsLogin] = useState();
  const [isNotification, setIsNotification] = useState({
    activeNotify: 'hidden',
    inactiveNotify: '',
  });
  const Logo = () => {
    return (
      <Link href={'/'}>
        <Image
          src={'/image/logo.svg'}
          alt="the-julge로고"
          width={108}
          height={20}
        />
      </Link>
    );
  };

  return (
    <div className="h-[102px] md:h-[70px] flex items-center justify-around">
      <div className="flex items-center gap-9 md:gap-20">
        <Logo />
        <div className="flex bg-gray-100 rounded-[10px]">
          <Image
            src={'/image/search.svg'}
            alt="검색"
            width={20}
            height={20}
            className=" ml-2"
          />
          <input
            type="text"
            className="min-w-[335px] lg:w-[450px] h-10 bg-gray-100 rounded-[10px] ml-1 p-1"
            placeholder="가게 이름으로 찾아보세요."
          />
        </div>
      </div>
      <div>
        {isLogin ? (
          <div className="flex gap-10">
            <Link href={'/mystore'}>내 가게</Link>
            <button>로그아웃</button>
            <button>
              <Image
                src={'/image/notification-active.svg'}
                alt="알람 활성화"
                width={24}
                height={24}
                className={`${isNotification.activeNotify}`}
              />
              <Image
                src={'/image/notification-inactive.svg'}
                alt="알람 비활성화"
                width={24}
                height={24}
                className={`${isNotification.inactiveNotify}`}
              />
            </button>
          </div>
        ) : (
          <div className="flex gap-10">
            <Link href={'/login'}>로그인</Link>
            <Link href={'/register'}>회원가입</Link>
          </div>
        )}
      </div>
    </div>
  );
}
