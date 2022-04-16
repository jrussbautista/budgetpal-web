import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchBudgets } from 'features/budgets/budgetsSlice';
import { addTransaction, updateTransaction } from 'features/transactions/transactionsSlice';
import { UpdateTransactionFields } from 'types/Transaction';
import getFormattedDate from 'utils/getFormattedDate';

interface FormData {
  title: string;
  amount: string;
  category_id: string;
  type: string;
  happened_on: Date | null;
}

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
}));

interface TransactionManageFormProps {
  fields?: UpdateTransactionFields;
  id?: string;
}

const defaultValues = {
  title: '',
  amount: '',
  category_id: '',
  type: 'expense',
  happened_on: null,
};

const TransactionManageForm = ({ fields, id }: TransactionManageFormProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues,
  });

  const setInitialValues = useCallback(
    (fields: UpdateTransactionFields) => {
      Object.entries(fields).forEach(([key, value]) => {
        setValue(key as keyof UpdateTransactionFields, value);
      });
    },
    [setValue]
  );

  useEffect(() => {
    if (fields) {
      setInitialValues(fields);
      console.log('running');
    }
  }, [fields, setInitialValues]);

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);

      const newFields = {
        ...formData,
        amount: parseFloat(formData.amount),
        happened_on: getFormattedDate(formData.happened_on as Date),
      };

      if (id) {
        // if id is present, then we know that the action is update
        const result = await dispatch(updateTransaction({ id, fields: newFields }));
        unwrapResult(result);
        toast.success("You've successfully update transaction");
      } else {
        const result = await dispatch(addTransaction(newFields));
        unwrapResult(result);
        toast.success("You've successfully added new transaction");
      }

      setIsSubmitting(false);
      dispatch(fetchBudgets());
      navigate('/transactions');
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          required: 'Title is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.input}
            margin="normal"
            onChange={onChange}
            value={value}
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="true"
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name="amount"
        control={control}
        rules={{
          required: 'Amount is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumberFormat
            className={classes.input}
            value={value}
            fullWidth
            label="Amount"
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
        name="category_id"
        control={control}
        rules={{
          required: 'Category is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl fullWidth error={Boolean(error)} className={classes.input}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              fullWidth
              labelId="category-label"
              id="category-label"
              value={value}
              onChange={onChange}
            >
              {categories.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        name="type"
        control={control}
        rules={{
          required: 'Transaction type is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl fullWidth error={Boolean(error)} className={classes.input}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              fullWidth
              labelId="type-label"
              id="type-label"
              value={value}
              onChange={onChange}
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </Select>
            {error && <FormHelperText>{error?.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <Controller
        name="happened_on"
        control={control}
        rules={{
          required: 'Date is required field',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl fullWidth error={Boolean(error)} className={classes.input}>
            <KeyboardDatePicker
              autoOk
              fullWidth
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="happened_on"
              label="Date"
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
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={25} /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionManageForm;
