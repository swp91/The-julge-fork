'use client';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import PostCard from '@/app/_components/PostCard/PostCardV.1';
import PostCardV2 from '@/app/_components/PostCard/PostCardV2';
import PostProfile from '@/app/_components/PostProfile';

import { useEffect, useState } from 'react';
import { getApplicationsForNotice } from '../../_api/owner_api';
import { useAuth } from '@/app/_hooks/useAuth';
import { getUserInfo } from '@/app/_api/worker_api';

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

  const userId = user?.id;
  let shopId;

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await getUserInfo(userId as string);
          console.log('API Response:', response.data.item.shop?.item);
          setStoreData(response.data.item.shop?.item as StoreData | null);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchData();
    }
  }, [userId]); // userId가 변경될 때만 실행

  useEffect(() => {
    if (storeData) {
      console.log('Updated storeData:', storeData); // storeData 변경 시 실행
      setStoreStatus(true); // storeData가 존재하면 true
    } else {
      setStoreStatus(false); // storeData가 없으면 false
    }
  }, [storeData]); // storeData 변경 감지

  // useEffect(() => {
  //   const fetchShopInfo = async () => {
  //     try {
  //       const response = await getUserInfo(userId as string);
  //       console.log(response);
  //       if (response?.data?.item.shop) {
  //         setStoreData(response.data.item.shop?.item);
  //         setStoreStatus(true);
  //       } else {
  //         setStoreStatus(false);
  //       }
  //     } catch (error) {
  //       console.error('가게 정보를 가져오는 중 오류 발생:', error);
  //       setStoreStatus(false);
  //     }
  //   };

  //   const fetchNotices = async () => {
  //     try {
  //       const response = await getApplicationsForNotice(
  //         shopId as string,
  //         '',
  //         0,
  //         6,
  //       );
  //       if (response?.data?.items) {
  //         const sortedNotices = response.data.items
  //           .map((item: any) => item.item)
  //           .filter((item: any) => item && item.notice?.item?.startsAt)
  //           .sort(
  //             (a: any, b: any) =>
  //               new Date(b.notice.item.startsAt).getTime() -
  //               new Date(a.notice.item.startsAt).getTime(),
  //           );
  //         setNotices(sortedNotices);
  //         setAnnouncementStatus(sortedNotices.length > 0);
  //       } else {
  //         setAnnouncementStatus(false);
  //       }
  //     } catch (error) {
  //       console.error('공고 정보를 가져오는 중 오류 발생:', error);
  //       setAnnouncementStatus(false);
  //     }
  //   };
  //   const fetchData = async () => {
  //     if (userId) {
  //       await fetchShopInfo();
  //       await fetchNotices();
  //     }
  //   };
  //   fetchData();
  //   console.log(user);
  //   console.log('userid: ' + userId);
  //   console.log('shopid: ' + shopId);
  //   console.log('shopdata: ' + storeData);
  // }, []);
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
