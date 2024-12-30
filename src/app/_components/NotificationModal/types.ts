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
  createdAt: string;
  result: 'accepted' | 'rejected';
  read: boolean;
  application: {
    item: {
      id: string;
      status: 'pending' | 'accepted' | 'rejected';
    };
    href: string;
  };
  shop: {
    item: {
      id: string;
      name: string;
      category: string;
      address1: string;
      address2: string;
      description: string;
      imageUrl: string;
      originalHourlyPay: number;
    };
    href: string;
  };
  notice: {
    item: {
      id: string;
      hourlyPay: number;
      description: string;
      startsAt: string;
      workhour: number;
      closed: boolean;
    };
    href: string;
  };
  links: any[];
}
