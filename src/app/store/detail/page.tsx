'use client';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import PostProfile from '@/app/_components/PostProfile';
import { useState } from 'react';

const storeDetailPage = () => {
  const [storeStatus, setStoreStatus] = useState(false);
  const [announcementStatus, setAnnouncementStatus] = useState(false);
  return (
    <div>
      <Header />
      <div>
        {storeStatus ? (
          <div>
            {/*가게 프로필 카드 넣을 공간*/}
            {announcementStatus ? (
              <div>{/*등록된 공고 넣을 공간*/}</div>
            ) : (
              <PostProfile isExist={announcementStatus} type={'announcement'} />
            )}
          </div>
        ) : (
          <div>
            <PostProfile isExist={storeStatus} type={'myStore'} />
            <div className='h-[358px]'></div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default storeDetailPage;
