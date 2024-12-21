'use client';

import Image from 'next/image';
import clsx from 'clsx';

interface ImageUploaderProps {
  image: string;
  label?: string;
  onImageChange: (image: string) => void;
  onImageDelete: () => void;
  mode?: 'add' | 'edit';
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  label,
  onImageChange,
  onImageDelete,
  mode = 'add',
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (image) URL.revokeObjectURL(image);
    if (file) onImageChange(URL.createObjectURL(file));
  };

  return (
    <div
      className={clsx(
        'relative w-full col-span-1 flex flex-col gap-2 h-[200px] rounded-xl',
        'md:col-span-2 md:h-[276px] md:max-w-[483px]',
      )}>
      {label && <label className='text-16 text-black'>{label}</label>}
      {image ? (
        <>
          <div className='relative w-full h-full'>
            <div
              className={clsx(
                'rounded-lg w-full h-full',
                mode === 'edit' && 'bg-[#000000B2] opacity-70',
                mode === 'add' && 'bg-transparent',
              )}>
              <Image
                src={image}
                alt='가게 이미지'
                className='rounded-lg object-cover w-full h-full'
                layout='fill'
              />
            </div>
          </div>
          {mode === 'add' ? (
            <Image
              src='/image/cancel-icon.svg'
              alt='삭제'
              width={24}
              height={24}
              className={clsx(
                'absolute top-2 right-2 cursor-pointer',
                'bg-white border rounded-full p-1',
              )}
              onClick={onImageDelete}
            />
          ) : (
            <label
              className={clsx(
                'flex flex-col items-center justify-center gap-[11px]',
                'absolute inset-0 text-white cursor-pointer',
              )}>
              <Image
                src='/image/edit-image.svg'
                alt='이미지 변경'
                width={32}
                height={32}
              />
              <span className='ml-2 text-white'>이미지 변경하기</span>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
              />
            </label>
          )}
        </>
      ) : (
        <label
          className={clsx(
            'flex flex-col items-center justify-center gap-[11px]',
            'w-full h-full bg-gray-100 border border-gray-300',
            'rounded-xl cursor-pointer',
          )}>
          <Image
            src='/image/add-image.svg'
            alt={mode === 'add' ? '추가' : '변경'}
            width={32}
            height={32}
          />
          <span className='ml-2 text-gray-400'>
            {mode === 'add' ? '이미지 추가하기' : '이미지 변경하기'}
          </span>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
