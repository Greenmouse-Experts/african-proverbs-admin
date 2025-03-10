import React, { useState, useEffect, useMemo, useCallback } from "react";
import { alertMessage } from "@/store/actions/authActions";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const AlertToast = ({ severity, alertMsg, openAlert, handleCloseAlert }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={openAlert}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleCloseAlert}
        severity={severity}
      >
        {alertMsg}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertToast;
