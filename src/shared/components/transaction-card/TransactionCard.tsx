import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import formatMoney from '../../utils/formatMoney';
import { Transaction } from '../../../shared/models/Transaction';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  transaction: Transaction;
  hasMenu?: boolean;
  onEdit?(): void;
  onDelete?(): void;
}

const useStyles = makeStyles((theme) => ({
  expense: {
    color: theme.palette.error.main,
  },
  income: {
    color: theme.palette.primary.main,
  },
  amount: {
    marginTop: 10,
  },
  datesContainer: {
    marginBottom: 10,
  },
  cardContainer: {
    display: 'flex',
  },
  infoContainer: {
    flex: 1,
  },
  actionsContainer: {
    padding: 5,
  },
  mainInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
}));

const TransactionCard: React.FC<Props> = ({
  transaction,
  hasMenu,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit && onEdit();
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete && onDelete();
  };

  const amountClassName =
    transaction.type === 'expense' ? classes.expense : classes.income;

  const amountOperation = transaction.type === 'expense' ? '-' : '+';

  return (
    <Card>
      <CardContent>
        <div className={classes.cardContainer}>
          <div className={classes.infoContainer}>
            <div className={classes.datesContainer}>
              <Typography variant='body2' color='textSecondary'>
                {transaction.happened_on}
              </Typography>
            </div>
            <Typography variant='h6' component='h2'>
              {transaction.category.title}
            </Typography>

            <div className={classes.mainInfoContainer}>
              <Typography variant='body1' component='h2'>
                {transaction.title}
              </Typography>

              <Typography variant='h6' className={amountClassName}>
                {amountOperation}
                {formatMoney(transaction.amount)}
              </Typography>
            </div>
          </div>
          {hasMenu && (
            <div className={classes.actionsContainer}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
