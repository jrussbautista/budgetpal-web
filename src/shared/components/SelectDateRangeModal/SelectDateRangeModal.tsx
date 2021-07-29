import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';

import { DateRange } from '../../types/DateRange';
import formatDate from '../../utils/formatDate';
import { getStartAndEndDate } from '../../utils/getDateRange';
import Modal from '../Modal';

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      padding: '15px 10px',
      border: '1px solid transparent',
      borderBottom: '1px solid #ccc',
      cursor: 'pointer',
      background: 'transparent',
    },
  })
);

const getDateRanges = () => {
  const ranges: DateRange[] = [];

  const thisMonth = getStartAndEndDate('thisMonth');
  const lastMonth = getStartAndEndDate('lastMonth', 1);
  const last3Months = getStartAndEndDate('lastMonth', 3);
  const last6Months = getStartAndEndDate('lastMonth', 6);
  const thisYear = getStartAndEndDate('year');
  const lastYear = getStartAndEndDate('year', 1);

  ranges.push({
    label: 'This Month',
    start_date: thisMonth.startDate,
    end_date: thisMonth.endDate,
  });

  ranges.push({
    label: 'Last Month',
    start_date: lastMonth.startDate,
    end_date: lastMonth.endDate,
  });

  ranges.push({
    label: 'Last 3 Months',
    start_date: last3Months.startDate,
    end_date: last3Months.endDate,
  });

  ranges.push({
    label: 'Last 6 Months',
    start_date: last6Months.startDate,
    end_date: last6Months.endDate,
  });

  ranges.push({
    label: 'This Year',
    start_date: thisYear.startDate,
    end_date: thisYear.endDate,
  });

  ranges.push({
    label: 'Last Year',
    start_date: lastYear.startDate,
    end_date: lastYear.endDate,
  });

  return ranges;
};

interface Props {
  show: boolean;
  onClose(): void;
  onSelectDateRange(range: DateRange): void;
}

const SelectDateRangeModal: React.FC<Props> = ({ show, onClose, onSelectDateRange }) => {
  const classes = useStyles();

  const dateRanges = getDateRanges();

  const handleSelectDateRange = (range: DateRange) => {
    onSelectDateRange(range);
  };

  return (
    <Modal title="Select Date Range" isVisible={show} onClose={onClose}>
      <div>
        {dateRanges.map((range, idx) => (
          <button
            key={idx}
            className={classes.listItem}
            type="button"
            onClick={() => handleSelectDateRange(range)}
          >
            <Typography variant="body1">{range.label}</Typography>
            <Typography variant="body2" color="textSecondary">
              {`${formatDate(range.start_date)} - ${formatDate(range.end_date)}`}
            </Typography>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default SelectDateRangeModal;
