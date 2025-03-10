import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const ProverbPopUp = ({
  open,
  handleClose,
  deleteProverbHandler,
  proverbData,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are You Sure You Want to Delete This Proverb?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          type="button"
          onClick={handleClose}
          class="btn btn-info waves-effect waves-light"
        >
          CANCEL
        </button>
        <button
          type="button"
          onClick={() => deleteProverbHandler(proverbData)}
          class="btn btn-danger waves-effect waves-light"
        >
          {" "}
          DELETE
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ProverbPopUp;
