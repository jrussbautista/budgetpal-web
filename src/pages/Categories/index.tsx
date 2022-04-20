import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import CategoryList from 'features/categories/CategoriesList';

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

  return (
    <>
      <div className={classes.topContainer}>
        <Button
          to="/categories/add"
          component={Link}
          variant="contained"
          color="primary"
          disableElevation
        >
          Add Category
        </Button>
      </div>
      <CategoryList />
    </>
  );
};

export default CategoriesPage;
