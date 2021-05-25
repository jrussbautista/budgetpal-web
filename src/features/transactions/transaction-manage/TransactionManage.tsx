import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import toast from 'react-hot-toast';
import NumberFormat from 'react-number-format';
import {
  addTransaction,
  setSelectedModal,
  updateTransaction,
} from '../transactions-slice';
import { unwrapResult } from '@reduxjs/toolkit';

interface FormData {
  title: string;
  amount: string;
  category_id: string;
  type: string;
}

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
}));

const TransactionManage = () => {
  const classes = useStyles();

  const { selectedTransaction } = useAppSelector((state) => state.transactions);

  const defaultValues = {
    title: selectedTransaction?.title || '',
    amount: selectedTransaction?.amount?.toString() || '',
    category_id: selectedTransaction?.category.id || '',
    type: selectedTransaction?.type || 'expense',
  };

  const { handleSubmit, control } = useForm<FormData>({ defaultValues });

  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);

      const fields = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      if (selectedTransaction) {
        const result = await dispatch(
          updateTransaction({ id: selectedTransaction.id, fields })
        );
        unwrapResult(result);
        toast.success("You've successfully update transaction");
      } else {
        const result = await dispatch(addTransaction(fields));
        unwrapResult(result);
        toast.success("You've successfully added new transaction");
      }

      setIsSubmitting(false);
      dispatch(setSelectedModal(null));
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='title'
        control={control}
        defaultValue=''
        rules={{
          required: 'Title is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.input}
            margin='normal'
            onChange={onChange}
            value={value}
            fullWidth
            id='title'
            label='Title'
            name='title'
            autoComplete='true'
            autoFocus
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name='amount'
        control={control}
        defaultValue=''
        rules={{
          required: 'Amount is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumberFormat
            className={classes.input}
            value={value}
            fullWidth
            label='Amount'
            thousandSeparator={true}
            prefix={'$'}
            customInput={TextField}
            onValueChange={({ value }) => onChange(value)}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name='category_id'
        control={control}
        defaultValue=''
        rules={{
          required: 'Category is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            fullWidth
            error={Boolean(error)}
            className={classes.input}
          >
            <InputLabel id='category-label'>Category</InputLabel>
            <Select
              fullWidth
              labelId='category-label'
              id='category-label'
              value={value}
              onChange={onChange}
            >
              <MenuItem value={1}>Non</MenuItem>
              <MenuItem value={2}>Ut</MenuItem>
            </Select>
            {error && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        name='type'
        control={control}
        defaultValue=''
        rules={{
          required: 'Transaction type is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            fullWidth
            error={Boolean(error)}
            className={classes.input}
          >
            <InputLabel id='type-label'>Type</InputLabel>
            <Select
              fullWidth
              labelId='type-label'
              id='type-label'
              value={value}
              onChange={onChange}
            >
              <MenuItem value='expense'>Expense</MenuItem>
              <MenuItem value='income'>Income</MenuItem>
            </Select>
            {error && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <div className={classes.buttonContainer}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          disableElevation
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={25} /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionManage;
