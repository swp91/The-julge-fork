import Image from 'next/image';

export default function Footer() {
  return (
    <div className="flex justify-around h-24 bg-gray-100 items-center text-base">
      <p className="text-gray-500">©codeit - 2024</p>
      <div className="flex justify-around gap-7 text-gray-500">
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className="flex justify-around gap-2">
        <Image
          src={'/image/envelope-square.svg'}
          alt="e-mail"
          width={24}
          height={24}
        />
        <Image
          src={'/image/facebook-square.svg'}
          alt="facebook"
          width={24}
          height={24}
        />
        <Image
          src={'/image/instagram.svg'}
          alt="instagram"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
