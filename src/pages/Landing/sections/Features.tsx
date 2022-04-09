import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import manageBudgetImg from 'assets/images/budget-page.png';
import reportImg from 'assets/images/report-page.png';
import trackExpenseImg from 'assets/images/transaction-page.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    featureImg: {
      width: '100%',
      borderRadius: 4,
      overflow: 'hidden',
    },
    heading: {
      textAlign: 'center',
      marginBottom: 40,
    },
    featureItem: {
      marginBottom: 40,
      background: theme.palette.primary.light,
      borderRadius: 4,
      padding: 20,
    },
    title: {
      color: theme.palette.common.white,
      marginBottom: 20,
    },
    desc: {
      fontWeight: 400,
      color: theme.palette.common.white,
    },
  })
);

interface Feature {
  id: string;
  title: string;
  image: string;
  description: string;
}

const FEATURE_LIST: Feature[] = [
  {
    id: '1',
    title: 'Manage Budgets',
    image: manageBudgetImg,
    description:
      'Create budgets from any categories. We automatically update your budget depending on the category and amount expense of certain transaction.',
  },
  {
    id: '2',
    title: 'Track Expense',
    image: trackExpenseImg,
    description:
      'Easily create, filter (by category and date range) and search for your expense or income into your transactions.',
  },
  {
    id: '3',
    title: 'View Reports',
    image: reportImg,
    description: 'Get insights into your financial situation with graphs.',
  },
];

const Features = () => {
  const classes = useStyles();

  return (
    <Container>
      <div id="features">
        <Typography variant="h5" className={classes.heading}>
          Features
        </Typography>

        {FEATURE_LIST.map((feature) => (
          <Grid container spacing={3} key={feature.id} className={classes.featureItem}>
            <Grid item lg={5} xs={12}>
              <Typography variant="h6" className={classes.title}>
                {feature.title}
              </Typography>
              <Typography variant="body1" className={classes.desc}>
                {feature.description}
              </Typography>
            </Grid>
            <Grid item lg={7} xs={12}>
              <img className={classes.featureImg} src={feature.image} alt={feature.title} />
            </Grid>
          </Grid>
        ))}
      </div>
    </Container>
  );
};

export default Features;
