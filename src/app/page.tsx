'use client';

import Header from './_components/Header/Header';
import Footer from './_components/Footer';
import UserNotice from './announce/_components/UserNotice';
import AllNotices from './announce/_components/AllNotices';

export default function Home() {
  return (
    <div>
      <Header />
      <UserNotice />
      <AllNotices />
      <Footer />
    </div>
  );
}
