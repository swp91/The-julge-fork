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

// 유저의 지원 목록 조회
export const getUserApplications = (
  userId: string,
  offset?: number,
  limit?: number,
) => {
  return instance.get<ApplicationsResponse>(`/users/${userId}/applications`, {
    params: { offset, limit },
    headers: { requiresToken: true },
  });
};
