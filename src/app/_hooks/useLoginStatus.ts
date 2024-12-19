import { useState, useEffect } from 'react';

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 localStorage를 사용
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      setIsLogin(!!token);

      const handleStorageChange = () => {
        const token = localStorage.getItem('authToken');
        setIsLogin(!!token);
      };

      // storage 이벤트 리스너 추가
      window.addEventListener('storage', handleStorageChange);

      return () => {
        // 컴포넌트 언마운트 시 리스너 제거
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []); // 빈 배열로 한번만 실행되도록 설정

  return { isLogin, setIsLogin };
};
