'use client';
import React from 'react';
import clsx from 'clsx';
import Button from '../Button';

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
  return (
    <div className="bg-red-10 rounded-[12px] shadow-lg p-4 max-w-xs w-full">
      <div className='relative'>
        <img
          src={imageUrl}
          alt={name}
        className='w-full h-[177.71px] object-cover rounded-[12px]'/>
      </div>
      <h1 className='text-14b text-left text-primary mt-2'>식당</h1>
      <h2 className="mt-2 text-24b text-black">{name}</h2>
      <p className= 'flex items-center mt-2 text-14 text-gray-500'>
          <img
            src='./image/path11.svg'
            alt='주소 아이콘'
            className='w-4 h-4 mr-1'
          />
          {address1}
        </p>
      <p className="mt-2 text-14  text-black">{description}</p>
       <div className="flex justify-between mt-4">
        <Button style="bordered" size="md" onClick={() => console.log('편집하기 클릭')}>
          편집하기
        </Button>
        <Button style="default" size="md" onClick={() => console.log('공고 등록하기 클릭')}>
          공고 등록하기
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
