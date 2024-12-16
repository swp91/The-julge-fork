'use client';

import { useState } from 'react';
import { Input } from './Input';
import Image from 'next/image';

const options = [
  '서울시 강남구',
  '서울시 강동구',
  '서울시 강북구',
  '서울시 강서구',
  '서울시 관악구',
  '서울시 광진구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 노원구',
  '서울시 도봉구',
  '서울시 동대문구',
  '서울시 동작구',
  '서울시 마포구',
  '서울시 서대문구',
  '서울시 서초구',
  '서울시 성동구',
  '서울시 성북구',
  '서울시 송파구',
  '서울시 양천구',
  '서울시 영등포구',
  '서울시 용산구',
  '서울시 은평구',
  '서울시 종로구',
  '서울시 중구',
  '서울시 중랑구',
];

export default function DetailFilter() {
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

  return (
    <form className='p-4 max-w-[390px] max-h-[840px] mx-auto bg-white rounded-[10px] shadow-md'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>상세 필터</h2>
        <button type='button' className='text-gray-500'>
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
          {options.map((option) => (
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
        <button
          type='reset'
          onClick={() => setSelectedOptions([])}
          className='py-2 px-4 bg-gray-200 text-gray-700 rounded-md w-1/2'>
          초기화
        </button>
        <button
          type='submit'
          className='py-2 px-4 bg-red-500 text-white rounded-md w-1/2'>
          적용하기
        </button>
      </div>
    </form>
  );
}
