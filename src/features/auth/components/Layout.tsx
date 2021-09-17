import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import loginCoverImg from '@/assets/images/budgetty-login-cover.jpg';
import logo from '@/assets/images/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
  },

  logo: {
    width: 60,
    marginBottom: 10,
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <span>Budgetpal</span> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface Props {
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={{ backgroundImage: `url(${loginCoverImg})` }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logo} alt="Budgetpal logo" className={classes.logo} />
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {children}
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Layout;
