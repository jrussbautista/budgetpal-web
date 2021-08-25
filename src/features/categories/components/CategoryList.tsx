import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import CategoryItem from './CategoryItem';

import { useAppSelector } from '@/app/hooks';
import PageLoader from '@/components/PageLoader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const CategoryList = () => {
  const classes = useStyles();

  const { categories, status } = useAppSelector((state) => state.categories);

  if (status === 'loading') {
    return <PageLoader />;
  }

  return (
    <>
      <Card>
        <CardContent>
          <List dense className={classes.list}>
            {categories.map((category) => (
              <div key={category.id}>
                <CategoryItem category={category} />
                <Divider component="li" />
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryList;
