'use client';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import PostCard from '@/app/_components/PostCard/PostCardV.1';
import PostCardV2 from '@/app/_components/PostCard/PostCardV2';
import PostProfile from '@/app/_components/PostProfile';

import { useEffect, useState } from 'react';
import { getShopInfo, getApplicationsForNotice } from '../../_api/owner_api';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/app/_hooks/useAuth';
import axios from 'axios';
import { getUserInfo } from '@/app/_api/worker_api';

interface StoreData {
  id: string;
  name: string;
  address1: string;
  imageUrl: string;
  description: string;
}

const StoreDetailPage: React.FC = () => {
  const { user } = useAuth();
  const [storeStatus, setStoreStatus] = useState<boolean>(false);
  const [announcementStatus, setAnnouncementStatus] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [notices, setNotices] = useState<StoreData[]>([]);

  const userId = user?.id;
  const shopId = user?.shop?.item.id;

  const fetchShopInfo = async () => {
    try {
      const response = await getUserInfo(userId as string);
      if (response?.data?.item.shop) {
        setStoreData(response.data.item.shop?.item);
        setStoreStatus(true);
      } else {
        setStoreStatus(false);
      }
    } catch (error) {
      console.error('가게 정보를 가져오는 중 오류 발생:', error);
      setStoreStatus(false);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await getApplicationsForNotice(
        shopId as string,
        '',
        0,
        6,
      );
      if (response?.data?.items) {
        const sortedNotices = response.data.items
          .map((item: any) => item.item)
          .filter((item: any) => item && item.notice?.item?.startsAt)
          .sort(
            (a: any, b: any) =>
              new Date(b.notice.item.startsAt).getTime() -
              new Date(a.notice.item.startsAt).getTime(),
          );
        setNotices(sortedNotices);
        setAnnouncementStatus(sortedNotices.length > 0);
      } else {
        setAnnouncementStatus(false);
      }
    } catch (error) {
      console.error('공고 정보를 가져오는 중 오류 발생:', error);
      setAnnouncementStatus(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (shopId) {
        await fetchShopInfo();
        await fetchNotices();
      }
    };
    fetchData();
  }, [shopId]);
  console.log('userid' + userId);
  console.log(shopId);
  return (
    <>
      <Header />
      <div className='bg-gray-50'>
        <div className='mx-auto pt-10 px-4 sm:px-6 lg:px-8 max-w-[90%] sm:max-w-[680px] lg:max-w-[964px] pb-[80px] md:pb-[60px]'>
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
                      address1={notice.address1 || ''}
                      imageUrl={notice.imageUrl || ''}
                      description={notice.description || ''}
                    />
                  ))}
                </div>
              ) : (
                <PostProfile
                  isExist={announcementStatus}
                  type={'announcement'}
                  navigateTo={`/announce/post`}
                />
              )}
            </div>
          ) : (
            <div>
              <PostProfile
                isExist={storeStatus}
                type={'myStore'}
                navigateTo={'/store/post'}
              />
              <div className='h-[358px]'></div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoreDetailPage;
