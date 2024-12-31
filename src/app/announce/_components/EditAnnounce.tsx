"use client";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import Header from "@/app/_components/Header/Header";
import Footer from "@/app/_components/Footer";
import Input from "@/app/_components/Input";
import Button from "@/app/_components/Button";
import Modal from "@/app/_components/Modal";

import useModal from "@/app/_hooks/useModal";
import { updateShopNotice } from "@/app/_api/owner_api";
import { getShopNoticeDetail } from "@/app/_api/announce_api";

const EditAnnounce = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopId = searchParams.get("shopId") || "";
  const noticeId = searchParams.get("noticeId") || "";
  const { isOpen, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ownerNoticeRequest>({
    mode: "all",
  });

  useEffect(() => {
    if (!shopId || !noticeId) return;

    const fetchAnnounceInfo = async () => {
      try {
        const response = await getShopNoticeDetail(shopId, noticeId);
        const noticeData = response.data.item;

        const startsAtFormatted = new Date(noticeData.startsAt)
          .toISOString()
          .slice(0, 16);

        const initialData = {
          hourlyPay: noticeData.hourlyPay,
          startsAt: startsAtFormatted,
          workhour: noticeData.workhour,
          description: noticeData.description,
        };

        reset(initialData);
      } catch (err) {
        console.error("공고 정보를 불러오는데 실패했어요:", err);
      }
    };

    fetchAnnounceInfo();
  }, [reset]);

  const onSubmit = async (data: ownerNoticeRequest) => {
    if (!shopId) {
      alert("공고 정보를 찾을 수 없어요.");
      return;
    }

    try {
      const localDate = new Date(data.startsAt);
      const utcDate = localDate.toISOString();

      const postData = {
        ...data,
        startsAt: utcDate,
      };

      await updateShopNotice(shopId, noticeId, postData);
      openModal();
    } catch (err) {
      console.error("공고를 수정하는데 오류가 발생했어요:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <div className="w-full bg-gray-50">
          <div
            className={clsx(
              "mx-auto pt-10 pb-[80px] md:py-28 lg:py-36",
              "px-4 md:px-0",
              "max-w-[90%] sm:max-w-[680px] lg:max-w-[964px]",
              "pb-[80px] md:pb-[60px]"
            )}
          >
            <div className="flex justify-between mb-8">
              <div className="text-20b">공고 등록</div>
              <p
                className="cursor-pointer text-18m hover:text-red-40"
                onClick={() =>
                  window.confirm(
                    "공고 수정을 취소하시겠습니까?\n\n작성된 데이터가 사라질 수 있습니다."
                  ) && router.back()
                }
              >
                ✖
              </p>
            </div>

            <div
              className={clsx(
                "relative z-10 grid gap-5 gap-y-7",
                "grid-cols-1 md:grid-cols-2",
                "lg:grid-cols-[1fr_1fr_1fr]"
              )}
            >
              <Input
                label="시급*"
                rightAddon="원"
                className="relative"
                type="number"
                error={errors.hourlyPay?.message}
                {...register("hourlyPay", {
                  required: "기본 시급을 입력해 주세요.",
                  validate: (value) =>
                    value >= 10030 ||
                    "시급은 10,030원 이상만 입력할 수 있어요.",
                  pattern: {
                    value: /^\d+$/,
                    message: "시급은 숫자만 입력할 수 있어요.",
                  },
                })}
              />

              <Input
                label="시작 일시*"
                type="datetime-local"
                error={errors.startsAt?.message}
                {...register("startsAt", {
                  required: "시작 일시를 입력해 주세요.",
                })}
              />

              <Input
                label="업무 시간*"
                rightAddon="시간"
                className="relative"
                error={errors.workhour?.message}
                {...register("workhour", {
                  required: "업무 시간을 입력해 주세요.",
                  pattern: {
                    value: /^\d+$/,
                    message: "업무 시간은 숫자만 입력할 수 있어요.",
                  },
                })}
              />

              <div className="col-span-1 md:col-span-2 flex flex-col gap-2 w-full lg:col-[span_3]">
                <div>공고 설명</div>
                <textarea
                  className={clsx(
                    "h-[153px] w-full border rounded-md pt-4 pl-5 resize-none",
                    "focus:border-black focus:outline-none"
                  )}
                  placeholder="입력"
                  {...register("description")}
                />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center lg:justify-center">
                <Button
                  size="md"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="mt-4"
                >
                  수정하기
                </Button>
              </div>
            </div>

            <Modal
              isOpen={isOpen}
              type="success"
              content="수정이 완료되었습니다."
              onClose={() => {
                closeModal();
                if (noticeId) {
                  router.replace(`/announce/detail/${noticeId}`);
                }
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditAnnounce;
