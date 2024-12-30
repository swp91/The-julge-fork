import Button from '../_components/Button';
import Badge from '../_components/Badge';

interface OwnerData {
  name: string;
  introduction: string;
  phone: string;
  status: string;
}

export interface WorkerData {
  shopName: string;
  date: string;
  hourlyPay: string;
  status: string;
}

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
  hiddenOn?: 'sm' | 'md' | 'lg';
}

export const tableConfig: {
  owner: Column<OwnerData>[];
  worker: Column<WorkerData>[];
} = {
  owner: [
    { header: '신청자', accessor: 'name' },
    { header: '소개', accessor: 'introduction', hiddenOn: 'md' },
    { header: '전화번호', accessor: 'phone', hiddenOn: 'lg' },
    {
      header: '상태',
      accessor: 'status',
      render: (value: string) =>
        value === 'pending' ? (
          <div className='space-x-2'>
            <Button style='bordered' size='xxs'>
              거절하기
            </Button>
            <Button style='bordered' size='xxs'>
              승인하기
            </Button>
          </div>
        ) : value === 'rejected' ? (
          <Badge status='거절' />
        ) : (
          <Badge status='승인' />
        ),
    },
  ],
  worker: [
    { header: '가게', accessor: 'shopName' },
    { header: '일자', accessor: 'date', hiddenOn: 'md' },
    { header: '시급', accessor: 'hourlyPay', hiddenOn: 'lg' },
    {
      header: '상태',
      accessor: 'status',
      render: (value: string) =>
        value === 'pending' ? (
          <Badge status='대기' />
        ) : value === 'rejected' ? (
          <Badge status='거절' />
        ) : (
          <Badge status='승인' />
        ),
    },
  ],
};

//테스트용 임시데이터입니다 추후 삭제예정이에용
export const ownerData = [
  {
    name: '김강현',
    introduction:
      '최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.',
    phone: '010-0000-0000',
    status: 'pending',
  },
  {
    name: '서혜진',
    introduction: '열심히 하겠습니다!',
    phone: '010-0000-0000',
    status: 'rejected',
  },
  {
    name: '주진혁',
    introduction: '성실한 자세로 열심히 일합니다. 한번 경험해 보고 싶어요~',
    phone: '010-0000-0000',
    status: 'accepted',
  },
  {
    name: '장민혁',
    introduction:
      '일을 꼼꼼하게 하는 성격입니다. 도토리 식당에서 일해보고 싶습니다.',
    phone: '010-0000-0000',
    status: 'accepted',
  },
  {
    name: '고기훈',
    introduction: '하루라도 최선을 다해서 일하겠습니다! 감사합니다.',
    phone: '010-0000-0000',
    status: 'accepted',
  },
];

export const workerData = [
  {
    shopName: 'HS 과일주스',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    hourlyPay: '15,000원',
    status: 'accepted',
  },
  {
    shopName: '써니 브런치 레스토랑',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    hourlyPay: '15,000원',
    status: 'accepted',
  },
  {
    shopName: '수리 에스프레소 샵',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    hourlyPay: '15,000원',
    status: 'rejected',
  },
  {
    shopName: '너구리네 라면집',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    hourlyPay: '15,000원',
    status: 'pending',
  },
  {
    shopName: '초가을집',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    hourlyPay: '15,000원',
    status: 'pending',
  },
];
