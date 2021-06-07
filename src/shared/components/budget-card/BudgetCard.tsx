import React, { useState } from 'react';
import { Budget } from '../../../shared/models/Budget';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import formatMoney from '../../../shared/utils/formatMoney';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useAppSelector } from '../../../app/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    amount: {
      marginTop: 10,
    },
    progress: {
      marginTop: 20,
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
    finishedItem: {
      opacity: 0.5,
    },
  })
);

interface Props {
  budget: Budget;
  onEdit?(): void;
  onDelete?(): void;
  hasMenu?: boolean;
}

const BudgetCard: React.FC<Props> = ({
  budget,
  onDelete,
  onEdit,
  hasMenu = false,
}) => {
  const classes = useStyles();

  const { currency } = useAppSelector((state) => state.settings);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    if (onEdit) {
      handleCloseMenu();
      onEdit();
    }
  };

  const handleClickDelete = () => {
    if (onDelete) {
      handleCloseMenu();
      onDelete();
    }
  };

  const isReachedLimit = budget.amount_spent > budget.amount;

  const progressColor = isReachedLimit ? 'secondary' : 'primary';

  const cardClassName =
    budget.status === 'finished' ? classes.finishedItem : '';

  const spentPercentageNumber = parseInt(
    budget.spent_percentage.replace('%', '')
  );

  return (
    <Card className={cardClassName}>
      <CardContent>
        <div className={classes.cardContainer}>
          <div className={classes.infoContainer}>
            <div className={classes.datesContainer}>
              <Typography variant='body2' color='textSecondary'>
                {budget.start_date} - {budget.end_date}
              </Typography>
            </div>
            <Typography variant='h6' component='h2'>
              {budget.category.title}
            </Typography>
            <Box display='flex' alignItems='center'>
              <Box width='100%' mr={2}>
                <LinearProgress
                  variant='determinate'
                  value={spentPercentageNumber}
                  color={progressColor}
                />
              </Box>
              <Box minWidth={30}>
                <Typography variant='body2' color='textSecondary'>
                  {budget.spent_percentage}
                </Typography>
              </Box>
            </Box>
            <Typography variant='h6' className={classes.amount}>
              {formatMoney(budget.amount_spent, currency.code, currency.locale)}
              /{formatMoney(budget.amount, currency.code, currency.locale)}
            </Typography>
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
                <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
