import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Transaction } from '../TransactionModel';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ConfirmDialog from '../../../shared/components/confirm-dialog';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteTransaction,
  setSelectedTransaction,
  setSelectedModal,
} from '../transactions-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import formatMoney from '../../../shared/utils/formatMoney';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  transaction: Transaction;
}

const useStyles = makeStyles((theme) => ({
  expense: {
    color: theme.palette.error.main,
  },
  income: {
    color: theme.palette.primary.main,
  },
  amount: {
    marginTop: 10,
  },
  progress: {
    marginTop: 20,
  },
  datesContainer: {
    marginBottom: 10,
  },
  cardContainer: {
    display: 'flex',
  },
  infoContainer: {
    flex: 1,
  },
  actionsContainer: {
    padding: 5,
  },
  mainInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
}));

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const classes = useStyles();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { currency } = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const handleClickDelete = () => {
    setIsConfirmModalOpen(true);
    handleCloseMenu();
  };

  const handleClickEdit = () => {
    dispatch(setSelectedModal('manageTransactionModal'));
    dispatch(setSelectedTransaction(transaction));
    handleCloseMenu();
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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

  const amountClassName =
    transaction.type === 'expense' ? classes.expense : classes.income;

  const amountOperation = transaction.type === 'expense' ? '-' : '+';

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <div className={classes.cardContainer}>
            <div className={classes.infoContainer}>
              <div className={classes.datesContainer}>
                <Typography variant='body2' color='textSecondary'>
                  {transaction.happened_on}
                </Typography>
              </div>
              <Typography variant='h6' component='h2'>
                {transaction.category.title}
              </Typography>

              <div className={classes.mainInfoContainer}>
                <Typography variant='body1' component='h2'>
                  {transaction.title}
                </Typography>

                <Typography variant='h6' className={amountClassName}>
                  {amountOperation}
                  {formatMoney(
                    transaction.amount,
                    currency.code,
                    currency.locale
                  )}
                </Typography>
              </div>
            </div>
            <div className={classes.actionsContainer}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        isVisible={isConfirmModalOpen}
        title='Are you sure you want to delete this comment?'
        message='Once you delete it gone for good.'
        onClose={handleConfirmModalClose}
        onConfirm={handleTransactionDelete}
        isConfirming={isDeleting}
      />
    </Grid>
  );
};

export default TransactionItem;
