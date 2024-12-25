'use client';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import PostCard from '@/app/_components/PostCard/PostCardV.1';
import PostCardV2 from '@/app/_components/PostCard/PostCardV2';
import PostProfile from '@/app/_components/PostProfile';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getShopInfo, getApplicationsForNotice } from '../../_api/owner_api';

interface StoreData {
  name: string;
  address1: string;
  imageUrl: string;
  description: string;
}

const StoreDetailPage: React.FC = () => {
  const { shopId, noticeId } = useParams();
  const router = useRouter();
  const shopIdString = Array.isArray(shopId) ? shopId[0] : shopId; // shopId의 타입이 string|string[]으로 되서 배열을 방지하기 위해 사용
  const noticeIdString = Array.isArray(noticeId) ? noticeId[0] : noticeId;
  const [loading, setLoading] = useState<boolean>(true);
  const [storeStatus, setStoreStatus] = useState<boolean>(false);
  const [announcementStatus, setAnnouncementStatus] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [notices, setNotices] = useState<StoreData[]>([]);

  useEffect(() => {
    if (!shopIdString) {
      alert('가게 ID가 없습니다. 이전 페이지로 이동합니다.');
      router.back();
      return;
    }

    const fetchShopInfo = async () => {
      try {
        setLoading(true);
        const response = await getShopInfo(shopIdString);
        if (response?.data.item) {
          setStoreData(response.data.item);
          setStoreStatus(true);
        } else {
          setStoreStatus(false);
        }
      } catch (error) {
        console.error('가게 정보를 가져오는 중 오류 발생:', error);
        setStoreStatus(false);
      } finally {
        setLoading(false);
      }
    };

    fetchShopInfo();
  }, [shopIdString, router]);

  useEffect(() => {
    if (!shopIdString || !noticeIdString) return;

    const fetchNotices = async () => {
      try {
        const response = await getApplicationsForNotice(
          shopIdString,
          noticeIdString,
          0,
          6,
        );
        if (response?.data.items) {
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

    fetchNotices();
  }, [shopIdString, noticeIdString]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!storeStatus) {
    return <div>가게 정보를 불러올 수 없습니다. 다시 시도해 주세요.</div>;
  }

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
                />
              )}
            </div>
          ) : (
            <div>
              <PostProfile isExist={storeStatus} type={'myStore'} />
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
