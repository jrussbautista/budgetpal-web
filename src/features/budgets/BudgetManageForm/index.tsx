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
import { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBudget, updateBudget, fetchBudgets } from 'features/budgets/budgetsSlice';
import { ManageBudgetFields } from 'types/Budget';
import getFormattedDate from 'utils/getFormattedDate';

interface FormData {
  category_id: string;
  type: string;
  amount: string;
  start_date: Date | null;
  end_date: Date | null;
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

interface BudgetManageFormProps {
  fields?: ManageBudgetFields;
  id?: string;
}

const BudgetManageForm = ({ fields, id }: BudgetManageFormProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    amount: '',
    category_id: '',
    start_date: null,
    end_date: null,
  };

  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues,
  });

  const setInitialValues = useCallback(
    (fields: ManageBudgetFields) => {
      Object.entries(fields).forEach(([key, value]) => {
        setValue(key as keyof ManageBudgetFields, value);
      });
    },
    [setValue]
  );

  useEffect(() => {
    if (fields) {
      setInitialValues(fields);
    }
  }, [fields, setInitialValues]);

  const onSubmit = async (formData: FormData) => {
    if (formData.end_date && formData.start_date && formData.end_date < formData.start_date) {
      toast.error('End date cannot be before start date');
      return;
    }

    try {
      setIsSubmitting(true);
      const newFields = {
        ...formData,
        amount: parseFloat(formData.amount),
        start_date: getFormattedDate(formData.start_date as Date),
        end_date: getFormattedDate(formData.end_date as Date),
      };
      if (id) {
        // if id is present, then we know that the action is update
        const result = await dispatch(updateBudget({ id, fields: newFields }));
        unwrapResult(result);
        toast.success("You've successfully update budget");
      } else {
        const result = await dispatch(addBudget(newFields));
        unwrapResult(result);
        toast.success("You've successfully added new budget");
      }
      setIsSubmitting(false);
      dispatch(fetchBudgets());
      navigate('/budgets');
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
        name="start_date"
        control={control}
        rules={{
          required: 'Start Date is required field',
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
              id="starting_date"
              label="Starting Date"
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
        name="end_date"
        control={control}
        rules={{
          required: 'End date is required field',
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
              id="end-date"
              label="End Date"
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

export default BudgetManageForm;
