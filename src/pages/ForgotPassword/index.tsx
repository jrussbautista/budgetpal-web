import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import Layout from 'layouts/auth';
import { forgotPassword, getCSRFCookie } from 'services/auth';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  alertContainer: {
    marginTop: 20,
    width: '100%',
  },
  logo: {
    width: 60,
    marginBottom: 10,
  },
}));

interface FormData {
  email: string;
}

const defaultValues = {
  email: '',
};

const ForgotPassword = () => {
  const classes = useStyles();

  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async ({ email }: FormData) => {
    try {
      setIsSubmitting(true);
      await getCSRFCookie();
      await forgotPassword(email);

      setIsSubmitting(false);
      toast.success('Successfully sent your password reset link!');
      reset({ email: '' });
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Forgot Password">
      {error && (
        <Alert severity="error" className={classes.alertContainer}>
          {error}
        </Alert>
      )}

      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required field',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              onChange={onChange}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={30} /> : 'Submit'}
        </Button>
      </form>
    </Layout>
  );
};

export default ForgotPassword;
