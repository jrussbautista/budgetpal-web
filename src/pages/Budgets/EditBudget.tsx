import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import BudgetManageForm from 'features/budgets/BudgetManageForm';
import {
  fetchBudget,
  setSelectedBudget,
  clearBudget,
  clearSelectedBudget,
} from 'features/budgets/budgetsSlice';

const useStyles = makeStyles(() => ({
  loadingContainer: {
    textAlign: 'center',
    margin: '100px 0',
  },
}));

const UpdateBudgetPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { budget, selectedBudget } = useAppSelector((state) => state.budgets);
  const { status, data } = budget;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchBudget(id));
    return () => {
      dispatch(clearBudget());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      dispatch(setSelectedBudget(data));
    }
    return () => {
      dispatch(clearSelectedBudget());
    };
  }, [data, dispatch]);

  const isLoading = status === 'idle' || status === 'loading' || !selectedBudget;
  const isError = status === 'failed' || !data;

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <Alert severity="error">Unable to fetch budget right now. Please try again.</Alert>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Update Budget</Typography>
        <BudgetManageForm />
      </CardContent>
    </Card>
  );
};

export default UpdateBudgetPage;
