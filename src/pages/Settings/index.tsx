import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CURRENCIES } from 'constants/currency';
import { updateSettings } from 'features/auth/authSlice';
import CurrencyFormDialog from 'features/settings/CurrencyFormDialog';
import upperCaseFirstLetter from 'utils/uppercaseFistLetter';

const useStyles = makeStyles(() =>
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

  const { user } = useAppSelector((state) => state.auth);

  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleThemeChange = async () => {
    if (!user) {
      return;
    }
    const theme = user.theme === 'light' ? 'dark' : 'light';

    try {
      const results = await dispatch(
        updateSettings({
          theme,
          currency: user.currency,
          language: user.language,
        })
      );
      unwrapResult(results);
      toast.success("You've successfully update settings");
    } catch (error) {
      toast.error('Unable to update settings  right now. Please try again later');
    }
  };

  const handleOpenDialog = (dialog: string) => {
    setSelectedDialog(dialog);
  };

  const handleCloseDialog = () => {
    setSelectedDialog(null);
  };

  return (
    <>
      <CurrencyFormDialog onClose={handleCloseDialog} show={selectedDialog === 'currencyForm'} />
      <Paper className={classes.paper}>
        <List>
          <ListItem role={undefined} dense button onClick={handleThemeChange}>
            <ListItemText primary={`Theme (${upperCaseFirstLetter(user?.theme || '')})`} />
            <div className={classes.actionsContainer}>
              <Switch
                color="primary"
                name="theme"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                checked={user?.theme === 'dark'}
              />
            </div>
          </ListItem>
          <ListItem role="button" dense button onClick={() => handleOpenDialog('currencyForm')}>
            <ListItemText primary="Currency" />
            <div className={classes.actionsContainer}>
              <Typography>{CURRENCIES[user?.currency || 'USD'].title}</Typography>
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
