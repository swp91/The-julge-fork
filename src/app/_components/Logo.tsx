import Link from 'next/link';
import Image from 'next/image';

// 로고 부분
const Logo = () => (
  <Link href={'/'}>
    <Image
      src={'/image/logo.svg'}
      alt='the-julge로고'
      width={108}
      height={20}
    />
  </Link>
);

export default Logo;
