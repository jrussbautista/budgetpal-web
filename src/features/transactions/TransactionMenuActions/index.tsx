import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import TransactionDeleteDialog from 'features/transactions/TransactionDeleteDialog';
import { setSelectedTransaction, setSelectedModal } from 'features/transactions/transactionsSlice';
import { Transaction } from 'types/Transaction';

const useStyles = makeStyles(() =>
  createStyles({
    actionsContainer: {
      padding: 5,
    },
  })
);

type TransactionMenuActionsProps = {
  transaction: Transaction;
};

const TransactionMenuActions = ({ transaction }: TransactionMenuActionsProps) => {
  const dispatch = useAppDispatch();

  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    setAnchorEl(null);
    dispatch(setSelectedModal('manageTransactionModal'));
    dispatch(setSelectedTransaction(transaction));
  };

  const handleClickDelete = () => {
    setIsOpenConfirmDelete(true);
    setAnchorEl(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsOpenConfirmDelete(false);
  };

  return (
    <div className={classes.actionsContainer}>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="transaction menu options"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
        <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
      </Menu>
      <TransactionDeleteDialog
        isVisible={isOpenConfirmDelete}
        id={transaction.id}
        onClose={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default TransactionMenuActions;
