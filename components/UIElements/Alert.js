import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const Alert = ({payload}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  return (
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          >
            {
              <SnackbarContent
                aria-describedby="message-id2"
                className={
                  payload.type === 'SUCCESS' ? classes.success : classes.failure
                }
                message={
                  <span id="message-id2">
                    <div>{payload.msg}</div>
                  </span>
                }
              />
            }
          </Snackbar>
      </div>
  );
};

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: 'green',
  },
  failure: {
    backgroundColor: 'red',
  },
}));

export default Alert;
