"use client";
import React, { useState } from "react";
import Image from "next/image";
import Badge from "../Badge";
import Button from "../Button";
import clsx from "clsx";
import useAlbaTimeFormat from "@/app/_hooks/useAlbaTimeFormat";
import { createApplicationForNotice } from "@/app/_api/owner_api";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/_hooks/useAuth";

interface DetailPostCard {
  type?: "store" | "notice";
  name: string;
  startsAt?: string;
  workhour?: number;
  address1: string;
  imageUrl: string;
  hourlyPay?: number;
  shopDescription: string;
  noticeDescription?: string;
  originalHourlyPay?: number;
  closed?: boolean;
  shopId?: string;
  userId?: string;
  noticeId?: string;
  userType?: string;
}

const DetailPostCard: React.FC<DetailPostCard> = ({
  type = "notice",
  name,
  address1,
  imageUrl,
  shopDescription,
  noticeDescription,
  hourlyPay,
  workhour,
  originalHourlyPay,
  startsAt,
  closed,
  shopId,
  userId,
  noticeId,
  userType,
}) => {
  const { user } = useAuth();
  const TimeFormat = useAlbaTimeFormat(startsAt, (workhour ?? 0).toString());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const percent =
    hourlyPay !== undefined && originalHourlyPay !== undefined
      ? Math.round(((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100)
      : undefined;
  const magam = startsAt ? new Date(startsAt) < new Date() : false;
  const handleApplication = async () => {
    if (!user?.address) {
      setModalContent("프로필을 등록해주세요.");
      setIsResultModalOpen(true);
      return;
    }

    if (!shopId || !noticeId) return;

    try {
      setIsLoading(true);
      await createApplicationForNotice(shopId, noticeId);
      setModalContent("신청이 완료되었습니다!");
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        setModalContent("로그인이 필요합니다.");
      } else {
        setModalContent("신청 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setIsResultModalOpen(true);
    }
  };

  const handleEditNotice = () => {
    if (shopId && noticeId) {
      router.push(`/announce/edit?shopId=${shopId}&noticeId=${noticeId}`);
    } else {
      setModalContent("오류가 발생했습니다.");
      setIsResultModalOpen(true);
    }
  };

  console.log(shopId);

  return (
    <div>
      <div>
        {type === "notice" ? (
          <div>
            <h2 className="text-primary text-14b md:text-16b mb-2">식당</h2>
            <span className="text-20b md:text-28b">{name}</span>
          </div>
        ) : (
          <h2 className="text-20b md:text-28b">내 가게</h2>
        )}
      </div>
      <div
        className={clsx(
          "w-[345px] h-auto md:w-[680px] md:h-auto lg:w-[964px] lg:h-[356px] rounded-xl border p-5 md:p-6 flex flex-col lg:flex-row justify-between mt-4 md:mt-6",
          { "bg-red-10": type === "store" }
        )}
      >
        <div className="w-[311px] h-[177px] md:w-[632px] md:h-[361px] lg:w-[539px] lg:h-[308px] relative flex-shrink-0 rounded-xl overflow-hidden">
          <Image src={imageUrl} alt="가게 사진" fill className="object-cover" />
          {closed && (
            <div className="absolute bg-black inset-0 opacity-70 flex justify-center items-center">
              <span className="text-20b md:text-28b text-gray-300">
                {magam ? "지난 공고" : "마감 완료"}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between w-[311px] h-[251px] md:w-[632px] md:h-[276px] lg:w-[346px] lg:h-[308px] mt-4 lg:mt-0">
          <div>
            <h2 className="text-primary text-14b md:text-16b mb-2">
              {type === "notice" ? "시급" : "식당"}
            </h2>
            {type === "notice" ? (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-24b md:text-28b">{hourlyPay}원</span>
                <Badge percent={percent} isPast={closed} />
              </div>
            ) : (
              <h2 className="text-24b md:text-28b">{name}</h2>
            )}
            {type === "notice" && (
              <div className="flex mb-3 gap-2">
                <div className="inline w-4 h-4 md:w-5 md:h-5">
                  <Image
                    src="/image/clock-icon.svg"
                    alt="근무시간"
                    width={20}
                    height={20}
                    className="w-4 h-4 md:w-5 md:h-5"
                  />
                </div>
                <p className="text-14 md:text-16 text-gray-500">
                  {TimeFormat} ({workhour}시간)
                </p>
              </div>
            )}
            <div className="flex mb-3 gap-2">
              <div className="inline w-4 h-4 md:w-5 md:h-5 flex justify-center">
                <Image
                  src="/image/path11.svg"
                  alt="주소"
                  width={16}
                  height={20}
                  className="w-[13px] h-4 md:w-4 md:h-5"
                />
              </div>
              <p className="text-14 md:text-16 text-gray-500">{address1}</p>
            </div>
            <div className="line-clamp-3 text-14 md:text-16 md:line-clamp-2 lg:line-clamp-3">
              {shopDescription}
            </div>
          </div>
          {type === "notice" ? (
            <div>
              {closed ? (
                <Button size="full" disabled>
                  신청 불가
                </Button>
              ) : userId === shopId ? (
                <Button size="full" style="bordered" onClick={handleEditNotice}>
                  공고 편집하기
                </Button>
              ) : userType === "employer" ? (
                <Button size="full" disabled>
                  알바생만 신청가능해요
                </Button>
              ) : (
                <Button size="full" onClick={() => setIsModalOpen(true)}>
                  신청하기
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-2 w-full">
              <Link href={`/store/edit/${shopId}`} className="flex-1">
                <Button size="full" style="bordered">
                  편집하기
                </Button>
              </Link>

              <Link href={`/announce/post?shopId=${shopId}`} className="flex-1">
                <Button size="full">공고 등록하기</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {type === "notice" && (
        <div className="mt-6 w-[345px] md:w-[680px] lg:w-[964px] h-auto rounded-xl bg-gray-100 p-5 md:p-8">
          <h3 className="text-14b md:text-16b">공고 설명</h3>
          <p className="text-14 md:text-16 mt-2">{noticeDescription}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        type="application"
        content={<p>해당 공고를 신청하시겠습니까?</p>}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleApplication}
      />
      <Modal
        isOpen={isResultModalOpen}
        type="success"
        content={<p>{modalContent}</p>}
        onClose={() => setIsResultModalOpen(false)}
      />
    </div>
  );
};

export default DetailPostCard;
