import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useAppSelector } from 'app/hooks';
import { CURRENCIES } from 'constants/currency';
import { Budget } from 'types/Budget';
import formatMoney from 'utils/formatMoney';

import BudgetMenuActions from '../BudgetMenuActions';

const useStyles = makeStyles(() =>
  createStyles({
    amount: {
      marginTop: 10,
    },
    progress: {
      marginTop: 20,
    },
    datesContainer: {
      marginBottom: 10,
    },
    cardContainer: {
      display: 'flex',
    },
    infoContainer: {
      flex: 1,
    },
    finishedItem: {
      opacity: 0.5,
    },
  })
);

interface Props {
  budget: Budget;
  hasMenu?: boolean;
}

const BudgetCard: React.FC<Props> = ({ budget, hasMenu = true }) => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  const isReachedLimit = budget.amount_spent > budget.amount;

  const progressColor = isReachedLimit ? 'secondary' : 'primary';

  const cardClassName = budget.status === 'finished' ? classes.finishedItem : '';

  const spentPercentageNumber = parseInt(budget.spent_percentage.replace('%', ''));

  const currencyCode = user?.currency || 'USD';
  const locale = CURRENCIES[currencyCode].locale;

  return (
    <>
      <Card className={cardClassName}>
        <CardContent>
          <div className={classes.cardContainer}>
            <div className={classes.infoContainer}>
              <div className={classes.datesContainer}>
                <Typography variant="body2" color="textSecondary">
                  {budget.start_date} - {budget.end_date}
                </Typography>
              </div>
              <Typography variant="h6" component="h2">
                {budget.category.title}
              </Typography>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={2}>
                  <LinearProgress
                    variant="determinate"
                    value={spentPercentageNumber}
                    color={progressColor}
                  />
                </Box>
                <Box minWidth={30}>
                  <Typography variant="body2" color="textSecondary">
                    {budget.spent_percentage}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" className={classes.amount}>
                {formatMoney(budget.amount_spent, currencyCode, locale)} /{' '}
                {formatMoney(budget.amount, currencyCode, locale)}
              </Typography>
            </div>
            {hasMenu && <BudgetMenuActions budget={budget} />}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BudgetCard;
