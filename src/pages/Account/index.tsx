import ChangePassword from 'features/auth/ChangePassword';
import EditProfile from 'features/auth/EditProfile';
import VerifyEmailAlert from 'features/auth/VerifyEmailAlert';

const AccountPage = () => {
  return (
    <>
      <VerifyEmailAlert />
      <EditProfile />
      <ChangePassword />
    </>
  );
};

export default AccountPage;
