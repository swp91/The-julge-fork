import instance from './instance';

interface UserInfoResponse {
  item: {
    id: string;
    email: string;
    type: 'employer' | 'employee';
    name?: string;
    phone?: string;
    address?: string;
    bio?: string;
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
    } | null;
  };
  links: any[];
}

interface UserInfoUpdateRequest {
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

// 내 정보 조회
export const getUserInfo = (userId: string) => {
  return instance.get<UserInfoResponse>(`/users/${userId}`);
};

// 내 정보 수정
export const updateUserInfo = (userId: string, data: UserInfoUpdateRequest) => {
  return instance.put<UserInfoResponse>(`/users/${userId}`, data);
};
