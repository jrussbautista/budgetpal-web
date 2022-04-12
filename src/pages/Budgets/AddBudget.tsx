import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import BudgetManageForm from 'features/budgets/BudgetManageForm';

function AddBudget() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Add Budget</Typography>
        <BudgetManageForm />
      </CardContent>
    </Card>
  );
}

export default AddBudget;
