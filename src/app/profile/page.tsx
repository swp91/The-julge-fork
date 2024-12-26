'use client';

import { useEffect, useState } from 'react';
import Footer from '../_components/Footer';
import Header from '../_components/Header';
import PostProfile from '../_components/PostProfile';
import ProfileCard from './_components/ProfileCard';
import Table from '../_components/Table';
import Pagination from '../_components/Pagination';
import { getUserInfo, getUserApplications } from '../_api/worker_api';
import { tableConfig } from '../_config/tableConfig';
import { ProfileData, WorkerData } from './_type/type';
import { useParams, useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const user_id = id as string;
  //상태 관리
  const [profileStatus, setProfileStatus] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 데이터 관리
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [applications, setApplications] = useState<WorkerData[]>([]);
  // 페이지 네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 한 페이지에 표시할 항목 수

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        // 프로필 데이터 가져오기
        const userInfoResponse = await getUserInfo('user_Id');
        const userInfo = userInfoResponse.data.item;
        if (userInfo) setProfileStatus(true);
        setProfileData({
          name: userInfo.name,
          email: userInfo.email,
          type: userInfo.type,
          phone: userInfo.phone || '',
          address: userInfo.address || '',
          bio: userInfo.bio || '',
        });

        // 신청 내역 데이터 가져오기
        const applicationsResponse = await getUserApplications('user_Id');
        const applicationItems = applicationsResponse.data.items;
        if (applicationItems) setApplicationStatus(true);
        setApplications(
          applicationItems.map((app: any) => ({
            id: app.item.id,
            status: app.item.status,
            date: app.item.createdAt,
            shopName: app.item.shop?.item?.name || 'N/A',
            hourlyPay: app.item.wage || '10,030원',
          })),
        );
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return applications.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Header />
      <div>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div className='h-[753px] text-center pt-[300px]'>
            오류 발생: {error}
          </div>
        ) : profileStatus ? (
          <div>
            {profileData && (
              <ProfileCard
                name={profileData.name}
                contact={profileData.phone || 'N/A'}
                location={profileData.address || 'N/A'}
                introduction={profileData.bio || 'N/A'}
              />
            )}
            {applicationStatus ? (
              <div className='w-[351px] lg:w-[957px] md:w-[680px] mx-auto mb-10'>
                <div className='text-black text-[28px] font-bold mb-6 text-left'>
                  신청 내역
                </div>
                <Table
                  data={getCurrentPageData()}
                  columns={tableConfig.worker}
                />
                <Pagination
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            ) : (
              <PostProfile isExist={applicationStatus} type={'application'} />
            )}
          </div>
        ) : (
          <div>
            <PostProfile isExist={profileStatus} type={'profile'} />
            <div className='h-[358px]'></div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
