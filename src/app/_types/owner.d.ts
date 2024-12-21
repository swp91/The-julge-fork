interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: {
    item: {
      id: string;
      email: string;
      type: 'employer' | 'employee';
      name?: string;
      phone?: string;
      address?: string;
      bio?: string;
    };
    href: string;
  };
}

interface ShopResponse {
  item: Shop;
  links: any[];
}

interface ShopRequest {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface ownerNoticeRequest {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

interface ownerNoticeResponse {
  item: NoticeItem;
  links: any[];
}

interface ApplicationItem {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  user?: {
    item: {
      id: string;
      email: string;
      type: 'employer' | 'employee';
      name?: string;
      phone?: string;
      address?: string;
      bio?: string;
    };
    href: string;
  };
  shop?: {
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
  notice?: {
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
}

interface ApplicationsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item: ApplicationItem;
    links: any[];
  }>;
  links: any[];
}

interface ApplicationCreateResponse {
  item: ApplicationItem;
  links: any[];
}

interface ApplicationUpdateRequest {
  status: 'accepted' | 'rejected' | 'canceled';
}
