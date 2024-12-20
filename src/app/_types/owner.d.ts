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
