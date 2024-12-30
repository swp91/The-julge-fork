'use client';
import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import Image from 'next/image';
import { useWindowWidth } from '../../_hooks/useWindowWidth';

import { useRouter } from 'next/navigation'; // 수정: next/navigation에서 useRouter 가져오기

interface PostCardProps {
  name: string; // 이름
  address1: string; // 주소1
  imageUrl: string; // 이미지 URL
  description: string; // 설명
}

const PostCard: React.FC<PostCardProps> = ({
  name,
  address1,
  imageUrl,
  description,
}) => {
  const windowWidth = useWindowWidth(); // 현재 창 너비 가져오기
  const isDesktop = windowWidth >= 964;

  const router = useRouter(); // 수정: next/navigation의 useRouter 사용

  const handleEdit = () => router.push('/edit');
  const handleRegister = () => router.push('/register');

  if (isDesktop) {
    // 데스크톱 레이아웃
    return (
      <div
        className={clsx(

          'w-full max-w-[964px] p-6 bg-red-10 border rounded-xl shadow-md flex flex-row gap-6'
        )}
      >
        {/* 이미지 */}
        <div className="relative w-[539px] h-[308px] flex-shrink-0 rounded-xl overflow-hidden">
          <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
        </div>

        {/* 텍스트 */}
        <div className="flex-1 flex flex-col justify-between mt-6">
          <div>
            <p className="text-16b text-primary">식당</p>
            <h2 className="mt-2 text-28b text-black">{name}</h2>
            {/* 주소 */}
            {address1 && (
              <p className="flex items-center mt-2 text-16 text-gray-500">
                <Image
                  src="/public/image/path11.svg"
                  alt="주소 아이콘"
                  width={20}
                  height={20}
                  className="mr-1"

                />
                {address1}
              </p>
            )}
            {/* 상세 설명 */}

            <p className="mt-4 line-clamp-4 text-black text-16 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-4 mt-4">
            {/* 버튼 */}
            <Button
              style="bordered"
              size="full"
              className="text-16b bg-white"
              onClick={handleEdit}
            >
              편집하기
            </Button>
            <Button
              style="default"
              size="full"
              className="text-16b"
              onClick={handleRegister}
            >

              공고 등록하기
            </Button>
          </div>
        </div>
      </div>
    );
  }


  // 모바일 및 태블릿 레이아웃
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto">
      <div className="w-[351px] h-auto md:w-[680px] md:h-[677px] p-3 md:p-4 bg-red-10 border border-gray-200 rounded-xl shadow-md">
        <div className="relative w-full h-[200px] md:h-[360px] rounded-xl overflow-hidden">
          <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
        </div>
        <div>
          <h1 className="text-14b text-primary md:text-16b mt-2">식당</h1>
          <h2 className="mt-2 text-24b text-black md:text-28b">{name}</h2>
          <p className="flex items-center mt-2 text-14 text-gray-500">
            <Image
              src="/public/image/path11.svg"
              alt="주소 아이콘"
              width={16}
              height={16}
              className="mr-1"
            />
            {address1}
          </p>
          <p className="mt-2 text-14 text-black">{description}</p>
          <div className="flex justify-between mt-4">
            <Button
              type="button"
              style="bordered"
              size="full"
              className="text-16b bg-white"
              onClick={handleEdit}
            >
              편집하기
            </Button>
            <Button
              type="button"
              style="default"
              size="full"
              className="text-16b"
              onClick={handleRegister}
            >
              공고 등록하기
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostCard;
