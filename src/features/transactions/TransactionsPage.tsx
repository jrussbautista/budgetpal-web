import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Modal from '../../shared/components/modal';
import TransactionManage from './transaction-manage';
import {
  setSelectedTransaction,
  setSelectedModal,
  toggleFilter,
} from './transactions-slice';
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

  const { selectedModal, isOpenFilter, selectedTransaction } = useAppSelector(
    (state) => state.transactions
  );

  const manageTransactionTitle = selectedTransaction
    ? 'Edit Transaction'
    : 'Add Transaction';

  const dispatch = useAppDispatch();

  const handleCloseTransactionModal = () => {
    dispatch(setSelectedModal(null));
    dispatch(setSelectedTransaction(null));
  };

  const handleOpenTransactionModal = () => {
    dispatch(setSelectedModal('manageTransactionModal'));
  };

  const handleToggleFilter = () => {
    dispatch(toggleFilter());
  };

  return (
    <>
      <Modal
        isVisible={selectedModal === 'manageTransactionModal'}
        onClose={handleCloseTransactionModal}
        title={manageTransactionTitle}
      >
        <TransactionManage />
      </Modal>

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
        {isOpenFilter && <TransactionsFilter />}
        <TransactionsList />
      </div>
    </>
  );
};

export default TransactionsPage;
