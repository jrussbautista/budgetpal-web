import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BudgetDeleteDialog from 'features/budgets/BudgetDeleteDialog';
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
  const classes = useStyles();
  const navigate = useNavigate();

  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    setAnchorEl(null);
    const url = `/budgets/${budget.id}/edit`;
    navigate(url);
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
