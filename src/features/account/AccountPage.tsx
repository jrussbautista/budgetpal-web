import React from 'react';
import ChangePassword from './change-password';
import EditProfile from './edit-profile';

const AccountPage = () => {
  return (
    <div>
      <EditProfile />
      <ChangePassword />
    </div>
  );
};

export default AccountPage;
