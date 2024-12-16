'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Footer() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-100 text-base">
      {windowWidth >= 744 ? (
        <div className="flex justify-around items-center h-24">
          <p className="text-gray-500 text-left">©codeit - 2024</p>
          <div className="flex gap-7 text-gray-500 justify-around">
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>
          <div className="flex justify-center gap-4">
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
      ) : (
        <div className="flex justify-around gap-7 text-gray-500 h-32">
          <div className="flex flex-col justify-center gap-5">
            <div className="flex gap-4">
              <p>Privacy Policy</p>
              <p>FAQ</p>
            </div>
            <p className="text-gray-500 text-left">©codeit - 2024</p>
          </div>
          <div className="flex gap-4 mb-12">
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
      )}
    </div>
  );
}
