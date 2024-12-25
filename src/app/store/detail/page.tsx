'use client';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import PostCard from '@/app/_components/PostCard/PostCardV.1';
import { default as PostCardV2 } from '@/app/_components/PostCard/PostCardV2';
import PostProfile from '@/app/_components/PostProfile';

import { useEffect, useState } from 'react';
import { getShopInfo, getApplicationsForNotice } from '../../_api/owner_api';

interface CardData {
  name: string;
  address: string;
  imageUrl: string;
  description: string;
}

interface StoreData {
  name: string;
  address1: string;
  imageUrl: string;
  description: string;
}

const storeDetailPage: React.FC = () => {
  const [storeStatus, setStoreStatus] = useState<boolean>(false);
  const [announcementStatus, setAnnouncementStatus] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [notices, setNotices] = useState<CardData[]>([]);

  useEffect(() => {
    // 가게 정보를 가져오는 함수
    const fetchShopInfo = async () => {
      try {
        const response = await getShopInfo({ shopId }); // shopId params로 가져오기
        if (response?.data.item) {
          setStoreData(response.data.item);
          setStoreStatus(true);
        } else {
          console.warn('가게 데이터가 없습니다:', response);
          setStoreStatus(false);
        }
      } catch (error) {
        console.error('가게 정보를 가져오는 중 오류 발생:', error);
        setStoreStatus(false);
      }
    };

    fetchShopInfo();
  }, []);

  useEffect(() => {
    // 공고 정보를 가져오는 함수
    const fetchNotices = async () => {
      try {
        const response = await getApplicationsForNotice(
          'shopId', // shopId params로 가져오기
          'noticeId',
          0,
          6,
        );
        if (response?.data.items) {
          const sortedNotices = response.data.items
            .map((item: any) => item.item)
            .filter((item: any) => item && item.notice?.item?.startsAt) // 유효한 데이터만 필터링
            .sort(
              (a: any, b: any) =>
                new Date(b.notice.item.startsAt).getTime() -
                new Date(a.notice.item.startsAt).getTime(),
            );
          setNotices(sortedNotices);
          setAnnouncementStatus(sortedNotices.length > 0);
        } else {
          console.warn('공고 데이터가 없습니다:', response);
          setAnnouncementStatus(false);
        }
      } catch (error) {
        console.error('공고 정보를 가져오는 중 오류 발생:', error);
        setAnnouncementStatus(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {storeStatus ? (
          <div>
            <PostCard
              name={storeData?.name || ''}
              address1={storeData?.address1 || ''}
              imageUrl={storeData?.imageUrl || ''}
              description={storeData?.description || ''}
            />
            {announcementStatus ? (
              <div>
                {notices.map((notice, index) => (
                  <PostCardV2
                    key={index}
                    name={notice.name || ''}
                    address1={notice.address || ''}
                    imageUrl={notice.imageUrl || ''}
                    description={notice.description || ''}
                  />
                ))}
              </div>
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
