import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

import { useAppDispatch } from 'app/hooks';
import { login } from 'features/auth/authSlice';
import GoogleLogin from 'features/auth/GoogleLogin';
import Layout from 'layouts/auth';

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
}

const defaultValues = {
  email: '',
  password: '',
};

const Login = () => {
  const classes = useStyles();

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues,
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      setIsSubmitting(true);
      const result = await dispatch(login({ email, password }));
      unwrapResult(result);
      setIsSubmitting(false);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Sign In">
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="password"
              label="Password"
              name="password"
              type="password"
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
          {isSubmitting ? <CircularProgress size={30} /> : 'Sign In'}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/forgot-password" className={classes.link}>
              <Typography color="primary" variant="body2">
                Forgot password?
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" className={classes.link}>
              <Typography color="primary" variant="body2">
                {"Don't have an account? Sign Up."}
              </Typography>
            </Link>
          </Grid>
        </Grid>
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

export default Login;
