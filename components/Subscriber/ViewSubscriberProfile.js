import React from "react";
import Modal from "@material-ui/core/Modal";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Divider,
  Tooltip,
} from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ViewSubscriberProfile = ({
  showProfile,
  closeProfileModal,
  selectedUser,
}) => {
  const classes = useStyles();
  return (
    <Modal
      open={showProfile}
      onClose={closeProfileModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex ">
          <div class="avatar-lg mr-3">
            <img
              src="/static/assets/images/users/avatar.jpg"
              class="img-fluid rounded-circle"
              alt="img"
            />
          </div>
          <div className="">
            <span>
              <strong className="mr-1">Name :</strong>
              {selectedUser?.firstName} {selectedUser?.lastName}
            </span>
            <br />
            <span class="">
              <strong className="mr-1">Email :</strong>
              {selectedUser.email}
            </span>
            <br />
            <span class="">
              <strong className="mr-1">User Type :</strong>
              {selectedUser?.userType}
            </span>
            <br />
            <span class="">
              <strong className="mr-1">Mobile :</strong>
              <span>{selectedUser.phoneNumber}</span>
            </span>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
    "& .MuiCard-root": {
      marginBottom: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .MuiDivider-root": {
      margin: theme.spacing(1, 0),
    },
    "& .mdi": {
      fontSize: "15px",
    },
  },
}));

export default ViewSubscriberProfile;
