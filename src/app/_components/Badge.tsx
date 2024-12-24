import clsx from 'clsx';
import Image from 'next/image';

interface BadgeProps {
  status?: '승인' | '거절' | '대기';
  percent?: number;
  isPast?: boolean;
}

export default function Badge({ status, percent, isPast }: BadgeProps) {
  const badgeClass = clsx(
    'inline-flex items-center justify-center w-fit px-2.5 py-1.5 rounded-full text-14b',
    {
      'bg-blue-10 text-blue-20': status === '승인',
      'bg-red-10 text-red-40': status === '거절',
      'bg-green-10 text-green-20': status === '대기',
      'bg-red-40 text-white': percent !== undefined && percent >= 50 && !isPast,
      'bg-red-20 text-white': percent !== undefined && percent < 50 && !isPast,
      'bg-gray-300 text-white': percent !== undefined && isPast,
    },
  );

  return (
    <span className={badgeClass}>
      {percent !== undefined
        ? `기존 시급보다 ${percent}%`
        : status === '승인'
          ? '승인 완료'
          : status === '거절'
            ? '거절'
            : '대기중'}
      {percent !== undefined && (
        <Image
          src='/image/arrow-up-bold.svg'
          alt='화살표 아이콘'
          width={20}
          height={20}
          priority
        />
      )}
    </span>
  );
}
