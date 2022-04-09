import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import BudgetDeleteDialog from 'features/budgets/BudgetDeleteDialog';
import { setSelectedBudget, setSelectedModal } from 'features/budgets/budgetsSlice';
import { Budget } from 'types/Budget';

const useStyles = makeStyles(() =>
  createStyles({
    actionsContainer: {
      padding: 5,
    },
  })
);

type BudgetMenuActionsProps = {
  budget: Budget;
};

const BudgetMenuActions = ({ budget }: BudgetMenuActionsProps) => {
  const dispatch = useAppDispatch();

  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    setAnchorEl(null);
    dispatch(setSelectedModal('manageBudgetModal'));
    dispatch(setSelectedBudget(budget));
  };

  const handleClickDelete = () => {
    setIsOpenConfirmDelete(true);
    setAnchorEl(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsOpenConfirmDelete(false);
  };

  return (
    <div className={classes.actionsContainer}>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="budget menu options"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
        <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
      </Menu>
      <BudgetDeleteDialog
        isVisible={isOpenConfirmDelete}
        id={budget.id}
        onClose={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default BudgetMenuActions;
