import React from 'react';
import Input from '../Input';

interface AmountInputProps {
  amount: string;
  onChange: (amount: string) => void;
}

const AmountSelector: React.FC<AmountInputProps> = ({ amount, onChange }) => {
  return (
    <div className='mb-6 flex items-center'>
      <div className='w-[150px] relative'>
        <Input
          type='number'
          value={amount}
          label='금액'
          placeholder='입력'
          rightAddon='원'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
          }}
          inputClassName='no-spinner'
        />
      </div>
      <span className='ml-2 mt-[30px] text-black'>이상부터</span>
    </div>
  );
};

export default AmountSelector;
