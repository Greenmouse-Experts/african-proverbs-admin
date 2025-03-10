import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles({
    root: {
        
    },
  });

  const CssDialog = withStyles((theme) => ({
    root: {
      "& .MuiDialog-paperWidthSm": {
        minWidth: "600px",
      },
    },
  }))(Dialog);

const FormDialog = ({open, clickClose,  children}) => {
    const classes = useStyles();
  return (
    <div className={classes.root}>
        {/* <a href="#" onClick={() =>clickOpen()} class={openBtnClass ? openBtnClass :"btn btn-lg btn-success font-16 btn-block waves-effect waves-light"}>
            {icon ? icon : <i class="fa fa-plus mr-1"></i>} {action}
        </a> */}
      <CssDialog open={open} onClose={clickClose} aria-labelledby="form-dialog-title">
        {children}
      </CssDialog>
    </div>
  );
}

export default FormDialog;