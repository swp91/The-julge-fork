import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import Image from 'next/image';
import { Input } from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { Dropdown } from '@/app/_components/Dropdown';

const ProfilePost = () => {
  return (
    <div>
      <Header />
      <form>
        <div>
          <h1>내 프로필</h1>
          <button>
            <Image
              src={'/image/closeBtn.svg'}
              alt='닫기버튼'
              width={24}
              height={24}
            />
          </button>
        </div>
        <div>
          <Input label='이름*' />
          <Input label='연락처*' />
          <Dropdown options={[]} />
        </div>

        <Input label='소개' />
        <Button>등록하기</Button>
      </form>
      <Footer />
    </div>
  );
};

export default ProfilePost;
