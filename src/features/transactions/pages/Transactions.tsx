import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import TransactionManageModal from '../components/TransactionManageModal';
import TransactionsFilter from '../components/TransactionsFilter';
import TransactionsList from '../components/TransactionsList';
import { setSelectedModal } from '../transactions-slice';

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
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleOpenTransactionModal}
        >
          Add Transaction
        </Button>
      </div>
      <>
        {isOpenFilter && <TransactionsFilter onToggleFilter={handleToggleFilter} />}
        <TransactionsList />
      </>
      {selectedModal === 'manageTransactionModal' && <TransactionManageModal />}
    </>
  );
};

export default TransactionsPage;
