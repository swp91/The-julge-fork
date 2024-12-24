import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  rightAddon?: string;
  error?: string;
}

const Input = ({
  className,
  inputClassName,
  label,
  rightAddon,
  error,
  type = 'text',
  placeholder = '입력',
  ...rest
}: InputProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {label && <label className='text-16 text-black'>{label}</label>}
      <input
        className={clsx(
          'py-4 px-5 border rounded-md focus:outline-none',
          inputClassName,
          error
            ? 'border-red-40 focus:border-red-40'
            : 'border-gray-300 focus:border-black',
        )}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {rightAddon && (
        <div className='absolute right-3 top-[61px] transform -translate-y-1/2 text-black'>
          {rightAddon}
        </div>
      )}
      {error && <p className='relative px-2 text-14 text-red-40'>{error}</p>}
    </div>
  );
};

export default Input;
