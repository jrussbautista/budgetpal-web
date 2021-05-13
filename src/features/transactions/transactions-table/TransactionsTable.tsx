import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTransactions } from '../transactions-slice';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import TransactionItem from './TransactionItem';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttonsContainer: {},
  buttonAction: {
    marginRight: 10,
  },
  loadingContainer: {
    textAlign: 'center',
    margin: '100px 0',
  },
});

const TransactionsTable = () => {
  const classes = useStyles();

  const { transactions, status } = useAppSelector(
    (state) => state.transactions
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='transactions table'>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align='center'>Amount</TableCell>
            <TableCell align='center'>Category</TableCell>
            <TableCell align='center'>Date</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
