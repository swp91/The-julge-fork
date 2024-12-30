import React from 'react';

interface LocationSelectorProps {
  locations: string[];
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
  onRemoveOption: (option: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  selectedOptions,
  onToggleOption,
  onRemoveOption,
}) => {
  return (
    <div className='mb-4'>
      <label htmlFor='location' className='block text-sm text-gray-700 mb-2'>
        위치
      </label>
      <div className='custom-scrollbar grid grid-cols-2 gap-2 p-2 border rounded-md h-[258px] overflow-y-auto'>
        {locations.map((option) => (
          <button
            key={option}
            type='button'
            onClick={() => onToggleOption(option)}
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
              onClick={() => onRemoveOption(option)}
              className='ml-1 text-red-400'>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
