import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

import { setSelectedModal, addCategory, setSelectedCategory, updateCategory } from '../slice';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Modal from '@/components/Modal';

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

const CategoryManageModal = () => {
  const classes = useStyles();

  const { selectedCategory, selectedModal } = useAppSelector((state) => state.categories);

  const defaultValues = {
    title: selectedCategory?.title || '',
  };

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetManageModalTitle = selectedCategory ? 'Edit Category' : 'Add New Category';

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);

      if (selectedCategory) {
        const results = await dispatch(
          updateCategory({ id: selectedCategory.id, fields: formData })
        );
        unwrapResult(results);
        toast.success('You have successfully updated  category');
      } else {
        const results = await dispatch(addCategory(formData));
        unwrapResult(results);
        toast.success('You have successfully added new category');
      }

      handleCloseCategoryModal();
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  const handleCloseCategoryModal = () => {
    dispatch(setSelectedModal(null));
    dispatch(setSelectedCategory(null));
  };

  return (
    <Modal
      title={budgetManageModalTitle}
      isVisible={selectedModal === 'manageCategoryModal'}
      onClose={handleCloseCategoryModal}
    >
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
    </Modal>
  );
};

export default CategoryManageModal;
