import { Link, useLocation } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    color: theme.palette.common.white,
  },
  listItem: {
    color: '#fff',
  },
}));

const SidebarList = () => {
  const classes = useStyles();

  const location = useLocation();

  const getIsActive = (path: string) => {
    return path === location.pathname;
  };

  return (
    <List className={classes.list}>
      <ListItem button component={Link} to='/' selected={getIsActive('/')}>
        <ListItemIcon className={classes.listItem}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem
        button
        component={Link}
        to='/transactions'
        selected={getIsActive('/transactions')}
      >
        <ListItemIcon className={classes.listItem}>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary='Transactions' />
      </ListItem>
      <ListItem
        button
        component={Link}
        to='/budgets'
        selected={getIsActive('/budgets')}
      >
        <ListItemIcon className={classes.listItem}>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary='Budgets' />
      </ListItem>
      <ListItem
        button
        component={Link}
        to='/report'
        selected={getIsActive('/report')}
      >
        <ListItemIcon className={classes.listItem}>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary='Report' />
      </ListItem>
      <ListItem
        button
        component={Link}
        to='/account'
        selected={getIsActive('/account')}
      >
        <ListItemIcon className={classes.listItem}>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Account' />
      </ListItem>
      <ListItem
        button
        component={Link}
        to='/settings'
        selected={getIsActive('/settings')}
      >
        <ListItemIcon className={classes.listItem}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItem>
    </List>
  );
};

export default SidebarList;
