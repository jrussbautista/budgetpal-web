import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  message: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
  },
});

interface Props {
  message?: string;
  title?: string;
}

const PageError: React.FC<Props> = ({
  message = 'Something went wrong.',
  title = "This page is'nt available",
}) => {
  const classes = useStyles();

  const history = useHistory();

  const handleBackToHome = () => {
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.message}>
        {message}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackToHome}>
        Back to home
      </Button>
    </div>
  );
};

export default PageError;
