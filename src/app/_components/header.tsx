'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import axios from 'axios';

export default function Header() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  // 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLogin(!!token);
  }, []);

  // 화면 넓이 확인
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 알람 유무 확인
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios
        .get(`/users/{user_id}/alerts`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { offset: 0, limit: 1 }, // 내용은 필요 없으므로 1개만 요청
        })
        .then((response) => {
          const { count } = response.data; // 응답의 count 확인
          setIsNotification(count > 0); // count가 0보다 크면 알림 있음
        })
        .catch((error) => {
          console.error('알림 정보를 가져오는데 실패했습니다.', error);
        });
    }
  }, []);

  // 로고 부분
  const Logo = () => (
    <Link href={'/'}>
      <Image
        src={'/image/logo.svg'}
        alt="the-julge로고"
        width={108}
        height={20}
      />
    </Link>
  );

  // 검색 Input 부분
  const Search = () => (
    <div
      className={`flex bg-gray-100 rounded-[10px] w-[335px] md:w-[450px] ${
        windowWidth >= 744 ? 'ml-5' : 'mx-auto justify-center'
      }`}>
      <Image
        src={'/image/search.svg'}
        alt="검색"
        width={20}
        height={20}
        className="ml-2"
      />
      <input
        type="text"
        className="min-w-[300px] lg:w-[430px] h-10 bg-gray-100 rounded-[10px] ml-1 p-1"
        placeholder="가게 이름으로 찾아보세요."
      />
    </div>
  );

  // 우측 메뉴 부분
  const Menu = () => {
    // 로그아웃 함수
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsLogin(false);
      setIsNotification(false);
    };

    return (
      <div>
        {isLogin ? (
          <div className="flex gap-4 lg:gap-10">
            <Link href={'/mystore'}>내 가게</Link>
            <button onClick={handleLogout}>로그아웃</button>
            <button>
              <Image
                src={'/image/notification-active.svg'}
                alt="알람 활성화"
                width={24}
                height={24}
                className={`${clsx({ hidden: !isNotification })}`}
              />
              <Image
                src={'/image/notification-inactive.svg'}
                alt="알람 비활성화"
                width={24}
                height={24}
                className={`${clsx({ hidden: isNotification })}`}
              />
            </button>
          </div>
        ) : (
          <div className="flex gap-7 lg:gap-10">
            <Link href={'/login'}>로그인</Link>
            <Link href={'/register'}>회원가입</Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {windowWidth >= 744 ? (
        <div className="h-[102px] md:h-[70px] flex items-center justify-around">
          <div className="flex items-center gap-9 lg:gap-20">
            <Logo />
            <Search />
          </div>
          <Menu />
        </div>
      ) : (
        <div className="h-[102px] md:h-[70px] flex flex-col justify-center">
          <div className="flex items-center gap-5 justify-around mt-2 mb-5">
            <Logo />
            <Menu />
          </div>
          <Search />
        </div>
      )}
    </div>
  );
}
