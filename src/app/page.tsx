'use client';

import { useEffect } from 'react';
import Header from './_components/Header';
import { useAuth } from './_hooks/useAuth';
import { getUserInfo } from './_api/worker_api';
import { getNotices } from './_api/announce_api';
import Footer from './_components/Footer';
import UserNotice from './announce/_components/UserNotice';
import AllNotices from './announce/_components/AllNotices';

export default function Home() {
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    const getUserData = async () => {
      if (!user) return;
      try {
        const response = await getUserInfo(user.id);
        console.log('유저 정보:', response.data);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    };
    const getTEst = async () => {
      try {
        const response2 = await getNotices(0, 100);
        console.log('공고전체', response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
    getTEst();
  }, [user]);

  return (
    <div>
      <Header />
      <UserNotice />
      <AllNotices />
      <Footer />
    </div>
  );
}
