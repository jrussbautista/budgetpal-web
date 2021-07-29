import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CURRENCIES } from '../../../shared/constants/currency';
import formatMoney from '../../../shared/utils/formatMoney';
import BudgetCard from '../../budgets/components/BudgetCard';
import TransactionCard from '../../transactions/components/TransactionCard';
import { fetchDashboard } from '../dashboard-slice';

const useStyles = makeStyles(() =>
  createStyles({
    loadingContainer: {
      textAlign: 'center',
      margin: '100px 0',
    },
    amount: {
      textAlign: 'center',
      marginTop: 10,
    },
    section: {
      margin: '30px 0',
    },
    heading: {
      marginBottom: 10,
    },
  })
);

const DashboardPage = () => {
  const classes = useStyles();
  const { dashboard, status } = useAppSelector((state) => state.dashboard);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboard());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert severity="error">
        Failed to get dashboard data right now. Please try again later.
      </Alert>
    );
  }

  const currencyCode = user?.currency || 'USD';
  const locale = CURRENCIES[currencyCode].locale;

  return (
    <>
      <Grid container spacing={2}>
        {dashboard?.analytics.map((analytic, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="body1" component="h2" color="textSecondary">
                  {analytic.name}
                </Typography>
                <Typography variant="h5" className={classes.amount}>
                  {formatMoney(analytic.value, currencyCode, locale)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {dashboard && dashboard.recentOnGoingBudget && (
        <div className={classes.section}>
          <Typography variant="h6" component="h2" className={classes.heading}>
            Recent On Going Budget
          </Typography>
          <BudgetCard budget={dashboard.recentOnGoingBudget} />
        </div>
      )}

      {dashboard && dashboard.recentTransaction && (
        <div className={classes.section}>
          <Typography variant="h6" component="h2" className={classes.heading}>
            Recent Transaction
          </Typography>
          <TransactionCard transaction={dashboard.recentTransaction} />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
