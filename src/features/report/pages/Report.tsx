import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

import ReportChart from '../components/ReportChart';
import { setSelectedFilter } from '../slice';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import SelectDateRangeModal from '@/components/SelectDateRangeModal/SelectDateRangeModal';
import { DateRange } from '@/types';

const useStyles = makeStyles(() =>
  createStyles({
    topContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 20,
    },
    selectContainer: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      padding: '12px  10px',
      boxSizing: 'border-box',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    actionContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: '1px solid transparent',
    },
    label: {
      marginRight: 5,
    },
  })
);

const ReportPage = () => {
  const classes = useStyles();

  const { filter } = useAppSelector((state) => state.report);

  const [showDateRangeModal, setShowDateRangeModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleCloseDateRangeModal = () => {
    setShowDateRangeModal(false);
  };

  const handleSelectDateRange = (range: DateRange) => {
    dispatch(setSelectedFilter(range));
    handleCloseDateRangeModal();
  };

  const startDate = format(parseISO(filter.start_date), 'MMMM d, yyyy');
  const endDate = format(parseISO(filter.end_date), 'MMMM d, yyyy');

  return (
    <div>
      <div className={classes.topContainer}>
        <div className={classes.selectContainer}>
          <button
            className={classes.actionContainer}
            type="button"
            onClick={() => setShowDateRangeModal(true)}
          >
            <Typography className={classes.label}>{filter.label}</Typography>
            <Typography variant="body2" color="textSecondary">
              {`${startDate}  - ${endDate}`}
            </Typography>
            <ArrowDropDownIcon />
          </button>
        </div>
      </div>
      <ReportChart />
      <SelectDateRangeModal
        onSelectDateRange={handleSelectDateRange}
        show={showDateRangeModal}
        onClose={handleCloseDateRangeModal}
      />
    </div>
  );
};

export default ReportPage;
