import Link from 'next/link';
import Button from './_components/Button';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <Image src='image/error-icon.svg' width={120} height={120} alt='404' />
      <h1 className='text-[100px] font-bold mb-6'>404</h1>
      <p className='text-20b mb-4'>페이지가 없거나 접근할 수 없어요</p>
      <p className='text-20b mb-12'>
        입력하신 주소가 맞는지 다시 한 번 확인 해주세요
      </p>
      <Link href='/'>
        <Button>
          <p className='text-16b'>The - Julge 홈으로 {'>'}</p>
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
