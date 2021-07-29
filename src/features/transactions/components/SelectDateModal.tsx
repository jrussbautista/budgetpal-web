import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Modal from '@/shared/components/Modal';
import getFormattedDate from '@/shared/utils/getFormattedDate';

import { setSelectedFilter, setSelectedModal } from '../transactions-slice';

const useStyles = makeStyles({
  group: {
    marginBottom: 20,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const SelectDateModal = () => {
  const classes = useStyles();
  const { selectedModal, selectedFilter } = useAppSelector((state) => state.transactions);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!selectedFilter.start_date) setStartDate(null);
    if (!selectedFilter.end_date) setEndDate(null);
  }, [selectedFilter.start_date, selectedFilter.end_date]);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setSelectedModal(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      return toast.error('Starting date is required');
    }

    if (!endDate) {
      return toast.error('End date is required');
    }

    if (endDate < startDate) {
      return toast.error('End date cannot be before start date');
    }

    const formattedStartDate = getFormattedDate(startDate as Date);
    const formattedEndDate = getFormattedDate(endDate as Date);

    dispatch(
      setSelectedFilter({
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      })
    );

    handleCloseModal();
  };

  return (
    <Modal
      title="Select Date"
      isVisible={selectedModal === 'selectDateModal'}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <div className={classes.group}>
          <KeyboardDatePicker
            autoOk
            fullWidth
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="starting-date"
            label="Starting Date"
            value={startDate}
            onChange={(value) => setStartDate(value)}
            KeyboardButtonProps={{
              'aria-label': 'change start date',
            }}
          />
        </div>

        <div className={classes.group}>
          <KeyboardDatePicker
            autoOk
            fullWidth
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="end-date"
            label="End Date"
            value={endDate}
            onChange={(value) => setEndDate(value)}
            KeyboardButtonProps={{
              'aria-label': 'change end date',
            }}
          />
        </div>

        <div className={classes.buttonsContainer}>
          <Button color="secondary" style={{ marginRight: 10 }} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SelectDateModal;
