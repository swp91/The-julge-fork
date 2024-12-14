'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const Logo = () => {
    return (
      <Link href={''}>
        {/*나중에 추가 예정*/}
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
      <div className="flex items-center gap-9">
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
            className="w-[450px] h-10 bg-gray-100 rounded-[10px] ml-1 p-1"
            placeholder="가게 이름으로 찾아보세요."></input>
        </div>
      </div>
      <div>
        <div className="flex gap-10">
          <Link href={''}>로그인</Link>
          <Link href={''}>회원가입</Link>
        </div>
        <div className="hidden gap-10">
          <Link href={''}>{/*나중에 추가 예정*/}내 가게</Link>
          <button>로그아웃</button>
          <button>
            <Image
              src={'/image/notification-active.svg'}
              alt="알람 활성화"
              width={24}
              height={24}
              className="hidden"
            />
            <Image
              src={'/image/notification-inactive.svg'}
              alt="알람 비활성화"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
