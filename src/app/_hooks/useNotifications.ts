import { useState, useEffect } from 'react';
import axios from 'axios';

export const useNotifications = () => {
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios
        .get(`/users/{user_id}/alerts`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { offset: 0, limit: 1 }, // 최소 데이터 요청
        })
        .then((response) => {
          const { count } = response.data; // 응답의 count 확인
          setIsNotification(count > 0); // count가 0보다 크면 알림 있음
        })
        .catch((error) => {
          console.error('알림 정보를 가져오는데 실패했습니다.', error);
        });
    }
  }, []);

  return isNotification;
};
