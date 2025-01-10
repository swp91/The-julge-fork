interface User {
  id: string;
  email: string;
  type: "employer" | "employee";
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  iat?: number;
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
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  item: {
    token: string;
    user: {
      item: User;
      href: string;
    };
  };
  links: any[];
}

interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;
  type: "employee" | "employer";
}

interface RegisterResponse {
  item: {
    id: string;
    email: string;
    type: "employee" | "employer";
  };
  links: any[];
}

interface DecodedToken {
  userId: string;
  iat: number;
}
