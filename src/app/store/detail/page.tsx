'use client';

import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header/Header';
import DetailPostCard from '@/app/_components/PostCard/DetailPostCard';
import PostProfile from '@/app/_components/PostProfile';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/_hooks/useAuth';
import { getUserInfo } from '@/app/_api/worker_api';
import { getShopNotices } from '@/app/_api/announce_api';
import PostCard from '@/app/_components/PostCard/PostCard';
import Loading from '@/app/_components/Loding';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

interface announceData {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
  };
}

const StoreDetailPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [storeStatus, setStoreStatus] = useState<boolean>(false);
  const [announcementStatus, setAnnouncementStatus] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [notices, setNotices] = useState<announceData[]>([]);
  const [shopId, setShopId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userId = user?.id;

  useEffect(() => {
    if (user?.type === 'employee') router.replace('/');
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
              response?.data?.items?.map((item: any) => item) || [];
            setNotices(noticeItems);
          } catch (error) {
            console.error('가게 정보를 불러오는데 실패하였습니다.:', error);
          }
        };
        fetchNotices();
      }
      fetchData();
    }
    setIsLoading(false);
  }, [userId, shopId]);

  useEffect(() => {
    if (storeData) {
      setStoreStatus(true);
      setAnnouncementStatus(notices.length > 0);
    } else {
      setStoreStatus(false);
    }
  }, [storeData, notices]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className='bg-gray-50'>
        <div className='mx-auto pt-10 px-4 sm:px-6 lg:px-8 max-w-[90%] sm:max-w-[680px] lg:max-w-[964px] pb-[80px] md:pb-[60px]'>
          {storeStatus ? (
            <div className=' mb-[60px]'>
              <DetailPostCard
                type='store'
                name={storeData?.name || ''}
                address1={storeData?.address1 || ''}
                imageUrl={storeData?.imageUrl || ''}
                shopDescription={storeData?.description || ''}
              />
              {announcementStatus ? (
                <div className='mt-[60px]'>
                  <h2 className='text-28b mb-6'>내가 등록한 공고</h2>
                  {notices.map((notice) => {
                    const startsAt = notice.item.startsAt || 'N/A';
                    const workhour = Number(notice.item.workhour) || 0;
                    const hourlyPay = Number(notice.item.hourlyPay) || 0;
                    const closed =
                      new Date() > new Date(startsAt) ? true : false;
                    return (
                      <Link
                        key={notice.item.id}
                        href={`/announce/detail/${notice.item.id}`}>
                        <PostCard
                          name={storeData?.name || ''}
                          startsAt={startsAt}
                          workhour={workhour}
                          address1={storeData?.address1 || ''}
                          imageUrl={storeData?.imageUrl || ''}
                          hourlyPay={hourlyPay}
                          isPast={closed}
                        />
                      </Link>
                    );
                  })}
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
