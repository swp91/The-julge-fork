'use client';

import { useEffect } from 'react';
import Header from './_components/header';
import DetailPostCard from './_components/PostCard/DetailPostCard';
import { useAuth } from './_hooks/useAuth';
import { getUserInfo } from './_api/worker_api';
import { getNotices } from './_api/announce_api';

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
        const response2 = await getNotices();
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
      <DetailPostCard />
    </div>
  );
}
