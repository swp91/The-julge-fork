'use client';
import { useMemo } from 'react';

const useAlbaTimeFormat = (startsAt?: string, workhour?: string) => {
  const formattedTime = useMemo(() => {
    // 입력 값이 없을 경우 빈 문자열 반환
    if (!startsAt || !workhour) return '';

    // 날짜 및 시간 객체 생성
    const startDate = new Date(startsAt);

    // 시작 시간 계산
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();

    // 종료 시간 계산
    const endHours = startHours + parseInt(workhour, 10);
    const endMinutes = startMinutes;

    // 날짜 포맷팅
    const formattedDate = `${startDate.getFullYear()}-${String(
      startDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;

    // 시간 포맷팅
    const formattedStartTime = `${String(startHours).padStart(2, '0')}:${String(
      startMinutes,
    ).padStart(2, '0')}`;
    const formattedEndTime = `${String(endHours).padStart(2, '0')}:${String(
      endMinutes,
    ).padStart(2, '0')}`;

    return `${formattedDate} ${formattedStartTime}~${formattedEndTime}`;
  }, [startsAt, workhour]);

  return formattedTime;
};

export default useAlbaTimeFormat;
