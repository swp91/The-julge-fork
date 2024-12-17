'use client';

//임시데이터
interface dataprop {
  id: number;
  name: string;
  introduction: string;
  phone: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
}

const dummyData: dataprop[] = [
  {
    id: 1,
    name: '김어흥',
    introduction:
      '최선을 다해 열심히 일합니다. 최선을 다해 열심히 일합니다. 최선을 다해 열심히 일합니다.',
    phone: '010-0000-0000',
    status: 'pending',
  },
  {
    id: 2,
    name: '서야옹',
    introduction: '열심히 하겠습니다!',
    phone: '010-0000-0000',
    status: 'rejected',
  },
  {
    id: 3,
    name: '박크앙',
    introduction: '성실한 자세로 일합니다.',
    phone: '010-0000-0000',
    status: 'accepted',
  },
  {
    id: 4,
    name: '장멍멍',
    introduction: '일을 꼼꼼하게 하는 성격입니다.',
    phone: '010-0000-0000',
    status: 'accepted',
  },
  {
    id: 5,
    name: '고기훈',
    introduction: '최선을 다해서 일하겠습니다.',
    phone: '010-0000-0000',
    status: 'accepted',
  },
];

const Table = () => {
  return (
    <div className='w-[351px] md:w-[680px] m-10 lg:w-[964px] rounded-[10px] overflow-hidden'>
      <table className='w-full table-fixed'>
        <thead>
          <tr className='bg-red-10'>
            <th className='p-3 text-left text-12 md:text-14'>신청자</th>
            <th className='p-3 text-left text-12 md:text-14 hidden md:table-cell'>
              소개
            </th>
            <th className='p-3 text-left text-12 md:text-14 hidden lg:table-cell'>
              전화번호
            </th>
            <th className='p-3 text-left text-12 md:text-14'>상태</th>
          </tr>
        </thead>
        <tbody className='text-14 md:text-16'>
          {dummyData.map((item) => (
            <tr key={item.id}>
              <td className='p-3'>
                <div>{item.name}</div>
              </td>
              <td className='p-3 hidden md:table-cell'>
                <div className='line-clamp-2'>{item.introduction}</div>
              </td>
              <td className='p-3 hidden lg:table-cell'>
                <div>{item.phone}</div>
              </td>
              <td className='p-3'>
                {item.status === 'pending' && (
                  <div className='space-x-2'>
                    <button>거절</button>
                    <button>승인</button>
                  </div>
                )}
                {item.status === 'rejected' && <span>거절</span>}
                {item.status === 'accepted' && <span>승인</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
