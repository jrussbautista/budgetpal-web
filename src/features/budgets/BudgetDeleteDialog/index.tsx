import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch } from 'app/hooks';
import ConfirmDialog from 'components/ConfirmDialog';
import { deleteBudget } from 'features/budgets/budgetsSlice';

type BudgetDeleteDialogProps = {
  id: string;
  isVisible: boolean;
  onClose(): void;
};

const BudgetDeleteDialog = ({ id, isVisible, onClose }: BudgetDeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await dispatch(deleteBudget(id));
      unwrapResult(response);
      toast.success('You have successfully deleted the budget.');
    } catch (error) {
      toast.error("Sorry we were'nt able to delete this budget right now. Please try again later.");
      setIsDeleting(false);
    }
  };

  return (
    <ConfirmDialog
      isVisible={isVisible}
      title="Are you sure you want to delete this budget?"
      message="Once you delete this it's gone  for good."
      isConfirming={isDeleting}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
};

export default BudgetDeleteDialog;
