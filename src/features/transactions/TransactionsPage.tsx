import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TransactionManageModal from './transaction-manage-modal';
import { setSelectedModal } from './transactions-slice';
import TransactionsList from './transactions-list';
import { makeStyles } from '@material-ui/core/styles';
import TransactionsFilter from './transactions-filter';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles({
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    marginRight: 10,
  },
  transactionsContainer: {
    maxWidth: 800,
    margin: '0 auto',
  },
});

const TransactionsPage = () => {
  const classes = useStyles();

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const { selectedModal } = useAppSelector((state) => state.transactions);

  const dispatch = useAppDispatch();

  const handleOpenTransactionModal = () => {
    dispatch(setSelectedModal('manageTransactionModal'));
  };

  const handleToggleFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <>
      <div className={classes.topContainer}>
        <IconButton className={classes.iconButton} onClick={handleToggleFilter}>
          <FilterListIcon />
        </IconButton>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={handleOpenTransactionModal}
        >
          Add Transaction
        </Button>
      </div>
      <div className={classes.transactionsContainer}>
        {isOpenFilter && (
          <TransactionsFilter onToggleFilter={handleToggleFilter} />
        )}
        <TransactionsList />
      </div>
      {selectedModal === 'manageTransactionModal' && <TransactionManageModal />}
    </>
  );
};

export default TransactionsPage;
