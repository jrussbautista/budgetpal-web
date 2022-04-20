import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'app/hooks';
import { addCategory, updateCategory } from 'features/categories/categoriesSlice';
import { ManageCategoryFields } from 'types/Category';

interface FormData {
  title: string;
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

interface CategoryManageFormProps {
  id?: string;
  fields?: ManageCategoryFields;
}

const defaultValues = {
  title: '',
};

const CategoryManageForm = ({ id, fields }: CategoryManageFormProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (fields) {
      setValue('title', fields.title);
    }
  }, [fields, setValue]);

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      if (id) {
        const results = await dispatch(updateCategory({ id, fields: formData }));
        unwrapResult(results);
        toast.success('You have successfully updated  category');
      } else {
        const results = await dispatch(addCategory(formData));
        unwrapResult(results);
        toast.success('You have successfully added new category');
      }
      navigate('/categories');
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

export default CategoryManageForm;
