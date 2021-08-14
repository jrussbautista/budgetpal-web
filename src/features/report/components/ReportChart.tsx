import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { getDaysInMonth, differenceInDays, addMonths, getMonth } from 'date-fns';
import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { fetchReport } from '../slice';
import getChartLabel from '../utils/getChartLabel';
import getTransactionByDate from '../utils/getTransactionByDate';

import CustomToolTip from './CustomToolTip';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

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
    totalContainer: {
      textAlign: 'center',
      marginBottom: 40,
    },
  })
);

const ReportChart = () => {
  const classes = useStyles();
  const {
    status,
    transactions,
    filter: { start_date, end_date },
  } = useAppSelector((state) => state.report);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReport({ start_date, end_date }));
  }, [dispatch, start_date, end_date]);

  const dataFormatter = (value: string) => {
    return `P${value}`;
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
      <Alert severity="error">
        Failed to get dashboard data right now. Please try again later.
      </Alert>
    );
  }

  const getMonthRange = (startDate: string, endDate: string) => {
    const range = [];
    let currentStartDate = new Date(startDate);
    while (currentStartDate <= new Date(endDate)) {
      range.push(getMonth(currentStartDate) + 1);
      currentStartDate = addMonths(currentStartDate, 1);
    }
    return range;
  };

  const getTicks = (startDate: string, endDate: string, dateType: string) => {
    let ticks: number[] = [];
    const days = getDaysInMonth(new Date());
    const months = 12;

    if (dateType === 'withInMonth') {
      for (let i = 1; i <= days; i++) {
        ticks.push(i);
      }
    } else if (dateType === 'withInMoreThanMonth') {
      ticks = getMonthRange(startDate, endDate);
    } else if (dateType === 'withInYear') {
      for (let i = 1; i <= months; i++) {
        ticks.push(i);
      }
    }
    return ticks;
  };

  const getData = (startDate: string, endDate: string) => {
    const diffInDays = differenceInDays(new Date(endDate), new Date(startDate));

    const withInMonth = diffInDays <= 31;
    const withInMoreThanMonth = diffInDays >= 31 && diffInDays <= 363;
    const withInYear = diffInDays <= 365;

    let dateType = '';

    if (withInMonth) {
      dateType = 'withInMonth';
    } else if (withInMoreThanMonth) {
      dateType = 'withInMoreThanMonth';
    } else if (withInYear) {
      dateType = 'withInYear';
    }

    const ticks = getTicks(startDate, endDate, dateType);

    return ticks.map((tick) => {
      const result = getTransactionByDate(transactions, tick, dateType);
      const label = getChartLabel(dateType, tick);
      if (result) {
        return {
          amount: result.amount,
          date: result.selectedDate,
          tick,
          label,
        };
      }
      return {
        tick,
        label,
      };
    });
  };

  const results = getData(start_date, end_date);

  const totalExpense = results
    .reduce((prev, current) => {
      if (current.amount) {
        return current.amount + prev;
      } else {
        return prev;
      }
    }, 0)
    .toFixed(2);

  return (
    <>
      <div className={classes.totalContainer}>
        <Typography color="textSecondary">Total Expense</Typography>
        <Typography variant="h6">P{totalExpense}</Typography>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={results}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="label" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis tickFormatter={dataFormatter} />
          <Tooltip content={<CustomToolTip />} />

          <Bar dataKey="amount" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ReportChart;
