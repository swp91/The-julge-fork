import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

// 로고 부분
const Logo = ({ width = 108, height = 20 }: LogoProps) => (
  <Link href={'/'}>
    <Image
      src={'/image/logo.svg'}
      alt='the-julge로고'
      width={width}
      height={height}
      priority
    />
  </Link>
);

export default Logo;
