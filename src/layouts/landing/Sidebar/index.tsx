import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { useAppSelector } from 'app/hooks';

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    sidebar: {
      minWidth: 200,
    },
    listItem: {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
    closeContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px',
    },
  })
);

const Sidebar: React.FC<Props> = ({ isOpen, onOpen, onClose }) => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  return (
    <SwipeableDrawer anchor="right" open={isOpen} onClose={onOpen} onOpen={onClose}>
      <div className={classes.sidebar}>
        <div className={classes.closeContainer}>
          <IconButton aria-label="close sidebar" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <List component="nav" aria-label="sidebar">
          <ListItem
            button
            className={classes.listItem}
            component={HashLink}
            to="/#features"
            scroll={(el: any) => {
              onClose();
              el.scrollIntoView({
                behavior: 'auto',
                block: 'start',
              });
            }}
            smooth
          >
            <ListItemText primary="Features" />
          </ListItem>
          <Divider />
          {user ? (
            <>
              <ListItem button className={classes.listItem} component={HashLink} to="/#features">
                <Button color="primary" variant="contained" disableElevation>
                  Dashboard
                </Button>
              </ListItem>
              <Divider />
            </>
          ) : (
            <>
              <ListItem button className={classes.listItem} component={Link} to="/signin">
                <ListItemText primary="Sign In" />
              </ListItem>
              <Divider />
              <ListItem button className={classes.listItem} component={Link} to="/signup">
                <Button color="primary" variant="contained" disableElevation>
                  Sign Up
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
