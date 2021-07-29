import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateProfile } from '../../auth/auth-slice';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 60,
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
}));

interface FormData {
  email: string;
  name: string;
}

const EditProfile = () => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    email: user?.email || '',
    name: user?.name || '',
  };

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues,
  });

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      const response = await dispatch(updateProfile(formData));
      unwrapResult(response);
      toast.success('Successfully profile updated');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.paper}>
      <Typography variant="h6">Edit Profile</Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: 'Name is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              onChange={onChange}
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="true"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
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
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              onChange={onChange}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="true"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={30} /> : 'Save'}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
