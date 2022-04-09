import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import BudgetManageModal from 'features/budgets/BudgetManageModal';
import BudgetList from 'features/budgets/BudgetsList';
import { setSelectedModal } from 'features/budgets/budgetsSlice';

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

  const { selectedModal } = useAppSelector((state) => state.budgets);

  const dispatch = useAppDispatch();

  const handleOpenBudgetModal = () => {
    dispatch(setSelectedModal('manageBudgetModal'));
  };

  return (
    <>
      <div className={classes.topContainer}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleOpenBudgetModal}
        >
          Add Budget
        </Button>
      </div>
      <BudgetList />
      {selectedModal === 'manageBudgetModal' && <BudgetManageModal />}
    </>
  );
};

export default BudgetPage;
