// types.ts
export enum NotificationStatus {
  APPROVED = '승인',
  REJECTED = '거절',
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  status: NotificationStatus;
}
