import { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../sidebar/Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
    },
    toolbar: {
      maxWidth: 1200,
      margin: '0 auto',
      width: '100%',
      display: 'flex',
    },
    logo: {
      width: 40,
      marginRight: 5,
    },
    siteLogoLinkContainer: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 20,
      textDecoration: 'none',
    },
    spacer: {
      flex: 1,
    },
    link: {
      marginRight: 20,
      color: theme.palette.grey[700],
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
    },
    desktopMenu: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        display: 'block',
      },
    },
    mobileMenuButton: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
  })
);

const Navbar = () => {
  const classes = useStyles();

  const [isOpenSidebar, setisOpenSidebar] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  const toggleSidebar = () => {
    setisOpenSidebar(!isOpenSidebar);
  };

  return (
    <AppBar position='static' elevation={0} color='transparent'>
      <Toolbar className={classes.toolbar}>
        <Link to='/' className={classes.siteLogoLinkContainer}>
          <img
            src='/images/logo.svg'
            alt='budgetty-logo'
            className={classes.logo}
          />
          <Typography variant='h6' className={classes.title}>
            Budgetty
          </Typography>
        </Link>

        <div className={classes.spacer} />

        <div className={classes.desktopMenu}>
          <Button
            component={HashLink}
            color='inherit'
            to='/#features'
            className={`${classes.link} ${classes.button}`}
            smooth
          >
            Features
          </Button>

          {user ? (
            <Button
              color='primary'
              variant='contained'
              className={classes.button}
              component={Link}
              to='/dashboard'
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                color='inherit'
                className={`${classes.link} ${classes.button}`}
                component={Link}
                to='/signin'
              >
                Sign In
              </Button>
              <Button
                color='primary'
                variant='contained'
                disableElevation
                className={classes.button}
                component={Link}
                to='/signup'
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        <Button onClick={toggleSidebar} className={classes.mobileMenuButton}>
          <MenuIcon />
        </Button>

        <Sidebar
          isOpen={isOpenSidebar}
          onClose={toggleSidebar}
          onOpen={toggleSidebar}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
