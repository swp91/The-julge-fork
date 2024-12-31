'use client';

import Image from 'next/image';

interface ArrowButtonProps {
  direction: 'first' | 'prev' | 'next' | 'last';
  onClick: () => void;
  isDisabled: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  isDisabled,
}) => {
  const arrowSrc =
    direction === 'first' || direction === 'last'
      ? '/image/icon-pagearrow2.svg'
      : '/image/icon-pagearrow.svg';

  return (
    !isDisabled && (
      <button onClick={onClick}>
        <Image
          src={arrowSrc}
          alt={direction}
          width={20}
          height={20}
          className={
            direction === 'prev' || direction === 'first'
              ? 'transform rotate-180'
              : ''
          }
        />
      </button>
    )
  );
};

export default ArrowButton;
