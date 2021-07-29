import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import useQueryParams from '../../../shared/hooks/useQueryParams';
import { AuthApi } from '../auth-api';
import Layout from '../components/Layout';

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
}));

interface FormData {
  email: string;
  password: string;
  password_confirmation: string;
}

const defaultValues = {
  password: '',
  password_confirmation: '',
  email: '',
};

const ForgotPassword = () => {
  const classes = useStyles();

  const { handleSubmit, control, watch } = useForm<FormData>({
    defaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const history = useHistory();
  const query = useQueryParams();

  const token = query.get('token') as string;
  const passwordFieldValue = watch('password');

  const onSubmit = async (fields: FormData) => {
    try {
      setIsSubmitting(true);
      await AuthApi.getCSRFCookie();
      await AuthApi.resetPassword({ ...fields, token });
      setIsSubmitting(false);
      toast.success('Successfully reset your password');
      history.push('/signin');
    } catch (error) {
      setError(error.response.data.message);
      if (error.response.data.errors) setFieldErrors(error.response.data.errors);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Reset Password">
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

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: 'Password is required field',
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="password"
              label="Password"
              name="password"
              type="password"
              error={Boolean(error || fieldErrors['password'])}
              helperText={error?.message || fieldErrors['password']}
            />
          )}
        />

        <Controller
          name="password_confirmation"
          control={control}
          defaultValue=""
          rules={{
            required: 'Password Confirmation is required field.',
            validate: (value) => value === passwordFieldValue || 'The passwords do not match.',
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="password_confirm"
              label="Confirm Password"
              name="password_confirm"
              type="password"
              error={Boolean(error || fieldErrors['password_confirm'])}
              helperText={error?.message || fieldErrors['password_confirm']}
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
