import { useState } from 'react';
import ReportChart from './report-chart/ReportChart';
import SelectDateRangeModal from '../../shared/components/select-date-range-modal/SelectDateRangeModal';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { format, parseISO } from 'date-fns';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DateRange } from '../../shared/models/DateRange';
import { setSelectedFilter } from './report-slice';

const useStyles = makeStyles((theme: Theme) =>
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
          <div
            className={classes.actionContainer}
            role='button'
            onClick={() => setShowDateRangeModal(true)}
          >
            <Typography className={classes.label}>{filter.label}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {`${startDate}  - ${endDate}`}
            </Typography>
            <ArrowDropDownIcon />
          </div>
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
