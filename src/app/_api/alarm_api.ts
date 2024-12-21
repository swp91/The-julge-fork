import instance from './instance';

// 알림 목록 조회
export const getAlarms = (userId: string, offset?: number, limit?: number) => {
  return instance.get<AlarmsResponse>(`/users/${userId}/alerts`, {
    headers: { requiresToken: true },
    params: { offset, limit },
  });
};

// 알림 읽음 처리
export const markAlarmAsRead = (userId: string, alertId: string) => {
  return instance.put<AlarmsResponse>(
    `/users/${userId}/alerts/${alertId}`,
    {},
    {
      headers: { requiresToken: true },
    },
  );
};
