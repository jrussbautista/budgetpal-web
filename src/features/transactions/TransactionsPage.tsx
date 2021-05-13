import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Modal from '../../shared/components/modal';
import TransactionManage from './transaction-manage';
import {
  setSelectedTransaction,
  showTransactionModal,
} from './transactions-slice';
import TransactionsTable from './transactions-table';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

const TransactionsPage = () => {
  const classes = useStyles();

  const { isOpenTransactionModal, selectedTransaction } = useAppSelector(
    (state) => state.transactions
  );

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

  return (
    <div>
      <Modal
        isVisible={isOpenTransactionModal}
        onClose={handleCloseTransactionModal}
        title={manageTransactionTitle}
      >
        <TransactionManage />
      </Modal>
      <div className={classes.buttonContainer}>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={handleOpenTransactionModal}
        >
          Add Transaction
        </Button>
      </div>
      <TransactionsTable />
    </div>
  );
};

export default TransactionsPage;
