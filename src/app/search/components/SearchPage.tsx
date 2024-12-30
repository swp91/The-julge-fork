"use client";

import { useContext, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Dropdown from "@/app/_components/Dropdown";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header/Header";
import { NoticeContext } from "@/app/_context/NoticeContext";
import DetailFilter from "@/app/_components/DetailFilter/DetailFilter";
import Pagination from "@/app/_components/Pagination";
import PostCard from "@/app/_components/PostCard/PostCard";
import Loading from "@/app/_components/Loding";
import Link from "next/link";

const options = [
  "마감임박순",
  "시급많은순",
  "시간적은순",
  "가까운순",
  "가나다순",
];

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const context = useContext(NoticeContext);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    selectedOptions: [] as string[],
    amount: "",
    startDate: "",
  });
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (context) {
      setIsLoading(false); // 데이터가 로드되면 로딩 종료
    }
  }, [context]);

  if (!context) {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트 표시
  }

  const { notices } = context;

  // 검색 필터 적용
  const filteredNotices = useMemo(() => {
    let result = [...notices];

    if (keyword) {
      result = result.filter((notice) =>
        notice.shop.item.name.includes(keyword)
      );
    }

    if (filters.selectedOptions.length > 0) {
      result = result.filter((notice) =>
        filters.selectedOptions.some((option) =>
          notice.shop.item.address1.includes(option)
        )
      );
    }

    if (filters.amount) {
      result = result.filter(
        (notice) => notice.hourlyPay >= parseInt(filters.amount, 10)
      );
    }

    if (filters.startDate) {
      result = result.filter(
        (notice) =>
          new Date(notice.startsAt).getTime() >=
          new Date(filters.startDate).getTime()
      );
    }

    switch (selectedOption) {
      case "마감임박순":
        return result.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );
      case "시급많은순":
        return result.sort((a, b) => b.hourlyPay - a.hourlyPay);
      case "시간적은순":
        return result.sort((a, b) => a.workhour - b.workhour);
      case "가나다순":
        return result.sort((a, b) =>
          a.shop.item.name.localeCompare(b.shop.item.name)
        );
      default:
        return result;
    }
  }, [notices, keyword, selectedOption, filters]);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setCurrentPage(1);
  };

  const handleApplyFilters = (appliedFilters: {
    selectedOptions: string[];
    amount: string;
    startDate: string;
  }) => {
    setFilters(appliedFilters);

    const isReset =
      appliedFilters.selectedOptions.length === 0 &&
      !appliedFilters.amount &&
      !appliedFilters.startDate;

    if (!isReset) {
      setFilterVisible(false);
    }
  };

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredNotices.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredNotices.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트 표시
  }

  return (
    <div>
      <Header />
      <div className="w-full flex flex-col items-center py-10 md:py-[60px] px-3 md:px-8">
        <div className="w-[351px] md:w-[679px] lg:w-[964px] max-w-screen-xl flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row justify-between mb-4 relative">
            <h1 className="text-20b md:text-28b">
              {keyword ? `"${keyword}"에 대한 공고 목록` : "공고 목록"}
            </h1>
            <div className="flex gap-3 mt-3">
              <div>
                <Dropdown
                  options={options}
                  label=""
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="w-auto min-w-[120px] h-[54px] md:h-[66px] text-14b border-none"
                />
              </div>
              <div
                className="h-[34px] w-20 flex justify-center items-center cursor-pointer bg-red-30 text-white rounded-[5px]"
                onClick={() => setFilterVisible(true)}
              >
                상세 필터
              </div>
              <DetailFilter
                isVisible={filterVisible}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
                className="absolute z-50 right-0 top-16"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-1 md:gap-[14px]">
            {currentPosts.length === 0 ? (
              <div className="h-[495px] ">게시물이 없습니다.</div>
            ) : currentPosts.length < 3 ? (
              currentPosts.map((post) => (
                <div key={post.id}>
                  <PostCard
                    name={post.shop.item.name}
                    startsAt={post.startsAt}
                    workhour={post.workhour}
                    address1={post.shop.item.address1}
                    imageUrl={post.shop.item.imageUrl}
                    hourlyPay={post.hourlyPay}
                    originalHourlyPay={post.shop.item.originalHourlyPay}
                    isPast={post.closed}
                  />
                  <div className="h-[128px]"></div>
                </div>
              ))
            ) : (
              currentPosts.map((post) => (
                <Link key={post.id} href={`/announce/detail/${post.id}`}>
                  <PostCard
                    key={post.id}
                    name={post.shop.item.name}
                    startsAt={post.startsAt}
                    workhour={post.workhour}
                    address1={post.shop.item.address1}
                    imageUrl={post.shop.item.imageUrl}
                    hourlyPay={post.hourlyPay}
                    originalHourlyPay={post.shop.item.originalHourlyPay}
                    isPast={post.closed}
                  />
                </Link>
              ))
            )}
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
