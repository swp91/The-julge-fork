'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NotificationModal from '../NotificationModal/NotificationModal';

interface MenuProps {
  user: { id: string; type: string } | null;
  logout: () => void;
  toggleModal: () => void;
  isModalOpen: boolean;
  isNoticeActive: boolean;
}

const Menu: React.FC<MenuProps> = ({
  user,
  logout,
  toggleModal,
  isModalOpen,
  isNoticeActive,
}) => {
  const userType = user?.type;

  return (
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
};

export default Menu;
