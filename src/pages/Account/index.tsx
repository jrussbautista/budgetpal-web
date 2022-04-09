import ChangePassword from 'features/auth/ChangePassword';
import EditProfile from 'features/auth/EditProfile';

const AccountPage = () => {
  return (
    <>
      <EditProfile />
      <ChangePassword />
    </>
  );
};

export default AccountPage;
