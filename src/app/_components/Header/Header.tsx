'use client';

import React, { useState, useEffect } from 'react';
import Logo from '../Logo';
import Search from './Search';
import Menu from './Menu';
import { useAuth } from '../../_hooks/useAuth';
import { useWindowWidth } from '../../_hooks/useWindowWidth';
import { getAlarms } from '../../_api/alarm_api';

const Header = () => {
  const { user, logout } = useAuth();
  const windowWidth = useWindowWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeActive, setIsNoticeActive] = useState(false);

  // 알림 상태 가져오기
  useEffect(() => {
    const fetchAlarms = async () => {
      if (user) {
        try {
          const response = await getAlarms(user.id);
          setIsNoticeActive(response.data.items.length > 0);
        } catch (error) {
          console.error('알림 상태를 가져오는 중 오류 발생:', error);
        }
      }
    };

    fetchAlarms();
  }, [user]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      {windowWidth >= 744 ? (
        <div className='h-[102px] md:h-[70px] flex items-center justify-around'>
          <div className='flex items-center gap-9 lg:gap-20'>
            <Logo />
            <Search windowWidth={windowWidth} />
          </div>
          <Menu
            user={user}
            logout={logout}
            toggleModal={toggleModal}
            isModalOpen={isModalOpen}
            isNoticeActive={isNoticeActive}
          />
        </div>
      ) : (
        <div className='h-[102px] md:h-[70px] flex flex-col justify-center'>
          <div className='flex items-center gap-5 justify-around mt-2 mb-5'>
            <Logo />
            <Menu
              user={user}
              logout={logout}
              toggleModal={toggleModal}
              isModalOpen={isModalOpen}
              isNoticeActive={isNoticeActive}
            />
          </div>
          <Search windowWidth={windowWidth} />
        </div>
      )}
    </div>
  );
};

export default Header;
