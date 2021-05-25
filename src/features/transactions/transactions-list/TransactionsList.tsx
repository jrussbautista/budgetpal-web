import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTransactions } from '../transactions-slice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TransactionItem from './TransactionItem';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
  },
  buttonsContainer: {},
  buttonAction: {
    marginRight: 10,
  },
  loadingContainer: {
    textAlign: 'center',
    margin: '100px 0',
  },
  transactionListContainer: {
    maxWidth: 800,
    margin: '0 auto',
  },
});

const TransactionsList = () => {
  const classes = useStyles();

  const { transactions, status, selectedFilter } = useAppSelector(
    (state) => state.transactions
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions(selectedFilter));
    }
  }, [status, dispatch, selectedFilter]);

  if (status === 'loading') {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.transactionListContainer}>
      <Grid container spacing={2}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))
        ) : (
          <div>No Transactions yet.</div>
        )}
      </Grid>
    </div>
  );
};

export default TransactionsList;
