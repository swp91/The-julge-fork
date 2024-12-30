'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeContext } from '@/app/_context/NoticeContext';
import DetailPostCard from '@/app/_components/PostCard/DetailPostCard';
import PostCard from '@/app/_components/PostCard/PostCard';
import Header from '@/app/_components/Header/Header';
import Footer from '@/app/_components/Footer';
import { getUserInfo } from '@/app/_api/worker_api';
import { useAuth } from '@/app/_hooks/useAuth';
import {
  getApplicationsForNotice,
  updateApplicationStatus,
} from '@/app/_api/owner_api';
import Table from '@/app/_components/Table';
import Pagination from '@/app/_components/Pagination';
import { tableConfig, OwnerData } from '@/app/_config/tableConfig';
import {
  getRecentNotices,
  saveToRecentNotices,
} from '@/app/_context/util/recentNotices';
import Link from 'next/link';
import Modal from '@/app/_components/Modal';

const Page = () => {
  const { id } = useParams();
  const noticeContext = useContext(NoticeContext) || { notices: [] };
  const { notices } = noticeContext;
  const [userShopid, setUserShopid] = useState<string>();
  const [applications, setApplications] = useState<OwnerData[]>([]);
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

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
            applicationId: application.item.id,
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

  useEffect(() => {
    const fetchRecentData = () => {
      const recentData = getRecentNotices();
      setRecentNotices(recentData);
    };

    if (currentNotice) {
      saveToRecentNotices(currentNotice);
    }

    fetchRecentData();
  }, [currentNotice]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplicationStatusChange = async (
    applicationId: string,
    newStatus: 'accepted' | 'rejected',
  ) => {
    if (!userShopid || !currentNotice?.id) return;

    try {
      await updateApplicationStatus(
        userShopid,
        currentNotice.id,
        applicationId,
        {
          status: newStatus,
        },
      );

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.applicationId === applicationId
            ? { ...application, status: newStatus }
            : application,
        ),
      );

      setModalContent(
        `지원 상태가 '${
          newStatus === 'accepted' ? '승인됨' : '거절됨'
        }'으로 변경되었습니다.`,
      );
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error updating application status:', err);
      setModalContent('상태 변경에 실패했습니다. 다시 시도해주세요.');
      setIsModalOpen(true);
    }
  };

  const paginatedData = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const isApplicationView =
    userShopid &&
    currentNotice?.shop.item.id &&
    userShopid === currentNotice.shop.item.id;

  console.log(currentNotice);

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
            noticeId={currentNotice.id}
            userType={user?.type}
            closed={currentNotice.closed}
          />
        )}
      </div>

      {isApplicationView ? (
        <section className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
          <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col'>
            <h2 className='text-20b md:text-28b'>신청자 목록</h2>
            {paginatedData.length > 0 ? (
              <>
                <Table
                  data={paginatedData.map((item) => ({
                    ...item,
                    onStatusChange: handleApplicationStatusChange,
                  }))}
                  columns={tableConfig.owner}
                />
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
      ) : (
        <section className='w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8'>
          <div className='w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col items-center'>
            <div className='w-full flex flex-col md:flex-row justify-between mb-4 relative'>
              <h2 className='text-20b md:text-28b'>최근에 본 공고</h2>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 w-full gap-1 md:gap-[14px]'>
              {recentNotices.map((post) => (
                <Link href={`/announce/detail/${post.id}`} key={post.id}>
                  <PostCard
                    name={post.shop.item.name}
                    startsAt={post.startsAt}
                    workhour={post.workhour.toString()}
                    address1={post.shop.item.address1}
                    imageUrl={post.shop.item.imageUrl}
                    hourlyPay={post.hourlyPay}
                    originalHourlyPay={post.shop.item.originalHourlyPay}
                    isPast={post.closed}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Modal
        isOpen={isModalOpen}
        type='alert'
        content={modalContent}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </>
  );
};

export default Page;
