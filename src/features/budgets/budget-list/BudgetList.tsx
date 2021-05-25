import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { fetchBudgets } from '../budgets-slice';
import BudgetItem from './BudgetItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      textAlign: 'center',
      margin: '100px 0',
    },
    amount: {
      textAlign: 'center',
      marginTop: 10,
    },
    progress: {
      marginTop: 20,
    },
    budgetListContainer: {
      maxWidth: 800,
      margin: '0 auto',
    },
  })
);

const BudgetList = () => {
  const classes = useStyles();

  const { status, budgets } = useAppSelector((state) => state.budgets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBudgets());
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
    <div className={classes.budgetListContainer}>
      <Grid container spacing={2}>
        {budgets.map((budget) => (
          <BudgetItem budget={budget} key={budget.id} />
        ))}
      </Grid>
    </div>
  );
};

export default BudgetList;
