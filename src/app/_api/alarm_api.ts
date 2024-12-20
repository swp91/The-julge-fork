import instance from './instance';

// 알림 목록 조회
export const getAlerts = (userId: string, offset?: number, limit?: number) => {
  return instance.get<AlertsResponse>(`/users/${userId}/alerts`, {
    headers: { requiresToken: true },
    params: { offset, limit },
  });
};

// 알림 읽음 처리
export const markAlertAsRead = (userId: string, alertId: string) => {
  return instance.put<AlertsResponse>(
    `/users/${userId}/alerts/${alertId}`,
    {},
    {
      headers: { requiresToken: true },
    },
  );
};
