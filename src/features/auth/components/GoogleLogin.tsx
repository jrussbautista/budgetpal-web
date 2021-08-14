import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import GoogleLoginLib from 'react-google-login';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { useAppDispatch } from '@/app/hooks';
import { loginWithGoogle } from '@/features/auth/slice';

const useStyles = makeStyles(() => ({
  googleButton: {
    width: '100%',
    justifyContent: 'center',
  },
}));

const GoogleLogin = () => {
  const classes = useStyles();

  const [verifying, setVerifying] = useState(false);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const handleSuccess = async (response: any) => {
    try {
      setVerifying(true);
      const results = await dispatch(loginWithGoogle(response.accessToken));
      unwrapResult(results);
      console.log('Successfully login');
      history.push('/dashboard');
      setVerifying(false);
    } catch (error) {
      toast.error(
        "Sorry. We were'nt able to sign in with google you in right now. Please try again later."
      );
      setVerifying(false);
    }
  };

  const handleFailure = (err: any) => {
    console.log(err);
  };

  return (
    <GoogleLoginLib
      className={classes.googleButton}
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
      buttonText={verifying ? 'Signing in with Google...' : 'Sign in with Google'}
      disabled={verifying}
    />
  );
};

export default GoogleLogin;
