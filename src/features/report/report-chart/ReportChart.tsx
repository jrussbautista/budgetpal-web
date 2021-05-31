import { useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fetchReport } from '../report-slice';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomToolTip from './CustomToolTip';
import getTransactionByDay from '../utils/get-transaction-by-day';
import Alert from '@material-ui/lab/Alert';

const days: number[] = [];

for (let i = 1; i <= 30; i++) {
  days.push(i);
}

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

const ReportChart = () => {
  const classes = useStyles();
  const { status, transactions } = useAppSelector((state) => state.report);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReport());
    }
  }, [status, dispatch]);

  const dataFormatter = (value: string) => {
    return `P${value}`;
  };

  const getData = () => {
    return days.map((day) => {
      const result = getTransactionByDay(transactions, day);
      if (result) {
        return {
          amount: result.amount,
          date: result.selectedDate,
          day,
        };
      } else {
        return {
          day,
        };
      }
    });
  };

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
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        width={500}
        height={300}
        data={getData()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey='day' scale='point' padding={{ left: 10, right: 10 }} />
        <YAxis tickFormatter={dataFormatter} />
        <Tooltip content={<CustomToolTip />} />

        <Bar dataKey='amount' fill='#8884d8' background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
