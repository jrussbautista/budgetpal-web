import { Typography } from '@material-ui/core';
import React from 'react';
import Modal from '../../../shared/components/modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props {
  show: boolean;
  onClose(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: '15px 10px',
      borderBottom: '1px solid #ccc',
      cursor: 'pointer',
    },
  })
);

interface Range {
  label: string;
  value: string;
  start_date: string;
  end_date: string;
}

const getDateRanges = () => {
  const ranges: Range[] = [];

  ranges.push({
    label: 'This Month',
    value: 'thisMonth',
    start_date: '2021-05-1',
    end_date: '2021-05-31',
  });

  ranges.push({
    label: 'Last Month',
    value: 'thisMonth',
    start_date: '2021-04-1',
    end_date: '2021-04-30',
  });

  ranges.push({
    label: 'Last 3 Months',
    value: 'thisMonth',
    start_date: '2021-01-1',
    end_date: '2021-01-31',
  });

  return ranges;
};

const SelectDateRangeModal: React.FC<Props> = ({ show, onClose }) => {
  const classes = useStyles();

  const dateRanges = getDateRanges();

  const handleSelectDateRange = (range: Range) => {};

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
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SelectDateRangeModal;
