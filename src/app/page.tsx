'use client';

import Header from './_components/header';
import Footer from './_components/Footer';
import UserNotice from './announce/_components/UserNotice';
import AllNotices from './announce/_components/AllNotices';

export default function Home() {
  return (
    <div>
      <Header />
      {/* 맞춤공고 */}
      <UserNotice />
      {/* 전체공고 */}
      <AllNotices />
      <Footer />
    </div>
  );
}
