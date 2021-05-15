import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Budget } from '../BudgetModel';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import formatMoney from '../../../shared/utils/formatMoney';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../../../shared/components/confirm-dialog';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../app/hooks';
import {
  deleteBudget,
  setSelectedBudget,
  showBudgetModal,
} from '../budgets-slice';
import { unwrapResult } from '@reduxjs/toolkit';

interface Props {
  budget: Budget;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    amount: {
      textAlign: 'center',
      marginTop: 10,
    },
    progress: {
      marginTop: 20,
    },
    cardActions: {
      padding: '0',
      marginTop: 20,
    },
  })
);

const BudgetItem: React.FC<Props> = ({ budget }) => {
  const classes = useStyles();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const spentPercentage = (budget.amount_spent / budget.amount) * 100;

  const isReachedLimit = budget.amount_spent > budget.amount;

  const progressColor = isReachedLimit ? 'secondary' : 'primary';

  const handleClickEdit = () => {
    dispatch(showBudgetModal(true));
    dispatch(setSelectedBudget(budget));
  };

  const handleClickDelete = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleDeleteBudget = async () => {
    try {
      setIsDeleting(true);
      const response = await dispatch(deleteBudget(budget.id));
      unwrapResult(response);
      toast.success('You have successfully deleted the budget.');
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this budget right now. Please try again later."
      );
      setIsDeleting(false);
    }
  };

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardContent>
          <Typography variant='body1' component='h2' color='textSecondary'>
            {budget.category.title}
          </Typography>
          <Box display='flex' alignItems='center'>
            <Box width='100%' mr={2}>
              <LinearProgress
                variant='determinate'
                value={spentPercentage}
                color={progressColor}
              />
            </Box>
            <Box minWidth={30}>
              <Typography variant='body2' color='textSecondary'>
                {spentPercentage}%
              </Typography>
            </Box>
          </Box>
          <Typography variant='h6' className={classes.amount}>
            {formatMoney(budget.amount_spent)}/{formatMoney(budget.amount)}
          </Typography>
          <CardActions className={classes.cardActions}>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              size='small'
              onClick={handleClickEdit}
            >
              <EditIcon />
            </Button>
            <Button
              variant='contained'
              color='secondary'
              disableElevation
              size='small'
              onClick={handleClickDelete}
            >
              <DeleteIcon />
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <ConfirmDialog
        isVisible={isConfirmDialogOpen}
        title='Are you sure you want to delete this budget?'
        message="Once you delete this it's gone  for good."
        isConfirming={isDeleting}
        onClose={handleConfirmDialogClose}
        onConfirm={handleDeleteBudget}
      />
    </Grid>
  );
};

export default BudgetItem;
