interface ShopItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop?: {
    item: ShopItem;
    href: string;
  };
  links: any[];
}

interface NoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address?: string[];
  keyword?: string;
  items: NoticeItem[];
  links: {
    rel: string;
    description: string;
    method: string;
    href: string;
  }[];
}

interface NoticeDetailResponse {
  item: NoticeItem & {
    currentUserApplication?: {
      item: {
        id: string;
        status: 'pending' | 'accepted' | 'rejected' | 'canceled';
        createdAt: string;
      };
    };
  };
  links: any[];
}

interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
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
}
