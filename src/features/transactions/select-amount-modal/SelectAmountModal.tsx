import { useState, useEffect } from 'react';
import Modal from '../../../shared/components/modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSelectedFilter, setSelectedModal } from '../transactions-slice';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  group: {
    marginBottom: 20,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const SelectAmountModal = () => {
  const classes = useStyles();
  const { selectedModal, selectedFilter } = useAppSelector(
    (state) => state.transactions
  );

  const [amount, setAmount] = useState({
    min: '',
    max: '',
  });

  useEffect(() => {
    setAmount({
      min: selectedFilter.min_amount,
      max: selectedFilter.max_amount,
    });
  }, [selectedFilter.min_amount, selectedFilter.max_amount]);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setSelectedModal(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setSelectedFilter({ min_amount: amount.min, max_amount: amount.max })
    );
    handleCloseModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount({
      ...amount,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      title='Select Amount'
      isVisible={selectedModal === 'selectAmountModal'}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <div className={classes.group}>
          <TextField
            id='min'
            label='Min Amount'
            variant='outlined'
            name='min'
            fullWidth
            onChange={handleChange}
            value={amount.min}
          />
        </div>

        <div className={classes.group}>
          <TextField
            id='max'
            label='Max Amount'
            variant='outlined'
            name='max'
            fullWidth
            onChange={handleChange}
            value={amount.max}
          />
        </div>

        <div className={classes.buttonsContainer}>
          <Button
            color='secondary'
            style={{ marginRight: 10 }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SelectAmountModal;
