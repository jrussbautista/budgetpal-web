import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CategoryManageForm from 'features/categories/CategoryManageForm';

function AddCategory() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Add Category</Typography>
        <CategoryManageForm />
      </CardContent>
    </Card>
  );
}

export default AddCategory;
