import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  style?: 'default' | 'bordered';
  size?: 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  style = 'default',
  size = 'md',
  children,
  onClick,
  type = 'button',
  className,
  disabled = false,
}) => {
  const approval = children === '승인하기';

  const buttonClass = clsx(
    'rounded-lg font-medium inline-flex items-center justify-center ',
    {
      'bg-red-40 text-white hover:bg-red-30': style === 'default' && !disabled,
      'border border-red-40 text-red-40 ':
        style === 'bordered' && !disabled && !approval,
      'border border-blue-20 text-blue-20 ':
        style === 'bordered' && !disabled && approval,
      'bg-gray-400 text-white cursor-not-allowed': disabled,
    },
    {
      // FULL
      'w-full h-9 md:w-full md:h-12 lg:w-full lg:h-12 text-14b md:text-16b lg:text-16b':
        size === 'full',
      // XL
      'w-full h-12 md:w-[350px] md:h-12 lg:w-[350px] lg:h-12 text-16b':
        size === 'xl',
      // L
      'w-[108px] h-[37px] md:w-[346px] md:h-[47px] lg:w-[346px] lg:h-[47px] text-14b md:text-16b lg:text-16b':
        size === 'lg',
      // M
      'w-full h-12 md:w-[312px] md:h-12 lg:w-[312px] lg:h-12 text-16b':
        size === 'md',
      // S
      'w-[138px] h-[42px] md:w-[120px] md:h-12 lg:w-[120px] lg:h-12 text-14m md:text-16m lg:text-16m':
        size === 'sm',
      // XS
      'w-[80px] h-[38px] text-14b': size === 'xs',
      // XXS
      'w-[69px] h-[32px] text-12 md:w-[92px] md:h-[38px] lg:w-[92px] lg:h-[38px] md:text-14b lg:text-14b':
        size === 'xxs',
    },
    className,
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
      aria-disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
