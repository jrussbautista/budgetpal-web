import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../auth-slice';
import { useAppDispatch } from '../../../app/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import toast from 'react-hot-toast';
import GoogleLogin from '../google-login';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
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
  logo: {
    width: 60,
    marginBottom: 10,
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

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <span>Budgetty</span> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = () => {
  const classes = useStyles();

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues,
  });

  const history = useHistory();

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
      history.push('/dashboard');
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={{ backgroundImage: `url(images/budgetty-login-cover.jpg)` }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            src='/images/logo.svg'
            alt='budgetty logo'
            className={classes.logo}
          />
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {error && (
            <Alert severity='error' className={classes.alertContainer}>
              {error}
            </Alert>
          )}

          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Email is required field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin='normal'
                  required
                  onChange={onChange}
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{
                required: 'Password is required field',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={onChange}
                  id='password'
                  label='Password'
                  name='password'
                  type='password'
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              size='large'
              className={classes.submit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={30} /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/forgot-password' className={classes.link}>
                  <Typography color='primary' variant='body2'>
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup' className={classes.link}>
                  <Typography color='primary' variant='body2'>
                    Don't have an account? Sign Up.
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <div className={classes.authSocial}>
              <Typography
                variant='body2'
                color='textSecondary'
                className={classes.orText}
              >
                or
              </Typography>
              <GoogleLogin />
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
