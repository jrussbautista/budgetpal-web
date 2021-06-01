import { Typography } from '@material-ui/core';
import React from 'react';
import Modal from '../modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DateRange } from '../../models/DateRange';
import { getStartAndEndDate } from '../../utils/getDateRange';
import formatDate from '../../utils/formatDate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: '15px 10px',
      borderBottom: '1px solid #ccc',
      cursor: 'pointer',
    },
  })
);

const getDateRanges = () => {
  const ranges: DateRange[] = [];

  const thisMonth = getStartAndEndDate();
  const lastMonth = getStartAndEndDate('month', 1);
  const last3Months = getStartAndEndDate('month', 3);
  const thisYear = getStartAndEndDate('year');
  const lastYear = getStartAndEndDate('year', 1);

  ranges.push({
    label: 'This Month',
    value: 'thisMonth',
    start_date: thisMonth.startDate,
    end_date: thisMonth.endDate,
  });

  ranges.push({
    label: 'Last Month',
    value: 'lastMonth',
    start_date: lastMonth.startDate,
    end_date: lastMonth.endDate,
  });

  ranges.push({
    label: 'Last 3 Months',
    value: 'last3Months',
    start_date: last3Months.startDate,
    end_date: last3Months.endDate,
  });

  ranges.push({
    label: 'This Year',
    value: 'thisYear',
    start_date: thisYear.startDate,
    end_date: thisYear.endDate,
  });

  ranges.push({
    label: 'Last Year',
    value: 'lastYear',
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

const SelectDateRangeModal: React.FC<Props> = ({
  show,
  onClose,
  onSelectDateRange,
}) => {
  const classes = useStyles();

  const dateRanges = getDateRanges();

  const handleSelectDateRange = (range: DateRange) => {
    onSelectDateRange(range);
  };

  return (
    <Modal title='Select Date Range' isVisible={show} onClose={onClose}>
      <div>
        {dateRanges.map((range, idx) => (
          <div
            key={idx}
            className={classes.listItem}
            role='button'
            onClick={() => handleSelectDateRange(range)}
          >
            <Typography variant='body1'>{range.label}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {`${formatDate(range.start_date)} - ${formatDate(
                range.end_date
              )}`}
            </Typography>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SelectDateRangeModal;
