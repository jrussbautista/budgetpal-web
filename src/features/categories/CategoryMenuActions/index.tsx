import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Category } from 'types/Category';

import CategoryDeleteDialog from '../CategoryDeleteDialog';

interface CategoryMenuActionsProps {
  category: Category;
}

const CategoryMenuActions = ({ category }: CategoryMenuActionsProps) => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    const url = `/categories/${category.id}/edit`;
    navigate(url);
  };

  const handleClickDelete = () => {
    setIsOpenDeleteDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="category menu"
        anchorEl={anchorEl}
        keepMounted={false}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
      </Menu>
      <CategoryDeleteDialog
        id={category.id}
        isVisible={isOpenDeleteDialog}
        onClose={handleCloseDeleteDialog}
      />
    </>
  );
};

export default CategoryMenuActions;
