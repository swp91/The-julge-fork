import React from 'react';
import Input from '../Input';

interface StartDatePickerProps {
  startDate: string;
  onChange: (date: string) => void;
}

const StartDateSelector: React.FC<StartDatePickerProps> = ({
  startDate,
  onChange,
}) => {
  return (
    <div className='mb-4'>
      <Input
        type='date'
        value={startDate}
        label='시작일'
        placeholder='입력'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default StartDateSelector;
