export interface ProfileData {
  name?: string;
  email: string;
  type: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface Application {
  id: string;
  status: string;
  date: string | undefined;
  shopName: string;
  hourlyPay?: string;
}
