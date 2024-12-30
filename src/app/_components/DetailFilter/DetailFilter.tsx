import React, { useState } from 'react';
import LocationSelector from './SelectLocation';
import StartDateSelector from './SelectStartData';
import AmountSelector from './SelectAmount';
import { LOCATIONS } from '../../_constants/constants';
import Button from '../Button';

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
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const removeOption = (option: string) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
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
          닫기
        </button>
      </div>

      <LocationSelector
        locations={LOCATIONS}
        selectedOptions={selectedOptions}
        onToggleOption={toggleOption}
        onRemoveOption={removeOption}
      />

      <StartDateSelector startDate={startDate} onChange={setStartDate} />

      <AmountSelector amount={amount} onChange={setAmount} />

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
