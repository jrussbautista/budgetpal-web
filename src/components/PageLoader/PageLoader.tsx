import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import logo from '@/assets/images/logo.svg';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'fixed',
      width: '100%',
      height: '100vh',
      right: 0,
      top: 0,
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      flexDirection: 'column',
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
  })
);

const PageLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <img src={logo} alt="Budgetpal logo" className={classes.logo} />
        <CircularProgress />
      </div>
    </div>
  );
};

export default PageLoader;
