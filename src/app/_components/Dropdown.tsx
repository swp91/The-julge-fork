import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps<T = string> {
  options: T[];
  label: string;
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
  placeholder?: string;
}

export const Dropdown = <T,>({
  options,
  value,
  label,
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
    <div
      className={clsx('relative flex flex-col gap-2', className)}
      ref={dropdownRef}>
      {label && <label className='text-16 text-black'>{label}</label>}
      <button
        onClick={toggleDropdown}
        className={clsx(
          'h-[58px] w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-5 text-left',
          value ? 'text-black' : 'text-gray-400',
        )}>
        <span>{value ? String(value) : placeholder}</span>
        <span className={clsx('ml-2 transform', { 'rotate-180': isOpen })}>
          <Image
            src={'/image/dropdown-triangle.svg'}
            alt='드롭다운 화살표'
            width={16}
            height={16}
            priority
          />
        </span>
      </button>

      {isOpen && options.length > 0 && (
        <ul
          className={clsx(
            'absolute top-full z-50 w-full bg-white border rounded mt-1 max-h-[230px] overflow-auto',
            'custom-scrollbar',
          )}>
          {options.map((option, index) => (
            <li
              key={index}
              className={clsx(
                'py-3 px-4 text-14 text-black text-center cursor-pointer border-b',
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
