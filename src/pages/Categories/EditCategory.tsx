import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchCategory } from 'features/categories/categoriesSlice';
import CategoryManageForm from 'features/categories/CategoryManageForm';

const useStyles = makeStyles(() => ({
  loadingContainer: {
    textAlign: 'center',
    margin: '100px 0',
  },
}));

function EditCategory() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { category } = useAppSelector((state) => state.categories);
  const { data, status } = category;

  useEffect(() => {
    dispatch(fetchCategory(String(id)));
  }, [dispatch, id]);

  const isLoading = status === 'idle' || status === 'loading';

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (status === 'failed' || !data) {
    return <Alert severity="error">Unable to fetch category right now. Please try again.</Alert>;
  }

  const fields = {
    title: data.title,
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Edit Category</Typography>
        <CategoryManageForm id={id} fields={fields} />
      </CardContent>
    </Card>
  );
}

export default EditCategory;
