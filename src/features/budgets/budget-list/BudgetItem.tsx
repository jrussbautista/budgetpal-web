import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Budget } from '../../../shared/models/Budget';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../app/hooks';
import {
  deleteBudget,
  setSelectedBudget,
  setSelectedModal,
} from '../budgets-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import ConfirmDialog from '../../../shared/components/confirm-dialog';
import BudgetCard from '../../../shared/components/budget-card';

interface Props {
  budget: Budget;
}

const BudgetItem: React.FC<Props> = ({ budget }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const handleClickEdit = () => {
    dispatch(setSelectedModal('manageBudgetModal'));
    dispatch(setSelectedBudget(budget));
  };

  const handleClickDelete = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleDeleteBudget = async () => {
    try {
      setIsDeleting(true);
      const response = await dispatch(deleteBudget(budget.id));
      unwrapResult(response);
      toast.success('You have successfully deleted the budget.');
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this budget right now. Please try again later."
      );
      setIsDeleting(false);
    }
  };

  return (
    <Grid item xs={12}>
      <BudgetCard
        budget={budget}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
        hasMenu
      />
      <ConfirmDialog
        isVisible={isConfirmDialogOpen}
        title='Are you sure you want to delete this budget?'
        message="Once you delete this it's gone  for good."
        isConfirming={isDeleting}
        onClose={handleConfirmDialogClose}
        onConfirm={handleDeleteBudget}
      />
    </Grid>
  );
};

export default BudgetItem;
