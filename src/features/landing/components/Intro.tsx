import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../app/hooks';
import introImage from '../../../assets/images/intro.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    introContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 4rem)',
    },
    mainTitle: {
      marginBottom: 20,
    },
    sub: {
      color: theme.palette.grey[700],
      fontWeight: 400,
      marginBottom: 20,
    },
    introImgContainer: {
      marginBottom: 40,
    },
    introImg: {
      width: '100%',
      boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 5px, rgb(0 0 0 / 5%) 0px 1px 2px',
      borderRadius: 4,
      overflow: 'hidden',
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
  })
);

const Intro = () => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={classes.introContainer}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={5} xs={12}>
            <div className={classes.main}>
              <Typography variant="h4" component="h2" className={classes.mainTitle}>
                Easily keep track your budgets.
              </Typography>
              <Typography variant="h6" className={classes.sub}>
                Create flexible budgets and build better money management habits.
              </Typography>
              <div>
                {user ? (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    component={Link}
                    to="/dashboard"
                    disableElevation
                  >
                    View Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    component={Link}
                    to="/signup"
                    disableElevation
                  >
                    Create your account
                  </Button>
                )}
              </div>
            </div>
          </Grid>
          <Grid item lg={7} xs={12}>
            <div className={classes.introImgContainer}>
              <img src={introImage} alt="dashboard" className={classes.introImg} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Intro;
