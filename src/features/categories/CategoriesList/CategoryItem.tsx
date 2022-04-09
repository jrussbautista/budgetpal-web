import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  deleteCategory,
  setSelectedCategory,
  setSelectedModal,
} from 'features/categories/categoriesSlice';
import { Category } from 'types/Category';

interface Props {
  category: Category;
}

const useStyles = makeStyles(() => ({
  categoryItem: {
    padding: '15px 0',
  },
  actionContainer: {
    position: 'absolute',
    right: 0,
  },
}));

const CategoryItem: React.FC<Props> = ({ category }) => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isCategoryDeleting, setIsCategoryDeleting] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    dispatch(setSelectedModal('manageCategoryModal'));
    dispatch(setSelectedCategory(category));
    handleCloseMenu();
  };

  const handleDelete = async () => {
    try {
      setIsCategoryDeleting(true);
      const result = await dispatch(deleteCategory(category.id));
      unwrapResult(result);
      toast.success('Successfully category deleted');
      handleCloseMenu();
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this category right now. Please try again later."
      );
      setIsCategoryDeleting(false);
    }
  };

  const canShowMenu = () => {
    return user?.id === category.user_id;
  };

  return (
    <ListItem className={classes.categoryItem} disabled={isCategoryDeleting}>
      <ListItemText primary={category.title} />
      {canShowMenu() && (
        <div className={classes.actionContainer}>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
      )}
    </ListItem>
  );
};

export default CategoryItem;
