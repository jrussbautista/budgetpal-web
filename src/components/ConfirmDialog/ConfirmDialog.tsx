import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@/components/Modal';

interface Props {
  title: string;
  message: string;
  isVisible: boolean;
  onClose(): void;
  onConfirm(): void;
  isConfirming: boolean;
}

const useStyles = makeStyles({
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  message: {
    marginTop: 20,
  },
});

const ConfirmDialog: React.FC<Props> = ({
  title,
  message,
  isVisible,
  onClose,
  onConfirm,
  isConfirming,
}) => {
  const classes = useStyles();

  return (
    <Modal title={title} isVisible={isVisible} onClose={onClose} withClose={false}>
      <Typography variant="body1" className={classes.message}>
        {message}
      </Typography>
      <div className={classes.buttonsContainer}>
        <Button color="secondary" style={{ marginRight: 10 }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onConfirm}
          disableElevation
          disabled={isConfirming}
        >
          {isConfirming ? <CircularProgress size={20} /> : 'Okay'}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
