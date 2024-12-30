import instance from './instance';

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

// 가게 공고 등록
export const createShopNotice = (shopId: string, data: ownerNoticeRequest) => {
  return instance.post<ownerNoticeResponse>(`/shops/${shopId}/notices`, data, {
    headers: { requiresToken: true },
  });
};

// 가게의 특정 공고 수정
export const updateShopNotice = (
  shopId: string,
  noticeId: string,
  data: ownerNoticeRequest,
) => {
  return instance.put<ownerNoticeResponse>(
    `/shops/${shopId}/notices/${noticeId}`,
    data,
    {
      headers: { requiresToken: true },
    },
  );
};

// 가게특정공고지원목록 같은경우 노션 API 문서에는 토큰필수여부가 없다고 되어있는데,
// 아마도 필요할것 같아서 일단 토큰여부 true 해놨습니다 이부분은 작업하면서 변경될 수도 있습니다.

// 가게의 특정 공고의 지원 목록 조회
export const getApplicationsForNotice = (
  shopId: string,
  noticeId: string,
  offset?: number,
  limit?: number,
) => {
  return instance.get<ApplicationsResponse>(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    {
      params: { offset, limit },
      headers: { requiresToken: true },
    },
  );
};

// 가게의 특정 공고 지원 등록
export const createApplicationForNotice = (
  shopId: string,
  noticeId: string,
) => {
  return instance.post<ApplicationCreateResponse>(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    {},
    {
      headers: { requiresToken: true },
    },
  );
};

// 가게의 특정 공고 지원 승인, 거절 또는 취소
export const updateApplicationStatus = (
  shopId: string,
  noticeId: string,
  applicationId: string,
  data: ApplicationUpdateRequest,
) => {
  return instance.put<ApplicationCreateResponse>(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    data,
    {
      headers: { requiresToken: true },
    },
  );
};
