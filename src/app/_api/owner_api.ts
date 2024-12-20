import instance from './instance';

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

// 가게 등록
export const registerShop = (data: ShopRequest) => {
  return instance.post<ShopResponse>('/shops', data, {
    headers: { requiresToken: true },
  });
};

// 가게 정보 조회
export const getShopInfo = (shopId: string) => {
  return instance.get<ShopResponse>(`/shops/${shopId}`, {
    headers: { requiresToken: true },
  });
};

// 가게 정보 수정
export const updateShopInfo = (shopId: string, data: ShopRequest) => {
  return instance.put<ShopResponse>(`/shops/${shopId}`, data, {
    headers: { requiresToken: true },
  });
};
