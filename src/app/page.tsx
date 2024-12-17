import Button from './_components/Button';

export default function Home() {
  return (
    <div className='m-10 flex gap-4'>
      <Button style='bordered' size='xxs'>
        승인하기
      </Button>
      <Button style='bordered' size='xxs'>
        거절하기
      </Button>
    </div>
  );
}
