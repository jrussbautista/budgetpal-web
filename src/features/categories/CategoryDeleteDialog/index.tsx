import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch } from 'app/hooks';
import ConfirmDialog from 'components/ConfirmDialog';
import { deleteCategory } from 'features/categories/categoriesSlice';

type CategoryDeleteDialogProps = {
  id: string;
  isVisible: boolean;
  onClose(): void;
};

const CategoryDeleteDialog = ({ id, isVisible, onClose }: CategoryDeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await dispatch(deleteCategory(id));
      unwrapResult(response);
      toast.success('You have successfully deleted category.');
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this category right now. Please try again later."
      );
      setIsDeleting(false);
    }
  };

  return (
    <ConfirmDialog
      isVisible={isVisible}
      title="Are you sure you want to delete this category?"
      message="Once you delete this it's gone  for good."
      isConfirming={isDeleting}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
};

export default CategoryDeleteDialog;
