import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TransactionManageForm from 'features/transactions/TransactionManageForm';

const AddTransaction = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Add Transaction</Typography>
        <TransactionManageForm />
      </CardContent>
    </Card>
  );
};

export default AddTransaction;
