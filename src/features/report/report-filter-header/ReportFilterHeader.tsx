import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 20,
    },
    selectContainer: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      padding: '12px  10px',
      boxSizing: 'border-box',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    actionContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      marginRight: 5,
    },
  })
);

interface Props {
  onClick(): void;
}

const ReportFilterHeader: React.FC<Props> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.selectContainer}>
        <div
          className={classes.actionContainer}
          role='button'
          onClick={onClick}
        >
          <Typography className={classes.label}>This Month</Typography>
          <Typography variant='body2' color='textSecondary'>
            ( May 1, 2021 - May 31, 2021 )
          </Typography>
          <ArrowDropDownIcon />
        </div>
      </div>
    </div>
  );
};

export default ReportFilterHeader;
