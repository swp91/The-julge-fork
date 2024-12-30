'use client';

import { useState } from 'react';
import Input from './Input';
import Image from 'next/image';
import { LOCATIONS } from '../_constants/constants';
import Button from './Button';
interface DetailFilterProps {
  isVisible: boolean;
  onClose?: () => void;
  className?: string;
  onApply?: (filters: {
    selectedOptions: string[];
    amount: string;
    startDate: string;
  }) => void;
}

const DetailFilter: React.FC<DetailFilterProps> = ({
  isVisible,
  onClose,
  onApply,
  className,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const removeOption = (option: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleClose = () => {
    setSelectedOptions([]);
    setAmount('');
    setStartDate('');
    onClose?.();
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setAmount('');
    setStartDate('');

    onApply?.({
      selectedOptions: [],
      amount: '',
      startDate: '',
    });
  };

  const handleApply = () => {
    onApply?.({ selectedOptions, amount, startDate });
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <form
      className={`p-4 max-w-[375px] max-h-[840px] mx-auto bg-white rounded-[10px] shadow-md ${className}`}>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>상세 필터</h2>
        <button type='button' className='text-gray-500' onClick={handleClose}>
          <Image
            src={'/image/closeBtn.svg'}
            alt='닫힘버튼'
            width={13}
            height={13}
          />
        </button>
      </div>
      <div className='mb-4'>
        <label htmlFor='location' className='block text-sm text-gray-700 mb-2'>
          위치
        </label>
        <div className='custom-scrollbar grid grid-cols-2 gap-2 p-2 border rounded-md h-[258px] overflow-y-auto'>
          {LOCATIONS.map((option) => (
            <button
              key={option}
              type='button'
              onClick={() => toggleOption(option)}
              className={`px-2 text-sm rounded-md border-none py-2 ${
                selectedOptions.includes(option)
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
              }`}>
              {option}
            </button>
          ))}
        </div>

        <div className='mt-4 flex flex-wrap gap-2 overflow-y-scroll custom-scrollbar max-h-[100px]'>
          {selectedOptions.map((option) => (
            <div
              key={option}
              className='flex items-center bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm'>
              {option}
              <button
                type='button'
                onClick={() => removeOption(option)}
                className='ml-1 text-red-400'>
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className='my-4 border-gray-300' />

      <div className='mb-4'>
        <Input
          type='date'
          value={startDate}
          label='시작일'
          placeholder='입력'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setStartDate(e.target.value);
          }}
        />
      </div>

      <hr className='my-6 border-gray-300' />

      <div className='mb-6 flex items-center'>
        <div className='w-[150px] relative'>
          <Input
            type='number'
            value={amount}
            label='금액'
            placeholder='입력'
            rightAddon='원'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(e.target.value);
            }}
            inputClassName='no-spinner'
          />
        </div>
        <span className='ml-2 mt-[30px] text-black'>이상부터</span>
      </div>

      <div className='flex gap-4'>
        <Button type='reset' style='bordered' size='sm' onClick={handleReset}>
          초기화
        </Button>
        <Button type='button' size='lg' onClick={handleApply}>
          적용하기
        </Button>
      </div>
    </form>
  );
};

export default DetailFilter;
