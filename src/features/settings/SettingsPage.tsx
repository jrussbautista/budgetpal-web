import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import upperCaseFirstLetter from '../../shared/utils/uppercaseFistLetter';
import { setSelectedDialog, toggleTheme } from './settings-slice';
import CurrencyFormDialog from './currency-form-dialog/CurrencyFormDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
    },
    formControl: {
      display: 'flex',
      marginBottom: 30,
    },
    buttonSave: {
      marginTop: 30,
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

const Settings = () => {
  const classes = useStyles();

  const { theme, currency } = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleOpenDialog = (dialog: string) => {
    dispatch(setSelectedDialog(dialog));
  };

  return (
    <>
      <CurrencyFormDialog />
      <Paper className={classes.paper}>
        <List>
          <ListItem role={undefined} dense button onClick={handleThemeChange}>
            <ListItemText primary={`Theme (${upperCaseFirstLetter(theme)})`} />
            <div className={classes.actionsContainer}>
              <Switch
                color='primary'
                name='theme'
                inputProps={{ 'aria-label': 'primary checkbox' }}
                onChange={handleThemeChange}
                checked={theme === 'dark'}
              />
            </div>
          </ListItem>
          <ListItem
            role='button'
            dense
            button
            onClick={() => handleOpenDialog('currencyForm')}
          >
            <ListItemText primary='Currency' />
            <div className={classes.actionsContainer}>
              <Typography>{currency.title}</Typography>
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
            </div>
          </ListItem>
          <ListItem role={undefined} dense button>
            <ListItemText primary='Language' />
            <div className={classes.actionsContainer}>
              <Typography>English</Typography>
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
            </div>
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

export default Settings;
