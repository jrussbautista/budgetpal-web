import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import CategoryList from 'features/categories/CategoriesList';
import { setSelectedModal } from 'features/categories/categoriesSlice';
import CategoryManageModal from 'features/categories/CategoryManageModal';

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
          variant="contained"
          color="primary"
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
