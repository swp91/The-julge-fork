'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeContext } from '@/app/_context/NoticeContext';
import DetailPostCard from '@/app/_components/PostCard/DetailPostCard';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { getUserInfo } from '@/app/_api/worker_api';
import { useAuth } from '@/app/_hooks/useAuth';
import { getApplicationsForNotice } from '@/app/_api/owner_api';
import Table from '@/app/_components/Table';
import Pagination from '@/app/_components/Pagination';
import { tableConfig, OwnerData } from '@/app/_config/tableConfig';

const Page = () => {
  const { id } = useParams();
  const noticeContext = useContext(NoticeContext) || { notices: [] };
  const { notices } = noticeContext;
  const [userShopid, setUserShopid] = useState<string>();
  const [applications, setApplications] = useState<OwnerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 5;

  const { user } = useAuth();
  const currentNotice = notices.find((notice) => notice.id === id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id) {
          const response = await getUserInfo(user.id);
          setUserShopid(response.data.item.shop?.item.id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  useEffect(() => {
    if (
      userShopid &&
      currentNotice?.shop.item.id &&
      userShopid === currentNotice.shop.item.id
    ) {
      const fetchApplications = async () => {
        try {
          const response = await getApplicationsForNotice(
            userShopid,
            currentNotice.id,
            0,
            100,
          );

          const transformedData = response.data.items.map((application) => ({
            name: application.item.user?.item.name || '익명',
            introduction: application.item.user?.item.bio || '소개 없음',
            phone: application.item.user?.item.phone || '전화번호 없음',
            status: application.item.status,
          }));

          setApplications(transformedData);
          setTotalPages(Math.ceil(transformedData.length / itemsPerPage));
        } catch (err) {
          console.error('Error fetching applications:', err);
        }
      };

      fetchApplications();
    }
  }, [userShopid, currentNotice]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const isApplicationView =
    userShopid &&
    currentNotice?.shop.item.id &&
    userShopid === currentNotice.shop.item.id;

  return (
    <>
      <Header />
      <div className='flex justify-center py-10'>
        {currentNotice && (
          <DetailPostCard
            name={currentNotice?.shop.item.name}
            noticeDescription={currentNotice.description}
            shopDescription={currentNotice.shop.item.description}
            hourlyPay={currentNotice.hourlyPay}
            imageUrl={currentNotice.shop.item.imageUrl}
            address1={currentNotice.shop.item.address1}
            originalHourlyPay={currentNotice.shop.item.originalHourlyPay}
            startsAt={currentNotice.startsAt}
            workhour={currentNotice.workhour}
            shopId={currentNotice.shop.item.id}
            userId={userShopid}
          />
        )}
      </div>

      {isApplicationView && (
        <section className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
          <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col'>
            <h2 className='text-20b md:text-28b'>신청자 목록</h2>
            {paginatedData.length > 0 ? (
              <>
                <Table data={paginatedData} columns={tableConfig.owner} />
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className='flex justify-center items-center'>
                <div className='p-10 md:p-20'>아직 신청자가 없습니다.</div>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default Page;
