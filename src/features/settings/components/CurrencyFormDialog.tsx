import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSettings } from '../../auth/auth-slice';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      marginBottom: 10,
    },
  })
);

interface Props {
  show: boolean;
  onClose(): void;
}

const CurrencyFormDialog: React.FC<Props> = ({ show, onClose }) => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  const [selectedCurrency, setSelectedCurrency] = useState<string>(user?.currency || 'USD');

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(String(event.target.value) || '');
  };

  const handleSave = async () => {
    if (!user) {
      return;
    }

    try {
      const results = await dispatch(
        updateSettings({
          theme: user.theme,
          language: user.language,
          currency: selectedCurrency,
        })
      );
      unwrapResult(results);
      toast.success("You've successfully update settings");
      onClose();
    } catch (error) {
      toast.error('Unable to update settings  right now. Please try again later');
    }
  };

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={show}>
      <DialogTitle>Select Currency </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="demo-dialog-native">Currency</InputLabel>
            <Select
              native
              value={selectedCurrency}
              onChange={handleChange}
              input={<Input id="demo-dialog-native" />}
            >
              <option value={'USD'}>U.S Dollar </option>
              <option value={'PHP'}>Philippine Peso</option>
            </Select>
          </FormControl>
        </form>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Ok
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyFormDialog;
