import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory, Link } from 'react-router-dom';

import { useAppDispatch } from '@/app/hooks';

import { register } from '../auth-slice';
import GoogleLogin from '../components/GoogleLogin';
import Layout from '../components/Layout';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    textAlign: 'center',
  },
  alertContainer: {
    marginTop: 20,
    width: '100%',
  },

  authSocial: {
    margin: '20px 0',
    textAlign: 'center',
  },
  orText: {
    marginBottom: 10,
  },
}));

interface FormData {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}

const defaultValues = {
  email: '',
  password: '',
  name: '',
};

const Register = () => {
  const classes = useStyles();

  const { handleSubmit, control, watch } = useForm<FormData>({
    defaultValues,
  });

  const history = useHistory();

  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const passwordFieldValue = watch('password');

  const onSubmit = async ({ email, password, name, password_confirmation }: FormData) => {
    try {
      setIsSubmitting(true);
      const result = await dispatch(register({ name, email, password, password_confirmation }));
      unwrapResult(result);
      setIsSubmitting(false);
      toast.success('Successfully Registered!');
      history.push('/dashboard');
    } catch (error) {
      setError(error.message);
      if (error.errors) setFieldErrors(error.errors);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Sign Up">
      {error && (
        <Alert severity="error" className={classes.alertContainer}>
          {error}
        </Alert>
      )}

      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: 'Name is required field',
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="name"
              label="Name"
              name="name"
              type="name"
              error={Boolean(error)}
              helperText={error?.message || fieldErrors['name']}
            />
          )}
        />

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
          render={({ field: { onChange }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              onChange={onChange}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={Boolean(error || fieldErrors['email'])}
              helperText={error?.message || fieldErrors['email']}
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
          {isSubmitting ? <CircularProgress size={30} /> : 'Register'}
        </Button>

        <Link to="/signin" className={classes.link}>
          <Typography color="primary" variant="body2">
            Already have an account? Log In.
          </Typography>
        </Link>

        <div className={classes.authSocial}>
          <Typography variant="body2" color="textSecondary" className={classes.orText}>
            or
          </Typography>
          <GoogleLogin />
        </div>
      </form>
    </Layout>
  );
};

export default Register;
