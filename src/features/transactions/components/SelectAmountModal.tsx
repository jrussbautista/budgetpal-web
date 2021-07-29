import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Modal from '../../../shared/components/Modal';
import { setSelectedFilter } from '../transactions-slice';

const useStyles = makeStyles({
  group: {
    marginBottom: 20,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

interface Props {
  onClose(): void;
  show: boolean;
}

const SelectAmountModal: React.FC<Props> = ({ onClose, show }) => {
  const classes = useStyles();

  const { selectedFilter } = useAppSelector((state) => state.transactions);

  const [amount, setAmount] = useState({
    min: selectedFilter.min_amount || '',
    max: selectedFilter.max_amount || '',
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSelectedFilter({ min_amount: amount.min, max_amount: amount.max }));
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount({
      ...amount,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal title="Select Amount" isVisible={show} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={classes.group}>
          <TextField
            id="min"
            label="Min Amount"
            variant="outlined"
            name="min"
            fullWidth
            onChange={handleChange}
            value={amount.min}
          />
        </div>

        <div className={classes.group}>
          <TextField
            id="max"
            label="Max Amount"
            variant="outlined"
            name="max"
            fullWidth
            onChange={handleChange}
            value={amount.max}
          />
        </div>

        <div className={classes.buttonsContainer}>
          <Button color="secondary" style={{ marginRight: 10 }} onClick={onClose}>
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

export default SelectAmountModal;
