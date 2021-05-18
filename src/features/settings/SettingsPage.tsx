import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import upperCaseFirstLetter from '../../shared/utils/uppercaseFistLetter';
import { toggleTheme } from './settings-slice';

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

  const { theme } = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <Paper className={classes.paper}>
      <List>
        <ListItem role={undefined} dense button onClick={handleThemeChange}>
          <ListItemText primary={`Theme (${upperCaseFirstLetter(theme)})`} />
          <ListItemSecondaryAction className={classes.actionsContainer}>
            <Switch
              color='primary'
              name='theme'
              inputProps={{ 'aria-label': 'primary checkbox' }}
              onChange={handleThemeChange}
              checked={theme === 'dark'}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem role={undefined} dense button>
          <ListItemText primary='Currency' />
          <ListItemSecondaryAction className={classes.actionsContainer}>
            <Typography>USD</Typography>
            <IconButton>
              <ArrowDropDownIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem role={undefined} dense button>
          <ListItemText primary='Language' />
          <ListItemSecondaryAction className={classes.actionsContainer}>
            <Typography>English</Typography>
            <IconButton>
              <ArrowDropDownIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Settings;
