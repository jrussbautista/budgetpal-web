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
import ConfirmDialog from '../../../shared/components/confirm-dialog';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
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
    actionsContainer: {
      padding: 5,
    },
  })
);

const BudgetItem: React.FC<Props> = ({ budget }) => {
  const classes = useStyles();

  const { currency } = useAppSelector((state) => state.settings);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const spentPercentage = Math.floor(
    (parseFloat(budget.amount_spent) / parseFloat(budget.amount)) * 100
  );

  const isReachedLimit = budget.amount_spent > budget.amount;

  const progressColor = isReachedLimit ? 'secondary' : 'primary';

  const handleClickEdit = () => {
    dispatch(showBudgetModal(true));
    dispatch(setSelectedBudget(budget));
    handleCloseMenu();
  };

  const handleClickDelete = () => {
    setIsConfirmDialogOpen(true);
    handleCloseMenu();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <div className={classes.cardContainer}>
            <div className={classes.infoContainer}>
              <div className={classes.datesContainer}>
                <Typography variant='body2' color='textSecondary'>
                  {budget.start_date} - {budget.end_date}
                </Typography>
              </div>
              <Typography variant='h6' component='h2'>
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
                {formatMoney(
                  parseFloat(budget.amount_spent),
                  currency.code,
                  currency.locale
                )}
                /
                {formatMoney(
                  parseFloat(budget.amount),
                  currency.code,
                  currency.locale
                )}
              </Typography>
            </div>
            <div className={classes.actionsContainer}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
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
