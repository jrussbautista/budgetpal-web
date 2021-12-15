import { Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import MaterialModal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import ReactDOM from 'react-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 6,
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: 600,
    },
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface Props {
  isVisible: boolean;
  onClose(): void;
  title: string;
  withClose?: boolean;
}

const Modal: React.FC<Props> = ({ title, isVisible, onClose, children, withClose = true }) => {
  const classes = useStyles();

  return (
    <>
      {isVisible &&
        ReactDOM.createPortal(
          <>
            <MaterialModal
              open={isVisible}
              onClose={onClose}
              className={classes.modal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={isVisible}>
                <div className={classes.paper}>
                  <div className={classes.modalHeader}>
                    <Typography variant="h6">{title}</Typography>
                    {withClose && (
                      <div className={classes.closeContainer}>
                        <IconButton aria-label="close" onClick={onClose}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  {children}
                </div>
              </Fade>
            </MaterialModal>
          </>,
          document.body
        )}
    </>
  );
};

export default Modal;
