import clsx from 'clsx';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  label?: string;
  placeholder?: string;
  rightAddon?: string;
  error?: string;
}

export const Input = ({
  type = 'text',
  value,
  onChange,
  className,
  rightAddon,
  label,
  inputClassName,
  placeholder = '입력',
  error,
}: InputProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {label && <label className='text-16 text-black'>{label}</label>}
      <input
        className={clsx(
          'py-4 px-5 border rounded-md focus:border-black focus:outline-none',
          inputClassName,
          error ? 'border-red-40' : 'border-gray-300',
        )}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {rightAddon && (
        <div className='absolute right-3 top-[61px] transform -translate-y-1/2 text-black'>
          {rightAddon}
        </div>
      )}
      {error && <p className='px-2 text-12 text-red-40'>{error}</p>}
    </div>
  );
};
