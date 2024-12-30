import instance from './instance';

// 공고 조회
export const getNotices = (
  offset?: number,
  limit?: number,
  address?: string,
  keyword?: string,
  startsAtGte?: string,
  hourlyPayGte?: number,
  sort?: 'time' | 'pay' | 'hour' | 'shop',
) => {
  return instance.get<NoticesResponse>('/notices', {
    params: {
      offset,
      limit,
      address,
      keyword,
      startsAtGte,
      hourlyPayGte,
      sort,
    },
  });
};

// 아래 2개는 일단 상세쪽이기도 하고 토큰여부가 필수가 아니라서 여기에 분류했는데 혹시 나중에 owner쪽으로 이동할수도있습니다.

// 가게 공고 목록 조회
export const getShopNotices = (
  shopId: string,
  offset?: number,
  limit?: number,
) => {
  return instance.get<NoticesResponse>(`/shops/${shopId}/notices`, {
    params: { offset, limit },
  });
};

// 가게의 특정 공고 조회
export const getShopNoticeDetail = (shopId: string, noticeId: string) => {
  return instance.get<NoticeDetailResponse>(
    `/shops/${shopId}/notices/${noticeId}`,
  );
};
