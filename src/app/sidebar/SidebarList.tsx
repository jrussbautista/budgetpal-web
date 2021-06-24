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
import CategoryIcon from '@material-ui/icons/Category';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  list: {
    color: theme.palette.common.white,
  },
  listItem: {
    color: '#fff',
  },
}));

interface Links {
  href: string;
  icon: React.ReactElement;
  title: string;
}

const LINKS: Links[] = [
  {
    href: '/',
    icon: <DashboardIcon />,
    title: 'Dashboard',
  },
  {
    href: '/transactions',
    icon: <PaymentIcon />,
    title: 'Transactions',
  },
  {
    href: '/budgets',
    icon: <AccountBalanceIcon />,
    title: 'Budgets',
  },
  {
    href: '/categories',
    icon: <CategoryIcon />,
    title: 'Categories',
  },
  {
    href: '/report',
    icon: <EqualizerIcon />,
    title: 'Report',
  },
  {
    href: '/settings',
    icon: <SettingsIcon />,
    title: 'Settings',
  },
  {
    href: '/account',
    icon: <PersonIcon />,
    title: 'Account',
  },
];

const SidebarList = () => {
  const classes = useStyles();

  const location = useLocation();

  const getIsActive = (path: string) => {
    return path === location.pathname;
  };

  return (
    <List className={classes.list}>
      {LINKS.map((link, index) => (
        <ListItem
          key={index}
          button
          component={Link}
          to={link.href}
          selected={getIsActive(link.href)}
        >
          <ListItemIcon className={classes.listItem}>{link.icon}</ListItemIcon>
          <ListItemText primary={link.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarList;
