import Image from 'next/image';

interface DropdownProps {
  options: string[]; // 드롭다운 옵션
  selectedOption: string | null; // 선택된 옵션, 선택되지 않은 경우 null
  onOptionClick: (value: string) => void; // 옵션 클릭시 실행 함수
  isOpen: boolean; // 드롭다운 메뉴가 열려있는지
  toggleDropdown: () => void; // 드롭다운 열림/닫힘 상태 전환
  className?: string;
  placeholder?: string;
}

export const Dropdown = ({
  options,
  selectedOption,
  onOptionClick,
  isOpen,
  toggleDropdown,
  placeholder,
  className,
}: DropdownProps) => {
  return (
    // w-64 지우기
    <div className={`relative w-64 ${className || ''}`}>
      <button
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between bg-white border border-gray-300 rounded py-4 px-5 text-left ${
          selectedOption ? 'text-black' : 'text-gray-400'
        }`}>
        {selectedOption || placeholder}
        <div className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <Image
            src={'/image/dropdown-triangle.svg'}
            alt="드롭다운 화살표"
            width={16}
            height={16}
          />
        </div>
      </button>
      {isOpen && (
        // 스크롤바 배경 어떻게 지워야할지?
        <ul className="custom-scrollbar absolute z-2 w-full bg-white border border-gray-300 rounded mt-2 max-h-[230px] overflow-auto shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className="py-3 hover:bg-blue-10 cursor-pointer border-gray-200 border-b text-14 text-black text-center"
              onClick={() => onOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
