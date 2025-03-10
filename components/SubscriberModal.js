import React from "react";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import EditSubscriberProfile from "./Subscriber/EditSubscriberProfile";
import ViewSubscription from "./Subscriber/ViewSubscription";
import ViewSubscriberProfile from "./Subscriber/ViewSubscriberProfile";
import { styled } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
// import Grid from "@mui/material/Grid";
import { transform } from "lodash";

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: 2,
  },
  header: {
    fontSize: '2rem'
  }
}))


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const SubscriberModal = ({
  modalVisible,
  closeModal,
  handleViewSubscriber,
  handleEditProfile,
  handleViewSubscription,
  selectedUser,
}) => {
  const clases = useStyles();
  return (
    <Modal
      open={modalVisible}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 className={clases.header}>{selectedUser?.name}</h2>
        <div className="d-flex flex-column justify-content-center">
          <button
            onClick={handleViewSubscriber}
            className="btn btn-primary p-2 font-weight-bold"
          >
            View subscriber
          </button>
          <button
            onClick={handleEditProfile}
            className="btn btn-primary p-2 mt-1 font-weight-bold"
          >
            Edit subscriber's profile
          </button>
          <button
            onClick={handleViewSubscription}
            className="btn btn-primary p-2 mt-1 font-weight-bold"
          >
            View subscription
          </button>
        </div>
        {/* <Grid container spacing={2} flexDirection="column" justify="center">
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewSubscriber}
            >
              View subscriber
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditProfile}
            >
              Edit subscriber's profile
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewSubscription}
            >
              View subscription
            </Button>
          </Grid>
        </Grid> */}
      </Box>
    </Modal>
  );
};

export default SubscriberModal;
