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
import { KeyboardDatePicker } from '@material-ui/pickers';
import NumberFormat from 'react-number-format';
import {
  addBudget,
  setSelectedModal,
  updateBudget,
  fetchBudgets,
} from '../budgets-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import getFormattedDate from '../../../shared/utils/getFormattedDate';

interface FormData {
  category_id: string;
  type: string;
  amount: string;
  start_date: Date | null;
  end_date: Date | null;
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

const BudgetManage = () => {
  const classes = useStyles();

  const { selectedBudget } = useAppSelector((state) => state.budgets);

  const defaultValues = {
    amount: selectedBudget?.amount?.toString() || '',
    category_id: selectedBudget?.category.id || '',
    start_date: selectedBudget?.start_date || null,
    end_date: selectedBudget?.end_date || null,
  };

  const { handleSubmit, control, setError } = useForm<FormData>({
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (formData: FormData) => {
    if (
      formData.end_date &&
      formData.start_date &&
      formData.end_date < formData.start_date
    ) {
      setError('end_date', { shouldFocus: true });
      toast.error('End date cannot be before start date');
      return;
    }

    try {
      setIsSubmitting(true);

      const fields = {
        ...formData,
        amount: parseFloat(formData.amount),
        start_date: getFormattedDate(formData.start_date as Date),
        end_date: getFormattedDate(formData.end_date as Date),
      };

      if (selectedBudget) {
        const result = await dispatch(
          updateBudget({ id: selectedBudget.id, fields })
        );
        unwrapResult(result);

        toast.success("You've successfully update budget");
      } else {
        const result = await dispatch(addBudget(fields));
        unwrapResult(result);
        toast.success("You've successfully added new budget");
      }

      setIsSubmitting(false);
      dispatch(fetchBudgets());
      dispatch(setSelectedModal(null));
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
        name='start_date'
        control={control}
        defaultValue=''
        rules={{
          required: 'Start Date is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            fullWidth
            error={Boolean(error)}
            className={classes.input}
          >
            <KeyboardDatePicker
              autoOk
              fullWidth
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='starting_date'
              label='Starting Date'
              value={value}
              error={Boolean(error)}
              onChange={onChange}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
            />
            {error && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        name='end_date'
        control={control}
        defaultValue=''
        rules={{
          required: 'End date is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            fullWidth
            error={Boolean(error)}
            className={classes.input}
          >
            <KeyboardDatePicker
              autoOk
              fullWidth
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='end-date'
              label='End Date'
              value={value}
              error={Boolean(error)}
              onChange={onChange}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
            />
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

export default BudgetManage;
