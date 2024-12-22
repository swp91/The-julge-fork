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

interface ProfileData {
  name?: string;
  email: string;
  type: string;
  phone?: string;
  address?: string;
  bio?: string;
}

interface Application {
  id: string;
  status: string;
  date: string | undefined;
  shopName: string;
  hourlyPay?: string;
}

const ProfilePage = () => {
  const [profileStatus, setProfileStatus] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 한 페이지에 표시할 항목 수
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        // 프로필 데이터 가져오기
        const userInfoResponse = await getUserInfo('user_Id');
        const userInfo = userInfoResponse.data.item;

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

        setApplications(
          applicationItems.map((app: any) => ({
            id: app.item.id,
            status: app.item.status,
            date: app.item.createdAt, // createdAt 제거
            shopName: app.item.shop?.item?.name || 'N/A',
            hourlyPay: app.item.wage || '10,030원', // wage 제거
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
