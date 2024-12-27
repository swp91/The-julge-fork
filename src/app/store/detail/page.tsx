'use client';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import PostCard from '@/app/_components/PostCard/PostCardV.1';
import PostCardV2 from '@/app/_components/PostCard/PostCardV2';
import PostProfile from '@/app/_components/PostProfile';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/_hooks/useAuth';
import { getUserInfo } from '@/app/_api/worker_api';
import { getShopNotices } from '@/app/_api/announce_api';

interface StoreData {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  imageUrl: string;
  description: string;
  originalHourlyPay: number;
}

const StoreDetailPage: React.FC = () => {
  const { user } = useAuth();
  const [storeStatus, setStoreStatus] = useState<boolean>(false);
  const [announcementStatus, setAnnouncementStatus] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [notices, setNotices] = useState<StoreData[]>([]);
  const [shopId, setShopId] = useState<string>();

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await getUserInfo(userId as string);
          setStoreData(response.data.item.shop?.item as StoreData | null);
          setShopId(response.data.item.shop?.item.id);
        } catch (error) {
          console.error('유저 정보를 불러오는데 실패하였습니다.:', error);
        }
      };
      if (shopId) {
        const fetchNotices = async () => {
          try {
            const response = await getShopNotices(shopId, 0, 6);
            const noticeItems =
              response?.data?.items?.map((item: any) => item.item) || [];
            setNotices(noticeItems);
          } catch (error) {
            console.error('가게 정보를 불러오는데 실패하였습니다.:', error);
          }
        };
        fetchNotices();
      }
      fetchData();
    }
  }, [userId, shopId]);

  useEffect(() => {
    if (storeData) {
      setStoreStatus(true);
      if (notices) {
        setAnnouncementStatus(true);
        console.log(notices);
      } else {
        setAnnouncementStatus(false);
      }
    } else {
      setStoreStatus(false);
    }
  }, [storeData, notices]);
  return (
    <>
      <Header />
      <div className='bg-gray-50'>
        <div className='mx-auto pt-10 px-4 sm:px-6 lg:px-8 max-w-[90%] sm:max-w-[680px] lg:max-w-[964px] pb-[80px] md:pb-[60px]'>
          {storeStatus ? (
            <div className=' mb-[60px]'>
              <h2 className='text-28b mb-6'>내 가게</h2>
              <PostCard
                name={storeData?.name || ''}
                address1={storeData?.address1 || ''}
                imageUrl={storeData?.imageUrl || ''}
                description={storeData?.description || ''}
              />
              {announcementStatus ? (
                <div className='mt-[60px]'>
                  <h2 className='text-28b mb-6'>내가 등록한 공고</h2>
                  {notices.map((notice, index) => (
                    <PostCardV2
                      key={index}
                      name={notice.name || ''}
                      address1={notice.address1 || ''}
                      imageUrl={storeData?.imageUrl || ''}
                      description={notice.description || ''}
                    />
                  ))}
                </div>
              ) : (
                <PostProfile
                  isExist={announcementStatus}
                  type={'announcement'}
                  navigateTo={`/announce/post?shopId=${shopId}`}
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
