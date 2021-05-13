import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { fetchDashboard } from './dashboard-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import formatMoney from '../../shared/models/formatMonet';

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
  })
);

const DashboardPage = () => {
  const classes = useStyles();
  const { dashboard, status } = useAppSelector((state) => state.dashboard);
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
      <Alert severity='error'>
        Failed to get dashboard data right now. Please try again later.
      </Alert>
    );
  }

  return (
    <Grid container spacing={2}>
      {dashboard?.analytics.map((analytic, index) => (
        <Grid item xs={12} md={6} lg={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant='body1' component='h2' color='textSecondary'>
                {analytic.name}
              </Typography>
              <Typography variant='h5' className={classes.amount}>
                {formatMoney(analytic.value)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardPage;
