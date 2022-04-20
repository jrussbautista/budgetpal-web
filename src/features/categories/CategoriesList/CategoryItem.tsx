import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector } from 'app/hooks';
import { Category } from 'types/Category';

import CategoryMenuActions from '../CategoryMenuActions';

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

  const canShowMenu = () => {
    return user?.id === category.user_id;
  };

  return (
    <ListItem className={classes.categoryItem}>
      <ListItemText primary={category.title} />
      {canShowMenu() && (
        <div className={classes.actionContainer}>
          <CategoryMenuActions category={category} />
        </div>
      )}
    </ListItem>
  );
};

export default CategoryItem;
