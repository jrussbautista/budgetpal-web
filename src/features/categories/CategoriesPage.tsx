import React from 'react';
import CategoryList from './category-list/CategoryList';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedModal } from './categories-slice';
import CategoryManageModal from './category-manage-modal';

const useStyles = makeStyles({
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainContainer: {
    maxWidth: 800,
    margin: '0 auto',
  },
});

const CategoriesPage = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { selectedModal } = useAppSelector((state) => state.categories);

  return (
    <>
      <div className={classes.topContainer}>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={() => dispatch(setSelectedModal('manageCategoryModal'))}
        >
          Add Category
        </Button>
      </div>
      <CategoryList />
      {selectedModal === 'manageCategoryModal' && <CategoryManageModal />}
    </>
  );
};

export default CategoriesPage;
