import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'fixed',
      width: '100%',
      height: '100vh',
      right: 0,
      top: 0,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 240,
      },
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
  })
);

const PageLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default PageLoader;
