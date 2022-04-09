import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch } from 'app/hooks';
import ConfirmDialog from 'components/ConfirmDialog';
import { deleteTransaction } from 'features/transactions/transactionsSlice';

type TransactionDeleteDialogProps = {
  id: string;
  isVisible: boolean;
  onClose(): void;
};

const TransactionDeleteDialog = ({ id, isVisible, onClose }: TransactionDeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await dispatch(deleteTransaction(id));
      unwrapResult(response);
      toast.success('You have successfully deleted the transaction.');
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this transaction right now. Please try again later."
      );
      setIsDeleting(false);
    }
  };

  return (
    <ConfirmDialog
      isVisible={isVisible}
      title="Are you sure you want to delete this transaction?"
      message="Once you delete this it's gone  for good."
      isConfirming={isDeleting}
      onClose={onClose}
      onConfirm={handleDelete}
    />
  );
};

export default TransactionDeleteDialog;
