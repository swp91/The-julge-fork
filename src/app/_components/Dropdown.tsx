import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  options: string[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const Dropdown = ({
  options,
  label,
  value,
  onChange,
  className,
  placeholder = '선택',
}: DropdownProps) => {
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

  const handleOptionClick = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div
      className={clsx('relative flex flex-col gap-2 w-full', className)}
      ref={dropdownRef}>
      {label && <label className='text-16 text-black'>{label}</label>}
      <button
        onClick={toggleDropdown}
        className={clsx(
          'w-full flex items-center justify-between bg-white border border-gray-300 rounded-md py-4 px-5 text-left',
          value ? 'text-black' : 'text-gray-400',
        )}>
        {value || placeholder}
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
            'w-full custom-scrollbar absolute top-full z-20 w-full bg-white border rounded-md mt-1 max-h-[230px] overflow-auto',
          )}>
          {options.map((option) => (
            <li
              key={option}
              className={clsx(
                'py-3 text-14 text-black text-center cursor-pointer border-b',
                'hover:bg-blue-10 border-gray-200',
              )}
              onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
