interface InputProps {
  type: string;
  value: string; // 상태값 지정
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // 스타일 추가 지정
  label?: string; // 라벨 표시만을 위한 props
  placeholder?: string;
  error?: string;
}

export const Input = ({
  type,
  value,
  onChange,
  className,
  label,
  placeholder,
  error,
}: InputProps) => {
  return (
    // 너비는 사용자 지정(w-64 나중에 꼭 지우기)
    <div className={`flex flex-col gap-2 w-64 ${className || ''}`}>
      {label && (
        <label className="w-full block text-16 text-base text-black">
          {label}
        </label>
      )}
      <input
        className={`w-full py-4 px-5 border rounded-md ${error ? 'border-red-40' : 'border-gray-300'} focus:border-black focus:outline-none focus:ring-0`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="w-full px-2 text-12 text-red-40">{error}</p>}
    </div>
  );
};
