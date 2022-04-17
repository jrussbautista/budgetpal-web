import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import TransactionManageForm from 'features/transactions/TransactionManageForm';
import { clearTransaction, fetchTransaction } from 'features/transactions/transactionsSlice';
import { ManageTransactionFields } from 'types/Transaction';

const useStyles = makeStyles(() => ({
  loadingContainer: {
    textAlign: 'center',
    margin: '100px 0',
  },
}));

const UpdateBudgetPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { transaction } = useAppSelector((state) => state.transactions);
  const { status, data } = transaction;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchTransaction(id as string));
    return () => {
      dispatch(clearTransaction());
    };
  }, [dispatch, id]);

  const isLoading = status === 'idle' || status === 'loading';

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (status === 'failed' || !data) {
    return <Alert severity="error">Unable to fetch transaction right now. Please try again.</Alert>;
  }

  const { title, amount, category, type, happened_on } = data;

  const fields: ManageTransactionFields = {
    title,
    amount,
    category_id: category.id,
    type,
    happened_on,
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Update Transaction</Typography>
        <TransactionManageForm fields={fields} />
      </CardContent>
    </Card>
  );
};

export default UpdateBudgetPage;
