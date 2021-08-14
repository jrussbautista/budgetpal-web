import Grid from '@material-ui/core/Grid';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { deleteTransaction, setSelectedTransaction, setSelectedModal } from '../slice';
import { Transaction } from '../types';

import TransactionCard from './TransactionCard';

import { useAppDispatch } from '@/app/hooks';
import ConfirmDialog from '@/components/ConfirmDialog';

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const handleClickDelete = () => {
    setIsConfirmModalOpen(true);
  };

  const handleClickEdit = () => {
    dispatch(setSelectedModal('manageTransactionModal'));
    dispatch(setSelectedTransaction(transaction));
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleTransactionDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await dispatch(deleteTransaction(transaction.id));
      unwrapResult(response);
      toast.success('Successfully deleted transaction');
    } catch (error) {
      setIsDeleting(false);
      toast.error(error.message);
    }
  };

  return (
    <Grid item xs={12}>
      <TransactionCard
        transaction={transaction}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
        hasMenu
      />
      <ConfirmDialog
        isVisible={isConfirmModalOpen}
        title="Are you sure you want to delete this comment?"
        message="Once you delete it gone for good."
        onClose={handleConfirmModalClose}
        onConfirm={handleTransactionDelete}
        isConfirming={isDeleting}
      />
    </Grid>
  );
};

export default TransactionItem;
