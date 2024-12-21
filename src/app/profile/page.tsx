'use client';

import { useState } from 'react';
import Footer from '../_components/Footer';
import Header from '../_components/Header';
import PostProfile from '../_components/PostProfile';

const ProfilePage = () => {
  const [profileStatus, setProfileStatus] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(false);

  return (
    <div>
      <Header />
      <div>
        {profileStatus ? (
          <div></div>
        ) : (
          <PostProfile isExist={profileStatus} type={'profile'} />
        )}
      </div>
      <div>
        {applicationStatus ? (
          <div></div>
        ) : (
          <PostProfile isExist={applicationStatus} type={'application'} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
