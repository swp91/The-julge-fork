"use client";

import { useEffect, useState } from "react";
import Footer from "../_components/Footer";
import Header from "../_components/Header/Header";
import PostProfile from "../_components/PostProfile";
import ProfileCard from "./_components/ProfileCard";
import Table from "../_components/Table";
import Pagination from "../_components/Pagination";
import { getUserInfo, getUserApplications } from "../_api/worker_api";
import { tableConfig, WorkerData } from "../_config/tableConfig";
import { ProfileData } from "./_type/type";
import { useAuth } from "../_hooks/useAuth";
import Loading from "../_components/Loding";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  // 상태 관리
  const [profileStatus, setProfileStatus] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 데이터 관리
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [applications, setApplications] = useState<WorkerData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const user_id = user?.id || null;
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        const userInfoResponse = await getUserInfo(user_id!); // user_id는 null이 아님
        const userInfo = userInfoResponse.data.item;
        if (user?.type === "employer") router.replace("/");
        if (userInfo) {
          const { name, email, type, phone, address, bio } = userInfo;

          if (!name || !phone) {
            setProfileStatus(false);
            return;
          }

          setProfileStatus(true);
          setProfileData({
            name: name,
            email: email,
            type: type,
            phone: phone,
            address: address,
            bio: bio || "",
          });
        }

        // 신청 내역 데이터 가져오기
        const applicationsResponse = await getUserApplications(user_id!);
        const applicationItems = applicationsResponse.data.items;

        if (applicationItems.length > 0) {
          setApplicationStatus(true);
          setApplications(
            applicationItems.map((app: any) => ({
              id: app.item.id,
              status: app.item.status,
              date: app.item.createdAt,
              shopName: app.item.shop?.item?.name || "N/A",
              hourlyPay: app.item.wage || "10,030원",
            }))
          );
        }
      } catch (err: any) {
        setError(err.message || "데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user_id) {
      fetchProfileData();
    }
  }, [user_id]);

  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return applications.slice(startIndex, startIndex + itemsPerPage);
  };

  if (!user_id) {
    return null;
  }

  return (
    <div>
      <Header />
      <div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="h-[753px] text-center pt-[300px]">
            오류 발생: {error}
          </div>
        ) : profileStatus ? (
          <div>
            {profileData && (
              <ProfileCard
                profiledata={{
                  name: profileData.name,
                  contact: profileData.phone || "N/A",
                  location: profileData.address || "N/A",
                  introduction: profileData.bio || "N/A",
                }}
                user_id={user_id}
              />
            )}
            {applicationStatus ? (
              <div className="w-[351px] lg:w-[957px] md:w-[680px] mx-auto mb-10">
                <div className="text-black text-[28px] font-bold mb-6 text-left">
                  신청 내역
                </div>
                <Table
                  data={getCurrentPageData()}
                  columns={tableConfig.worker}
                />
                <Pagination
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <PostProfile
                isExist={applicationStatus}
                type="application"
                navigateTo={"/"}
              />
            )}
          </div>
        ) : (
          <div>
            <PostProfile
              isExist={profileStatus}
              type="profile"
              navigateTo={`/profile/post/${user_id}`}
            />
            <div className="h-[358px]"></div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
