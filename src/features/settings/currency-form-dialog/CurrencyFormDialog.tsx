import { ChangeEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSelectedDialog, setCurrency } from '../settings-slice';
import { CURRENCIES } from '../../../shared/constants/currency';

const useStyles = makeStyles((theme: Theme) =>
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

const CurrencyFormDialog = () => {
  const classes = useStyles();

  const { selectedDialog, currency } = useAppSelector(
    (state) => state.settings
  );

  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    currency.code
  );

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(String(event.target.value) || '');
  };

  const isOpenDialog = selectedDialog === 'currencyForm';

  const handleCloseDialog = () => {
    dispatch(setSelectedDialog(null));
  };

  const handleSave = () => {
    const newCurrency = {
      ...CURRENCIES[selectedCurrency],
      code: selectedCurrency,
    };
    dispatch(setCurrency(newCurrency));
    handleCloseDialog();
  };

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={isOpenDialog}>
      <DialogTitle>Select Currency </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor='demo-dialog-native'>Currency</InputLabel>
            <Select
              native
              value={selectedCurrency}
              onChange={handleChange}
              input={<Input id='demo-dialog-native' />}
            >
              <option value={'USD'}>U.S Dollar </option>
              <option value={'PHP'}>Philippine Peso</option>
            </Select>
          </FormControl>
        </form>
        <DialogActions>
          <Button color='primary' onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button color='primary' onClick={handleSave}>
            Ok
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyFormDialog;
