import clsx from 'clsx';

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
    <div className={clsx('flex flex-col gap-2', className)}>
      {label && <label className="text-16 text-black">{label}</label>}
      <input
        className={clsx(
          'py-4 px-5 border rounded-md focus:border-black focus:outline-none',
          error ? 'border-red-40' : 'border-gray-300',
        )}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="px-2 text-12 text-red-40">{error}</p>}
    </div>
  );
};
