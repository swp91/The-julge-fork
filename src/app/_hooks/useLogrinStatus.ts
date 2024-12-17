import { useState, useEffect } from 'react';

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLogin(!!token);
  }, []);

  return { isLogin, setIsLogin };
};
