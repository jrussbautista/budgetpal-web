import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppSelector } from '@/app/hooks';
import { AuthApi } from '@/features/auth/auth-api';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginBottom: 30,
    },
    buttonResend: {
      marginLeft: 10,
      backgroundColor: '#fff',
    },
  })
);

const VerifyEmailAlert = () => {
  const classes = useStyles();

  const [resending, setResending] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  if (user?.is_email_verified) {
    return null;
  }

  const handleResendEmailVerify = async () => {
    try {
      setResending(true);
      await AuthApi.resendVerifyEmail();
      toast.success('Successfully sent you a verification email');
    } catch (error) {
      toast.error(
        "Sorry! We we'rent able to resend verify email right now. Please try again later."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className={classes.container}>
      <Alert
        severity="info"
        variant="filled"
        action={
          <Button
            type="button"
            className={classes.buttonResend}
            disableElevation
            variant="contained"
            onClick={handleResendEmailVerify}
            disabled={resending}
          >
            {resending ? 'Resending...' : '  Resend'}
          </Button>
        }
      >
        Verify your email. We already sent you a verification. Please check your email.
      </Alert>
    </div>
  );
};

export default VerifyEmailAlert;
