import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import BudgetList from 'features/budgets/BudgetsList';

const useStyles = makeStyles({
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

const BudgetPage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.topContainer}>
        <Button
          to="/budgets/add"
          component={Link}
          variant="contained"
          color="primary"
          disableElevation
        >
          Add Budget
        </Button>
      </div>
      <BudgetList />
    </>
  );
};

export default BudgetPage;
