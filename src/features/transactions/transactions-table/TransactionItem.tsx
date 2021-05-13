import { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { Transaction } from '../TransactionModel';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ConfirmDialog from '../../../shared/components/confirm-dialog';
import { useAppDispatch } from '../../../app/hooks';
import {
  deleteTransaction,
  setSelectedTransaction,
  showTransactionModal,
} from '../transactions-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import formatMoney from '../../../shared/models/formatMonet';

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

  const handleClickEdit = () => {
    dispatch(showTransactionModal(true));
    dispatch(setSelectedTransaction(transaction));
  };

  return (
    <>
      <TableRow>
        <TableCell component='th' scope='row'>
          {transaction.title}
        </TableCell>
        <TableCell align='center'>
          {formatMoney(transaction.amount, '$')}
        </TableCell>
        <TableCell align='center'>{transaction.category.title}</TableCell>
        <TableCell align='center'>{transaction.created_at}</TableCell>
        <TableCell align='center'>
          <Button
            variant='contained'
            color='primary'
            className='mr-5'
            disableElevation
            style={{ marginRight: 10 }}
            onClick={handleClickEdit}
          >
            <EditIcon />
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disableElevation
            onClick={handleClickDelete}
          >
            <DeleteIcon />
          </Button>

          <ConfirmDialog
            isVisible={isConfirmModalOpen}
            title='Are you sure you want to delete this comment?'
            message='Once you delete it gone for good.'
            onClose={handleConfirmModalClose}
            onConfirm={handleTransactionDelete}
            isConfirming={isDeleting}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TransactionItem;
