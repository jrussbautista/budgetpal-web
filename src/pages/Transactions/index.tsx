import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import TransactionsFilter from 'features/transactions/TransactionsFilter';
import TransactionsList from 'features/transactions/TransactionsList';

const useStyles = makeStyles({
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    marginRight: 10,
  },
});

const TransactionsPage = () => {
  const classes = useStyles();

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleToggleFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <>
      <div className={classes.topContainer}>
        <IconButton className={classes.iconButton} onClick={handleToggleFilter}>
          <FilterListIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          component={Link}
          to="/transactions/add"
        >
          Add Transaction
        </Button>
      </div>
      {isOpenFilter && <TransactionsFilter onToggleFilter={handleToggleFilter} />}
      <TransactionsList />
    </>
  );
};

export default TransactionsPage;
