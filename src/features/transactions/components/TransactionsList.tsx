import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTransactions, setBudgetStatus } from '../transactions-slice';

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

  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px 0',
    width: '100%',
  },
  alertContainer: {
    margin: '20px 8px',
    width: '100%',
  },
});

const LIMIT = 10;

const TransactionsList = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();

  const parsedQueryString = queryString.parse(location.search);
  const initialPage = parsedQueryString.page ? parseInt(parsedQueryString.page as string) : 1;

  const [page, setPage] = useState(initialPage);

  const { transactions, status, selectedFilter, total } = useAppSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions({ filter: selectedFilter, page }));
    }
  }, [status, dispatch, selectedFilter, page]);

  if (status === 'idle' || status === 'loading') {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const newQueryString = queryString.stringify({
      ...parsedQueryString,
      page: value,
    });
    const url = `${location.pathname}?${newQueryString}`;
    history.push(url);
    dispatch(setBudgetStatus('idle'));
  };

  const paginationCount = Math.ceil(total / LIMIT);

  const showPagination = paginationCount > 1;

  return (
    <Grid container spacing={2}>
      {transactions.length > 0 ? (
        <>
          {transactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))}
        </>
      ) : (
        <Alert className={classes.alertContainer} severity="info">
          No transactions yet.
        </Alert>
      )}
      {showPagination && (
        <div className={classes.paginationContainer}>
          <Pagination
            count={paginationCount}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handlePaginationChange}
          />
        </div>
      )}
    </Grid>
  );
};

export default TransactionsList;
