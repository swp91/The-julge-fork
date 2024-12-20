import instance from './instance';

// 내 정보 조회
export const getUserInfo = (userId: string) => {
  return instance.get<UserInfoResponse>(`/users/${userId}`, {
    headers: { requiresToken: true },
  });
};

// 내 정보 수정
export const updateUserInfo = (userId: string, data: UserInfoUpdateRequest) => {
  return instance.put<UserInfoResponse>(`/users/${userId}`, data, {
    headers: { requiresToken: true },
  });
};
