import { useMemo, useContext } from 'react';
import { addressCoordinates } from '../_constants/locationData';
import useGeolocation from './useGeolocation';
import { NoticeContext } from '../_context/NoticeContext';

interface Filters {
  selectedOptions: string[];
  amount: string;
  startDate: string;
  sortOption?: string;
}

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 거리 (km)
};

export const useFilteredNotices = (filters: Filters) => {
  const context = useContext(NoticeContext);
  //Geolocation api로 사용자 위치 받아오는거
  const { latitude, longitude } = useGeolocation();

  if (!context) {
    console.error('NoticeContext가 정의되지 않았습니다.');
    return [];
  }

  const { notices } = context;

  return useMemo(() => {
    let result = [...notices];

    if (filters.selectedOptions.length > 0) {
      result = result.filter((notice) =>
        filters.selectedOptions.some((option) =>
          notice.shop.item.address1.includes(option),
        ),
      );
    }

    if (filters.amount) {
      result = result.filter(
        (notice) => notice.hourlyPay >= parseInt(filters.amount, 10),
      );
    }

    if (filters.startDate) {
      result = result.filter(
        (notice) =>
          new Date(notice.startsAt).getTime() >=
          new Date(filters.startDate).getTime(),
      );
    }

    switch (filters.sortOption) {
      case '마감임박순':
        return result.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
        );
      case '시급많은순':
        return result.sort((a, b) => b.hourlyPay - a.hourlyPay);
      case '시간적은순':
        return result.sort((a, b) => a.workhour - b.workhour);
      case '가나다순':
        return result.sort((a, b) =>
          a.shop.item.name.localeCompare(b.shop.item.name),
        );
      case '가까운순':
        if (latitude === null || longitude === null) {
          return result.sort(() => Math.random() - 0.5);
        }
        return result.sort((a, b) => {
          const addressA = addressCoordinates.find(
            (coord) => coord.address === a.shop.item.address1,
          );
          const addressB = addressCoordinates.find(
            (coord) => coord.address === b.shop.item.address1,
          );
          if (!addressA || !addressB) return 0;

          const distanceA = calculateDistance(
            latitude,
            longitude,
            addressA.latitude,
            addressA.longitude,
          );
          const distanceB = calculateDistance(
            latitude,
            longitude,
            addressB.latitude,
            addressB.longitude,
          );

          return distanceA - distanceB;
        });
      default:
        return result;
    }
  }, [notices, filters, latitude, longitude]);
};
