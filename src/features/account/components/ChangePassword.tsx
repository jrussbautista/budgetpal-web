import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AuthApi } from '../../auth/auth-api';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
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
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const ChangePassword = () => {
  const classes = useStyles();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, watch } = useForm<FormData>();

  const newPasswordFieldValue = watch('newPassword');

  const onSubmit = async ({ currentPassword, newPassword, newPasswordConfirm }: FormData) => {
    try {
      const fields = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirm,
      };
      await AuthApi.changePassword(fields);
      toast.success('You have successfully changed your password');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.paper}>
      <Typography variant="h6">Change Password</Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Current Password is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              onChange={onChange}
              fullWidth
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              type="password"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'New Password is required field',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              onChange={onChange}
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type="password"
              error={Boolean(error)}
              helperText={error?.message}
              value={value}
            />
          )}
        />

        <Controller
          name="newPasswordConfirm"
          control={control}
          defaultValue=""
          rules={{
            required: 'Confirm New Password is required field',
            validate: (value) =>
              value === newPasswordFieldValue ||
              'The new password and confirm new password does not match.',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              onChange={onChange}
              fullWidth
              id="newPasswordConfirm"
              label="Confirm New Password"
              name="newPasswordConfirm"
              type="password"
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

export default ChangePassword;
