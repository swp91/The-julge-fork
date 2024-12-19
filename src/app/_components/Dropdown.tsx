'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps<T = string> {
  options: T[];
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
  placeholder?: string;
}

export const Dropdown = <T,>({
  options,
  value,
  onChange,
  className,
  placeholder = '선택',
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // 드롭다운이 열려 있을 때만 이벤트 리스너 추가
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: T) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div className={clsx('relative', className)} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={clsx(
          'w-full flex items-center justify-between bg-white border border-gray-300 rounded py-4 px-5 text-left',
          value ? 'text-black' : 'text-gray-400',
        )}>
        {value !== undefined ? String(value) : placeholder}
        <div className={clsx('transform', { 'rotate-180': isOpen })}>
          <Image
            src={'/image/dropdown-triangle.svg'}
            alt='드롭다운 화살표'
            width={16}
            height={16}
            priority
          />
        </div>
      </button>

      {isOpen && (
        <ul
          className={clsx(
            'custom-scrollbar absolute z-2 w-full bg-white border rounded mt-2 max-h-[230px] overflow-auto',
          )}>
          {options.map((option, index) => (
            <li
              key={index}
              className={clsx(
                'py-3 text-14 text-black text-center cursor-pointer border-b',
                'hover:bg-blue-10 border-gray-200',
              )}
              onClick={() => handleOptionClick(option)}>
              {String(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
