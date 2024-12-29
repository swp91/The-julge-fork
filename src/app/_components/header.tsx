'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import NotificationModal from './NotificationModal/NotificationModal';

import { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // 토큰 디코드 라이브러리
import { useAuth } from '../_hooks/useAuth';
import { useWindowWidth } from '../_hooks/useWindowWidth';
import { useNotifications } from '../_hooks/useNotifications';

const Header = () => {
  const { user, token, logout } = useAuth();
  const windowWidth = useWindowWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 알림 상태 가져오기
  const isNotificationActive = useNotifications();

  // 토큰에서 유저 타입 가져오기
  const getUserType = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<{ type: string }>(token); // 토큰 디코드
      return decoded.type;
    } catch (error) {
      console.error('토큰 decode에 실패하였습니다:', error);
      return null;
    }
  };

  const userType = getUserType();

  // 알림 모달 토글
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 검색 Input 부분
  const Search = () => (
    <div
      className={`flex bg-gray-100 rounded-[10px] w-[335px] md:w-[400px] lg:w-[450px] ${
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
    <div className='relative'>
      {user ? (
        <div className='flex gap-4 lg:gap-10'>
          {userType === 'employer' && <Link href={'/store/detail'}>내 가게</Link>}
          {userType === 'employee' && <Link href={'/profile'}>내 프로필</Link>}
          <button onClick={logout}>로그아웃</button>
          <button onClick={toggleModal}>
            {isNotificationActive ? (
              <Image
                src={'/image/notification-active.svg'}
                alt='알림 활성화'
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={'/image/notification-inactive.svg'}
                alt='알림 비활성화'
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      ) : (
        <div className='flex gap-7 lg:gap-10'>
          <Link href={'/login'}>로그인</Link>
          <Link href={'/signup'}>회원가입</Link>
        </div>
      )}
      {isModalOpen && (
        <NotificationModal
          onClose={toggleModal}
          userId={user?.id || ''}
          isOpen={isModalOpen}
        />
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
