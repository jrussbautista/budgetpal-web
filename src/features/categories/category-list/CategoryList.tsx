import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../../../app/hooks';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CategoryItem from './CategoryItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: theme.palette.background.paper,
    },
    loadingContainer: {
      textAlign: 'center',
      margin: '100px 0',
    },
  })
);

const CategoryList = () => {
  const classes = useStyles();

  const { categories, status } = useAppSelector((state) => state.categories);

  if (status === 'loading') {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <List dense className={classes.list}>
            {categories.map((category) => (
              <div key={category.id}>
                <CategoryItem category={category} />
                <Divider component='li' />
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryList;
