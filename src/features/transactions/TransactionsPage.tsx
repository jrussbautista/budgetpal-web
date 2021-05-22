import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Modal from '../../shared/components/modal';
import TransactionManage from './transaction-manage';
import {
  setSelectedTransaction,
  showTransactionModal,
  toggleFilter,
} from './transactions-slice';
import TransactionsTable from './transactions-table';
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
});

const TransactionsPage = () => {
  const classes = useStyles();

  const { isOpenTransactionModal, isOpenFilter, selectedTransaction } =
    useAppSelector((state) => state.transactions);

  const manageTransactionTitle = selectedTransaction
    ? 'Edit Transaction'
    : 'Add Transaction';

  const dispatch = useAppDispatch();

  const handleCloseTransactionModal = () => {
    dispatch(showTransactionModal(false));
    dispatch(setSelectedTransaction(null));
  };

  const handleOpenTransactionModal = () => {
    dispatch(showTransactionModal(true));
  };

  const handleToggleFilter = () => {
    dispatch(toggleFilter());
  };

  return (
    <div>
      <Modal
        isVisible={isOpenTransactionModal}
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
      {isOpenFilter && <TransactionsFilter />}
      <TransactionsTable />
    </div>
  );
};

export default TransactionsPage;
