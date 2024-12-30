'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import NotificationModal from './NotificationModal/NotificationModal';

import { useEffect, useState } from 'react';
import { useAuth } from '../_hooks/useAuth';
import { useWindowWidth } from '../_hooks/useWindowWidth';
import { getAlarms } from '../_api/alarm_api';

const Header = () => {
  const { user, logout } = useAuth();
  const windowWidth = useWindowWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeActive, setIsNoticeActive] = useState(false);
  const userType = user?.type;

  // 알림 상태 가져오기
  useEffect(() => {
    const fetchAlarms = async () => {
      if (user) {
        try {
          const response = await getAlarms(user.id);
          // 알림이 있는지 확인 (items 배열에 값이 있는지만 확인)
          setIsNoticeActive(response.data.items.length > 0);
        } catch (error) {
          console.error('알림 상태를 가져오는 중 오류 발생:', error);
        }
      }
    };

    fetchAlarms();
  }, [user]);

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
        fill
        className='ml-2'
      />
      <input
        type='text'
        className='min-w-[280px] lg:w-[430px] h-10 bg-gray-100 rounded-[10px] ml-1 p-1'
        placeholder='가게 이름으로 찾아보세요.'
      />
    </div>
  );

  // 우측 메뉴 부분
  const Menu = () => (
    <div className='relative'>
      {user ? (
        <div className='flex gap-4 lg:gap-10'>
          {userType === 'employer' && (
            <Link href={'/store/detail'}>내 가게</Link>
          )}
          {userType === 'employee' && <Link href={'/profile'}>내 프로필</Link>}
          <button onClick={logout}>로그아웃</button>
          <button onClick={toggleModal}>
            {isNoticeActive ? (
              <Image
                src={'/image/notification-active.svg'}
                alt='알림 활성화'
                width={24}
                fill
              />
            ) : (
              <Image
                src={'/image/notification-inactive.svg'}
                alt='알림 비활성화'
                width={24}
                fill
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
