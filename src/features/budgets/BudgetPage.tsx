import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Modal from '../../shared/components/modal';
import BudgetList from './budget-list';
import BudgetManage from './budget-manage';
import { setSelectedBudget, showBudgetModal } from './budgets-slice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

  const { isOpenBudgetModal, selectedBudget } = useAppSelector(
    (state) => state.budgets
  );

  const dispatch = useAppDispatch();

  const budgetManageModalTitle = selectedBudget
    ? 'Edit Budget'
    : 'Add New Budget';

  const handleOpenBudgetModal = () => {
    dispatch(showBudgetModal(true));
  };

  const handleCloseBudgetModal = () => {
    dispatch(showBudgetModal(false));
    dispatch(setSelectedBudget(null));
  };

  return (
    <div>
      <Modal
        title={budgetManageModalTitle}
        isVisible={isOpenBudgetModal}
        onClose={handleCloseBudgetModal}
      >
        <BudgetManage />
      </Modal>
      <div className={classes.topContainer}>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={handleOpenBudgetModal}
        >
          Add Budget
        </Button>
      </div>
      <BudgetList />
    </div>
  );
};

export default BudgetPage;
