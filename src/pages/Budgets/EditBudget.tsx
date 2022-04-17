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
import { fetchBudget, clearBudget } from 'features/budgets/budgetsSlice';
import { ManageBudgetFields } from 'types/Budget';

const useStyles = makeStyles(() => ({
  loadingContainer: {
    textAlign: 'center',
    margin: '100px 0',
  },
}));

const UpdateBudgetPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { budget } = useAppSelector((state) => state.budgets);
  const { status, data } = budget;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchBudget(id as string));
    return () => {
      dispatch(clearBudget());
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
    return <Alert severity="error">Unable to fetch budget right now. Please try again.</Alert>;
  }

  const { amount, category, start_date, end_date } = data;

  const fields: ManageBudgetFields = {
    amount,
    category_id: category.id,
    start_date,
    end_date,
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Update Budget</Typography>
        <BudgetManageForm id={id} fields={fields} />
      </CardContent>
    </Card>
  );
};

export default UpdateBudgetPage;
